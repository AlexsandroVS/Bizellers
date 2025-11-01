import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { isValidEmail } from '../src/utils/emailValidation.js';
import nodemailer from 'nodemailer';

// Prisma Client instantiation
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?pgbouncer=true`,
    },
  },
});

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
    html: `<div>...</div>`, // Email body
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
