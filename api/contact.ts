import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, phone, message } = req.body;

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

    // Configurar el email
    const mailOptions = {
      from: process.env.VITE_EMAIL_USER,
      to: process.env.VITE_EMAIL_TO || 'contacto@bizellers.com',
      subject: `Nuevo contacto desde la Landing Page - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #B4FC05, #9DD604); padding: 30px; text-align: center;">
            <h1 style="color: #121212; margin: 0;">BIZELLERS</h1>
            <p style="color: #121212; margin: 10px 0 0 0;">Nuevo contacto desde la landing page</p>
          </div>

          <div style="background: #f5f5f5; padding: 30px;">
            <h2 style="color: #121212; margin-top: 0;">Información del contacto</h2>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
              ${phone ? `<p style="margin: 0 0 10px 0;"><strong>Teléfono:</strong> ${phone}</p>` : ''}
              ${message ? `
                <div style="margin-top: 20px;">
                  <p style="margin: 0 0 10px 0;"><strong>Mensaje:</strong></p>
                  <p style="margin: 0; color: #3A3A3A; line-height: 1.6;">${message}</p>
                </div>
              ` : ''}
            </div>

            <p style="color: #3A3A3A; font-size: 14px; margin-top: 20px;">
              Este email fue generado automáticamente desde el formulario de contacto de la landing page de Bizellers.
            </p>
          </div>

          <div style="background: #121212; padding: 20px; text-align: center;">
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
}
