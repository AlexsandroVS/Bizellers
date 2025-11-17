import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../utils/prisma.js'; // Import shared prisma instance
import * as XLSX from 'xlsx';

// Helper para verificar la autenticación
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

  const { type, format, startDate: startDateQuery, endDate: endDateQuery } = req.query;

  const startDate = Array.isArray(startDateQuery) ? startDateQuery[0] : startDateQuery;
  const endDate = Array.isArray(endDateQuery) ? endDateQuery[0] : endDateQuery;

  const dateFilter: any = {};
  if (startDate && typeof startDate === 'string') {
    dateFilter.gte = new Date(startDate);
  }
  if (endDate && typeof endDate === 'string') {
    const endOfDay = new Date(endDate);
    endOfDay.setUTCHours(23, 59, 59, 999);
    dateFilter.lte = endOfDay;
  }

  try {
    let data: any[] = [];
    let filename = 'export';

    if (type === 'leads') {
      data = await prisma.lead.findMany({
        where: {
          created_at: dateFilter,
        },
        select: {
          id: true,
          nombre: true,
          cargo: true,
          empresa: true,
          telefono: true,
          correo: true,
          servicio: true,
          mensaje: true,
          status: true,
          notes: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: { created_at: 'desc' },
      });
      filename = 'leads_export';
    } else if (type === 'newsletter') {
      data = await prisma.newsletterSubscription.findMany({
        where: {
          createdAt: dateFilter,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          welcomeEmailSentAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      filename = 'newsletter_export';
    } else {
      return res.status(400).json({ success: false, message: 'Tipo de exportación no válido. Use "leads" o "newsletter".' });
    }

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'No se encontraron datos para exportar con los filtros proporcionados.' });
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    if (format === 'csv') {
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
      return res.status(200).send(csv);
    } else if (format === 'xlsx') {
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.xlsx"`);
      return res.status(200).send(excelBuffer);
    } else {
      return res.status(400).json({ success: false, message: 'Formato de exportación no válido. Use "csv" o "xlsx".' });
    }
  } catch (error: any) {
    console.error('[EXPORT_API] Error:', error);
    return res.status(500).json({ success: false, message: 'Error al exportar datos', error: error.message });
  }
}
