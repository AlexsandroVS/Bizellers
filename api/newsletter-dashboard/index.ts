import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';

// Helper para verificar la autenticación
function isAuthenticated(req: VercelRequest): boolean {
  const authHeader = req.headers.authorization;
  return !(!authHeader || !authHeader.startsWith('Bearer '));
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  // ... (código sin cambios)
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  // ... (código sin cambios)
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const { id } = req.body;
  if (!id || typeof id !== 'number') {
    return res.status(400).json({ success: false, message: 'ID de suscriptor no válido' });
  }

  try {
    const subscriber = await prisma.newsletterSubscription.findUnique({
      where: { id },
    });

    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Suscriptor no encontrado' });
    }

    if (subscriber.welcomeEmailSentAt) {
        return res.status(400).json({ success: false, message: 'El correo de bienvenida ya fue enviado.' });
    }

    await sendWelcomeEmail(subscriber.email, subscriber.id);

    // Refrescar el suscriptor para devolver el estado actualizado
    const updatedSubscriber = await prisma.newsletterSubscription.findUnique({ where: { id } });

    return res.status(200).json({ success: true, data: updatedSubscriber });

  } catch (error: any) {
    console.error('[NEWSLETTER_DASHBOARD_POST] Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Error al enviar correo' });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      case 'POST':
        return await handlePost(req, res);
      default:
        res.setHeader('Allow', ['GET', 'DELETE', 'POST']);
        return res.status(405).json({ success: false, message: `Método ${req.method} no permitido` });
    }
  } finally {
    await prisma.$disconnect();
  }
}
