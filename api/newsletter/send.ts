import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?pgbouncer=true`,
    },
  },
});

async function sendWelcomeEmail(email: string, subscriptionId: number) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `"Bizellers" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '¡Bienvenido al Newsletter de Bizellers!',
    html: `<div>...</div>`, // Cuerpo del correo
  };
  await transporter.sendMail(mailOptions);
  await prisma.newsletterSubscription.update({
    where: { id: subscriptionId },
    data: { welcomeEmailSentAt: new Date() },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

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
    console.error('[NEWSLETTER SEND] Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Error al enviar correo' });
  } finally {
    await prisma.$disconnect();
  }
}
