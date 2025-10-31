import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../src/lib/prisma.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verificar autenticación básica
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  try {
    if (req.method === 'GET') {
      // Obtener todos los leads
      const leads = await prisma.lead.findMany({
        orderBy: {
          created_at: 'desc'
        }
      });

      return res.status(200).json({
        success: true,
        leads
      });
    } else {
      return res.status(405).json({
        success: false,
        message: 'Método no permitido'
      });
    }
  } catch (error: any) {
    console.error('[LEADS DASHBOARD] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}
