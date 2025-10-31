import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { prisma } from '../src/lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, phone, message, cargo, empresa, service, servicio } = req.body;

  // Validar campos requeridos
  if (!name || !email || !empresa || !phone) {
    return res.status(400).json({ error: 'Nombre, email, empresa y teléfono son requeridos' });
  }

  try {
    // Guardar lead en la base de datos
    const finalServicio = servicio || service || 'Contacto General';
    const finalCargo = cargo || 'Lead';

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

    // Configurar transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Determinar el asunto del email
    const subject = service
      ? `Nueva solicitud de servicio: ${service} - ${name}`
      : `Nuevo contacto desde la Landing Page - ${name}`;

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.VITE_CONTACT_EMAIL || 'contacto@bizellers.com',
      subject: subject,
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
                        ${service ? '🎯 Nueva Solicitud de Servicio' : '📧 Nuevo Contacto'}
                      </p>
                    </td>
                  </tr>

                  <!-- Service Badge (if applicable) -->
                  ${service ? `
                  <tr>
                    <td style="padding: 20px 30px; background-color: #121212; text-align: center;">
                      <div style="display: inline-block; background-color: #B4FC05; color: #121212; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 15px;">
                        ${service}
                      </div>
                    </td>
                  </tr>
                  ` : ''}

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 24px 0; color: #121212; font-size: 20px; font-weight: 700;">Información del Contacto</h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; padding: 20px;">
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre</strong>
                            <p style="margin: 4px 0 0 0; color: #121212; font-size: 16px; font-weight: 600;">${name}</p>
                          </td>
                        </tr>
                        
                        <tr>
                          <td style="padding: 16px 0 8px 0; border-top: 1px solid #e0e0e0;">
                            <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                            <p style="margin: 4px 0 0 0;">
                              <a href="mailto:${email}" style="color: #B4FC05; background-color: #121212; text-decoration: none; font-size: 16px; font-weight: 600; padding: 6px 12px; border-radius: 4px; display: inline-block;">${email}</a>
                            </p>
                          </td>
                        </tr>
                        
                        ${cargo ? `
                        <tr>
                          <td style="padding: 16px 0 8px 0; border-top: 1px solid #e0e0e0;">
                            <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Cargo</strong>
                            <p style="margin: 4px 0 0 0; color: #121212; font-size: 16px;">${cargo}</p>
                          </td>
                        </tr>
                        ` : ''}
                        
                        ${empresa ? `
                        <tr>
                          <td style="padding: 16px 0 8px 0; border-top: 1px solid #e0e0e0;">
                            <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Empresa</strong>
                            <p style="margin: 4px 0 0 0; color: #121212; font-size: 16px; font-weight: 600;">🏢 ${empresa}</p>
                          </td>
                        </tr>
                        ` : ''}
                        
                        ${phone ? `
                        <tr>
                          <td style="padding: 16px 0 8px 0; border-top: 1px solid #e0e0e0;">
                            <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Teléfono</strong>
                            <p style="margin: 4px 0 0 0;">
                              <a href="tel:${phone}" style="color: #121212; text-decoration: none; font-size: 16px; font-weight: 600;">📞 ${phone}</a>
                            </p>
                          </td>
                        </tr>
                        ` : ''}
                        
                        ${message ? `
                        <tr>
                          <td style="padding: 16px 0 8px 0; border-top: 1px solid #e0e0e0;">
                            <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</strong>
                            <div style="margin: 12px 0 0 0; background-color: #ffffff; padding: 16px; border-left: 4px solid #B4FC05; border-radius: 4px;">
                              <p style="margin: 0; color: #3A3A3A; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                            </div>
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #B4FC05 0%, #9DD604 100%); color: #121212; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 2px 4px rgba(180, 252, 5, 0.3);">
                              ✉️ Responder ahora
                            </a>
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
                        ${service ? '📋 Enviado desde el modal de servicios' : '📋 Enviado desde el formulario de contacto'}
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

    return res.status(200).json({ success: true, message: 'Email enviado correctamente y lead guardado' });
  } catch (error: any) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({
      error: 'Error al procesar la solicitud',
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}
