import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint de contacto
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, phone, message, cargo, empresa, service } = req.body;

  // Validar campos requeridos
  if (!name || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }

  try {
    // Configurar transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_EMAIL_PASS,
      },
    });

    // Determinar el asunto del email
    const subject = service
      ? `Nueva solicitud de servicio: ${service} - ${name}`
      : `Nuevo contacto desde la Landing Page - ${name}`;

    // Configurar el email
    const mailOptions = {
      from: process.env.VITE_EMAIL_USER,
      to: process.env.VITE_EMAIL_TO || 'contacto@bizellers.com',
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #B4FC05, #9DD604); padding: 30px; text-center;">
            <h1 style="color: #121212; margin: 0;">BIZELLERS</h1>
            <p style="color: #121212; margin: 10px 0 0 0; font-weight: bold;">
              ${service ? `Solicitud de Servicio: ${service}` : 'Nuevo contacto desde la landing page'}
            </p>
          </div>

          <div style="background: #f5f5f5; padding: 30px;">
            <h2 style="color: #121212; margin-top: 0;">Información del contacto</h2>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
              ${cargo ? `<p style="margin: 0 0 10px 0;"><strong>Cargo:</strong> ${cargo}</p>` : ''}
              ${empresa ? `<p style="margin: 0 0 10px 0;"><strong>Empresa:</strong> ${empresa}</p>` : ''}
              ${phone ? `<p style="margin: 0 0 10px 0;"><strong>Teléfono:</strong> ${phone}</p>` : ''}
              ${service ? `<p style="margin: 0 0 10px 0;"><strong>Servicio solicitado:</strong> <span style="color: #B4FC05; background: #121212; padding: 4px 12px; border-radius: 4px; font-weight: bold;">${service}</span></p>` : ''}
              ${message ? `
                <div style="margin-top: 20px;">
                  <p style="margin: 0 0 10px 0;"><strong>Mensaje:</strong></p>
                  <p style="margin: 0; color: #3A3A3A; line-height: 1.6;">${message}</p>
                </div>
              ` : ''}
            </div>

            <p style="color: #3A3A3A; font-size: 14px; margin-top: 20px;">
              Este email fue generado automáticamente desde ${service ? 'el modal de servicios' : 'el formulario de contacto'} de la landing page de Bizellers.
            </p>
          </div>

          <div style="background: #121212; padding: 20px; text-center;">
            <p style="color: #B4FC05; margin: 0; font-size: 14px;">
              © ${new Date().getFullYear()} Bizellers. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `,
    };

    // Enviar el email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    return res.status(500).json({ error: 'Error al enviar el email' });
  }
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
