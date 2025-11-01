import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?pgbouncer=true`,
    },
  },
});

// Helper para verificar la autenticación
function isAuthenticated(req: VercelRequest): boolean {
  const authHeader = req.headers.authorization;
  return !(!authHeader || !authHeader.startsWith('Bearer '));
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  try {
    const total = await prisma.newsletterSubscription.count();
    const subscribers = await prisma.newsletterSubscription.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: subscribers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('[NEWSLETTER_DASHBOARD_GET] Error:', error);
    return res.status(500).json({ success: false, message: 'Error al obtener suscriptores' });
  }
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'ID de suscriptor no válido' });
  }

  try {
    await prisma.newsletterSubscription.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ success: true, message: 'Suscriptor eliminado' });
  } catch (error: any) {
    console.error('[NEWSLETTER_DASHBOARD_DELETE] Error:', error);
    return res.status(500).json({ success: false, message: 'Error al eliminar suscriptor' });
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
      default:
        res.setHeader('Allow', ['GET', 'DELETE']);
        return res.status(405).json({ success: false, message: `Método ${req.method} no permitido` });
    }
  } finally {
    await prisma.$disconnect();
  }
}
