import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import kpisHandler from '../api/kpis'; // Import the kpis handler
import exportHandler from '../api/export'; // Import the export handler

// Prisma Client instantiation
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?pgbouncer=true`,
    },
  },
});
import { isValidEmail } from '../src/utils/emailValidation.js';

// Email sending logic is now co-located
async function sendWelcomeEmail(email: string, subscriptionId: number) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `\"Bizellers\" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '¡Bienvenido al Newsletter de Bizellers!',
    html: `<div>Correo de Bienvenida</div>`, // Placeholder body
  };

  try {
    await transporter.sendMail(mailOptions);
    await prisma.newsletterSubscription.update({
      where: { id: subscriptionId },
      data: { welcomeEmailSentAt: new Date() },
    });
  } catch (error) {
    console.error(`Error en el proceso de envío de correo para ${email}:`, error);
  }
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ============ DASHBOARD AUTH ============
app.post('/api/auth-dashboard', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const adminUsername = process.env.DASHBOARD_USERNAME || 'admin';
    const adminPassword = process.env.DASHBOARD_PASSWORD || 'admin123';

    if (username === adminUsername && password === adminPassword) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      return res.status(200).json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  } catch (error) {
    console.error('Error en autenticación:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// ============ DASHBOARD LEADS CRUD ============
app.get('/api/leads-dashboard', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const { startDate: startDateQuery, endDate: endDateQuery } = req.query;

    const startDate = Array.isArray(startDateQuery) ? startDateQuery[0] : startDateQuery;
    const endDate = Array.isArray(endDateQuery) ? endDateQuery[0] : endDateQuery;

    const whereClause: any = {};

    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        end.setUTCHours(23, 59, 59, 999);
        whereClause.created_at = {
          gte: start,
          lte: end,
        };
      }
    }

    const leads = await prisma.lead.findMany({
      where: whereClause,
      orderBy: { created_at: 'desc' }
    });

    return res.status(200).json({ success: true, leads });
  } catch (error) {
    console.error('Error al obtener leads:', error);
    return res.status(500).json({ success: false, message: 'Error al obtener leads' });
  }
});

// Ruta compatible con producción - PATCH /api/update-lead
app.patch('/api/update-lead', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const { id, status, notes } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID es requerido' });
    }

    const leadId = parseInt(id);
    if (isNaN(leadId)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    // Obtener el lead actual para el historial
    const currentLead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!currentLead) {
      return res.status(404).json({ success: false, message: 'Lead no encontrado' });
    }

    // Preparar datos de actualización
    const updateData: any = { updated_at: new Date() };

    if (status !== undefined) {
      updateData.status = status;

      // Agregar al historial si cambió el status
      const statusHistory = (currentLead.status_history as any[]) || [];
      statusHistory.push({
        from: currentLead.status,
        to: status,
        timestamp: new Date().toISOString()
      });
      updateData.status_history = statusHistory;
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: updateData
    });

    return res.status(200).json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error('Error al actualizar lead:', error);
    return res.status(500).json({ success: false, message: 'Error al actualizar lead' });
  }
});

app.patch('/api/leads-dashboard/:id', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const { id } = req.params;
    const { status, notes } = req.body;

    const leadId = parseInt(id);
    if (isNaN(leadId)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    // Obtener el lead actual para el historial
    const currentLead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!currentLead) {
      return res.status(404).json({ success: false, message: 'Lead no encontrado' });
    }

    // Preparar datos de actualización
    const updateData: any = { updated_at: new Date() };

    if (status !== undefined) {
      updateData.status = status;

      // Agregar al historial si cambió el status
      const statusHistory = (currentLead.status_history as any[]) || [];
      statusHistory.push({
        from: currentLead.status,
        to: status,
        timestamp: new Date().toISOString()
      });
      updateData.status_history = statusHistory;
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: updateData
    });

    return res.status(200).json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error('Error al actualizar lead:', error);
    return res.status(500).json({ success: false, message: 'Error al actualizar lead' });
  }
});

// Ruta compatible con producción - DELETE /api/delete-lead?id=X
app.delete('/api/delete-lead', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const id = req.query.id as string;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID es requerido' });
    }

    const leadId = parseInt(id);
    if (isNaN(leadId)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    await prisma.lead.delete({ where: { id: leadId } });

    return res.status(200).json({ success: true, message: 'Lead eliminado' });
  } catch (error) {
    console.error('Error al eliminar lead:', error);
    return res.status(500).json({ success: false, message: 'Error al eliminar lead' });
  }
});

app.delete('/api/leads-dashboard/:id', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const { id } = req.params;
    const leadId = parseInt(id);

    if (isNaN(leadId)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    await prisma.lead.delete({ where: { id: leadId } });

    return res.status(200).json({ success: true, message: 'Lead eliminado' });
  } catch (error) {
    console.error('Error al eliminar lead:', error);
    return res.status(500).json({ success: false, message: 'Error al eliminar lead' });
  }
});

