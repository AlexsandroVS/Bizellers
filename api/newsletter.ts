import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { isValidEmail } from '../src/utils/emailValidation.js';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?pgbouncer=true`,
    },
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'El correo proporcionado no es válido.' });
  }

  try {
    await prisma.newsletterSubscription.create({
      data: {
        email: email.toLowerCase(),
      },
    });

    return res.status(201).json({ success: true, message: '¡Gracias por suscribirte!' });

  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Este correo ya está suscrito.' });
    }
    console.error('[NEWSLETTER SUBSCRIBE] Error:', error);
    return res.status(500).json({ success: false, message: 'Ocurrió un error en el servidor.' });
  } finally {
    await prisma.$disconnect();
  }
}
