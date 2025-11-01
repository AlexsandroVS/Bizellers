import { prisma } from './prisma';
import nodemailer from 'nodemailer';

// WARNING: Using a personal Gmail account for transactional emails is not recommended for production.
// Google may block sign-in attempts from your app, and you may hit rate limits.
// A dedicated service like Resend, SendGrid, or Mailgun is the best practice.

export async function sendWelcomeEmail(email: string, subscriptionId: number) {
  console.log(`Iniciando envío de correo de bienvenida a ${email}`);

  // 1. Configurar el transporter de Nodemailer con las credenciales de .env
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Asegúrate de que esta es una contraseña de aplicación de Google
    },
  });

  // 2. Definir el contenido del correo de bienvenida
  const mailOptions = {
    from: `"Bizellers" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '¡Bienvenido al Newsletter de Bizellers!',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #B4FC05; color: #121212; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">BIZELLERS</h1>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 22px; color: #121212;">¡Gracias por unirte!</h2>
          <p>Hola,</p>
          <p>Gracias por suscribirte a nuestro newsletter. Estás un paso más cerca de transformar tu equipo comercial en un motor de crecimiento.</p>
          <p>Pronto recibirás en tu bandeja de entrada contenido exclusivo, estrategias probadas y recursos que te ayudarán a escalar tus ventas B2B.</p>
          <p>¡Estamos felices de tenerte a bordo!</p>
          <br>
          <p>Saludos,<br>El equipo de Bizellers</p>
        </div>
        <div style="background-color: #f7f7f7; color: #666; padding: 20px; text-align: center; font-size: 12px;">
          <p>Recibiste este correo porque te suscribiste a nuestro newsletter en bizellers.com</p>
          <p>© ${new Date().getFullYear()} Bizellers. Todos los derechos reservados.</p>
        </div>
      </div>
    `,
  };

  // 3. Enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo de bienvenida enviado exitosamente a ${email}`);
  } catch (error) {
    console.error(`Error al enviar correo de bienvenida a ${email}:`, error);
    // Si el envío falla, lanzamos un error para no actualizar la base de datos
    throw new Error('Failed to send welcome email.');
  }

  // 4. Si el envío es exitoso, actualizar la base de datos
  try {
    await prisma.newsletterSubscription.update({
      where: { id: subscriptionId },
      data: { welcomeEmailSentAt: new Date() },
    });
    console.log(`Se marcó como enviado el correo para ${email}`);
    return { success: true };
  } catch (dbError) {
    console.error(`Error al actualizar el estado de envío para ${email}:`, dbError);
    throw new Error('Failed to update email sent status.');
  }
}
