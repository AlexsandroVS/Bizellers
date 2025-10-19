import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email } = req.body;

  // Validar email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  try {
    // Configurar transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.VITE_CONTACT_EMAIL || 'contacto@bizellers.com',
      subject: `Nueva suscripción al Newsletter - ${email}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #B4FC05 0%, #9DD604 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #121212; font-size: 32px; font-weight: 800; letter-spacing: 1px;">BIZELLERS</h1>
                      <p style="margin: 12px 0 0 0; color: #121212; font-size: 16px; font-weight: 600;">
                        📧 Nueva Suscripción al Newsletter
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 24px 0; color: #121212; font-size: 20px; font-weight: 700;">Nueva Suscripción</h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; padding: 20px;">
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                            <p style="margin: 4px 0 0 0;">
                              <a href="mailto:${email}" style="color: #B4FC05; background-color: #121212; text-decoration: none; font-size: 16px; font-weight: 600; padding: 6px 12px; border-radius: 4px; display: inline-block;">${email}</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                        <tr>
                          <td align="center">
                            <p style="margin: 0; color: #666; font-size: 14px;">
                              Agrega este email a tu lista de suscriptores del newsletter.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer Info -->
                  <tr>
                    <td style="padding: 24px 30px; background-color: #f9f9f9; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0; color: #666; font-size: 13px; text-align: center; line-height: 1.6;">
                        📅 ${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}<br>
                        📋 Enviado desde el formulario de Newsletter
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #121212; padding: 30px; text-align: center;">
                      <p style="margin: 0 0 8px 0; color: #B4FC05; font-size: 18px; font-weight: 700;">BIZELLERS</p>
                      <p style="margin: 0; color: #999; font-size: 12px;">
                        © ${new Date().getFullYear()} Bizellers. Todos los derechos reservados.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Enviar el email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Suscripción registrada correctamente' });
  } catch (error) {
    console.error('Error al procesar suscripción:', error);
    return res.status(500).json({ error: 'Error al procesar la suscripción' });
  }
}
