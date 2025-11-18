// api/kpis/index.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import  prisma  from '../../src/lib/prisma.js';

function isAuthenticated(req: VercelRequest): boolean {
  const authHeader = req.headers.authorization;
  return !(!authHeader || !authHeader.startsWith('Bearer '));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Método ${req.method} no permitido` });
  }

  const { type, startDate: startDateQuery, endDate: endDateQuery } = req.query;

  const startDate = Array.isArray(startDateQuery) ? startDateQuery[0] : startDateQuery;
  const endDate = Array.isArray(endDateQuery) ? endDateQuery[0] : endDateQuery;

  try {
    let kpis: any = {};

    if (type === 'leads') {
      const whereClause: any = {};
      if (startDate && typeof startDate === 'string') {
        whereClause.created_at = { ...whereClause.created_at, gte: new Date(startDate) };
      }
      if (endDate && typeof endDate === 'string') {
        const endOfDay = new Date(endDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
        whereClause.created_at = { ...whereClause.created_at, lte: endOfDay };
      }

      // 1. Obtener leads filtrados por fecha
      const allLeads = await prisma.lead.findMany({
        where: whereClause,
      });

      // 2. Obtener conteo total de leads (MÉTODO CORREGIDO PARA PGBOUNCER)
      const totalLeadsList = await prisma.lead.findMany({
        select: { id: true } // Solo trae los IDs para eficiencia
      });
      const totalLeads = totalLeadsList.length;

      // 3. Nuevos leads en el periodo
      const newLeadsInPeriod = allLeads.length;

      // 4. Mapeo de status
      const leadsByStatusMap = new Map<string, number>();
      allLeads.forEach(lead => {
        leadsByStatusMap.set(lead.status, (leadsByStatusMap.get(lead.status) || 0) + 1);
      });
      const leadsByStatus = Array.from(leadsByStatusMap, ([status, count]) => ({ status, count }));

      kpis = {
        totalLeads,
        newLeadsInPeriod, 
        leadsByStatus: leadsByStatus,
      };
    } else if (type === 'newsletter') {
      const whereClause: any = {};
      if (startDate && typeof startDate === 'string') {
        whereClause.createdAt = { ...whereClause.createdAt, gte: new Date(startDate) };
      }
      if (endDate && typeof endDate === 'string') {
        const endOfDay = new Date(endDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
        whereClause.createdAt = { ...whereClause.createdAt, lte: endOfDay };
      }
      
      // 1. Obtener suscriptores filtrados por fecha
      const allSubscribers = await prisma.newsletterSubscription.findMany({
        where: whereClause,
      });

      // 2. Obtener conteo total de suscriptores (MÉTODO CORREGIDO PARA PGBOUNCER)
      const totalSubscribersList = await prisma.newsletterSubscription.findMany({
        select: { id: true }
      });
      const totalSubscribers = totalSubscribersList.length;
      
      // 3. Nuevos suscriptores en el periodo
      const newSubscribersInPeriod = allSubscribers.length;

      kpis = {
        totalSubscribers,
        newSubscribersInPeriod,
      };
    } else {
      return res.status(400).json({ success: false, message: 'Tipo de KPI no válido. Use "leads" o "newsletter".' });
    }

    return res.status(200).json({ success: true, data: kpis });

  } catch (error: any) {
    console.error('[KPIS_API] Error:', error);
    return res.status(500).json({ success: false, message: 'Error al obtener KPIs', error: error.message || String(error) });
  }
}