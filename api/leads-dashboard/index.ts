import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

// Prisma Client instantiation with connection pooling for serverless environments
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?pgbouncer=true`,
    },
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  try {
    if (req.method === 'GET') {
      const { startDate: startDateQuery, endDate: endDateQuery } = req.query;

      // Robustly handle string or string[] from query
      const startDate = Array.isArray(startDateQuery) ? startDateQuery[0] : startDateQuery;
      const endDate = Array.isArray(endDateQuery) ? endDateQuery[0] : endDateQuery;

      const whereClause: any = {};

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Ensure dates are valid before adding to query
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          end.setUTCHours(23, 59, 59, 999); // Go to the very end of the selected day
          whereClause.created_at = {
            gte: start,
            lte: end, // Use lte to include the full end day
          };
        }
      }

      const leads = await prisma.lead.findMany({
        where: whereClause,
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
