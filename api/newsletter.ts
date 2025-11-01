import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../src/lib/prisma.js';
import { isValidEmail } from '../src/utils/emailValidation.js';

// --- Lógica de Envío de Correo ---
// En un proyecto real, esto estaría en su propio archivo y usaría un servicio como Resend, SendGrid, etc.
async function sendWelcomeEmail(email: string, subscriptionId: number) {
  console.log(`SIMULACIÓN: Enviando correo de bienvenida a ${email}`);

  // TODO: Reemplazar con un servicio de email real
  // Ejemplo con Resend (requiere instalar 'resend'):
  /*
  import { Resend } from 'resend';
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: 'onboarding@bizellers.com',
      to: email,
      subject: '¡Bienvenido a Bizellers!',
      html: '<h1>Gracias por suscribirte</h1><p>Pronto recibirás noticias nuestras.</p>'
    });
    console.log(`Correo de bienvenida enviado exitosamente a ${email}`);
  } catch (error) {
    console.error(`Error al enviar correo de bienvenida a ${email}:`, error);
    // Si falla el envío, no actualizamos la DB para poder reintentar luego
    return;
  }
  */

  // Simulación exitosa: esperamos 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Actualizar la base de datos para marcar que el correo fue enviado
  try {
    await prisma.newsletterSubscription.update({
      where: { id: subscriptionId },
      data: { welcomeEmailSentAt: new Date() },
    });
    console.log(`SIMULACIÓN: Se marcó como enviado el correo para ${email}`);
  } catch (dbError) {
    console.error(`Error al actualizar el estado de envío para ${email}:`, dbError);
  }
}

// --- Handler de la API ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'El correo proporcionado no es válido.' });
  }

  try {
    // Intentar crear la suscripción
    const newSubscription = await prisma.newsletterSubscription.create({
      data: {
        email: email.toLowerCase(),
      },
    });

    // Disparar el envío del correo de bienvenida de forma asíncrona (no bloquea la respuesta)
    sendWelcomeEmail(newSubscription.email, newSubscription.id);

    return res.status(201).json({ success: true, message: '¡Gracias por suscribirte!' });

  } catch (error: any) {
    // Manejar el caso en que el correo ya existe (error de constraint único)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(409).json({ success: false, message: 'Este correo ya está suscrito.' });
    }

    console.error('[NEWSLETTER SUBSCRIBE] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.',
    });
  } finally {
    await prisma.$disconnect();
  }
}