// ============ NEWSLETTER DASHBOARD CRUD ============
app.get('/api/newsletter-dashboard', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const [subscribers, total] = await prisma.$transaction([
      prisma.newsletterSubscription.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.newsletterSubscription.count(),
    ]);

    return res.status(200).json({
      success: true,
      data: subscribers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error al obtener suscriptores:', error);
    return res.status(500).json({ success: false, message: 'Error al obtener suscriptores' });
  }
});

app.delete('/api/newsletter-dashboard', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: 'ID no válido' });
    }

    await prisma.newsletterSubscription.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ success: true, message: 'Suscriptor eliminado' });
  } catch (error) {
    console.error('Error al eliminar suscriptor:', error);
    return res.status(500).json({ success: false, message: 'Error al eliminar suscriptor' });
  }
});

// ============ NEWSLETTER SUBSCRIBE ============
app.post('/api/newsletter', async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'El correo proporcionado no es válido.' });
  }

  try {
    const newSubscription = await prisma.newsletterSubscription.create({
      data: {
        email: email.toLowerCase(),
      },
    });

    // Disparar el envío del correo de bienvenida
    sendWelcomeEmail(newSubscription.email, newSubscription.id);

    return res.status(201).json({ success: true, message: '¡Gracias por suscribirte!' });

  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Este correo ya está suscrito.' });
    }
    console.error('[NEWSLETTER SUBSCRIBE] Error:', error);
    return res.status(500).json({ success: false, message: 'Ocurrió un error en el servidor.' });
  }
});

app.post('/api/newsletter-dashboard', async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id || typeof id !== 'number') {
        return res.status(400).json({ success: false, message: 'ID de suscriptor no válido' });
    }

    try {
        const subscriber = await prisma.newsletterSubscription.findUnique({ where: { id } });
        if (!subscriber) {
            return res.status(404).json({ success: false, message: 'Suscriptor no encontrado' });
        }
        if (subscriber.welcomeEmailSentAt) {
            return res.status(400).json({ success: false, message: 'El correo de bienvenida ya fue enviado.' });
        }

        await sendWelcomeEmail(subscriber.email, subscriber.id);
        const updatedSubscriber = await prisma.newsletterSubscription.findUnique({ where: { id } });
        return res.status(200).json({ success: true, data: updatedSubscriber });

    } catch (error: any) {
        console.error('[NEWSLETTER DASHBOARD POST] Error:', error);
        return res.status(500).json({ success: false, message: error.message || 'Error al enviar correo' });
    }
});

// ============ ENDPOINT DE CONTACTO ============
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, phone, message, cargo, empresa, service, servicio } = req.body;

  if (!name || !email || !empresa || !phone) {
    return res.status(400).json({ error: 'Nombre, email, empresa y teléfono son requeridos' });
  }

  // Re-usar la lógica de validación de email
  if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'El correo proporcionado no es válido.' });
  }

  try {
    const finalServicio = servicio || service || 'Contacto General';
    const finalCargo = cargo || 'Lead';

    // 1. Guardar el lead
    await prisma.lead.create({
      data: {
        nombre: name,
        cargo: finalCargo,
        empresa,
        telefono: phone,
        correo: email,
        servicio: finalServicio,
        mensaje: message || null,
        status: 'nuevo',
      },
    });

    // 2. Intentar suscribirlo al newsletter (no falla si ya existe)
    try {
      await prisma.newsletterSubscription.create({
        data: {
          email: email.toLowerCase(),
        },
      });
      // Aquí se podría llamar a la función de envío de bienvenida si se quisiera
    } catch (error: any) {
      if (error.code !== 'P2002') {
        // Si el error no es 'email ya existe', lo logueamos, pero no hacemos fallar la petición principal
        console.error('Error al intentar suscribir durante contacto:', error);
      }
    }

    // La notificación por email al admin se puede manejar por separado si se desea
    // Por ahora, se elimina para evitar el punto de fallo de nodemailer

    return res.status(200).json({ success: true, message: 'Contacto registrado correctamente.' });

  } catch (error: any) {
    console.error('Error al procesar la solicitud de contacto:', error);
    return res.status(500).json({
      error: 'Error al procesar la solicitud',
      details: error.message
    });
  }
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// ============ KPIS API ============
app.get('/api/kpis', async (req: Request, res: Response) => {
  const handler = kpisHandler(prisma); // Pass the prisma instance
  await handler(req as any, res as any);
});

// ============ EXPORT API ============
app.get('/api/export', async (req: Request, res: Response) => {
  const handler = exportHandler(prisma); // Pass the prisma instance
  await handler(req as any, res as any);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
