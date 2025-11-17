import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../src/lib/prisma.js'; // Import shared prisma instance
import type { LeadStatus } from '../src/types/dashboard.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[UPDATE LEAD] Received request:', req.method, req.url);
  console.log('[UPDATE LEAD] Body:', req.body);
  console.log('[UPDATE LEAD] Headers:', req.headers);

  // Verificar autenticación básica
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  if (req.method !== 'PATCH') {
    console.log(`[UPDATE LEAD] Method not allowed: ${req.method}`);
    return res.status(405).json({
      success: false,
      message: 'Método no permitido'
    });
  }

  try {
    // Actualizar un lead (cambiar status, agregar notas)
    const { id, status, notes } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID es requerido'
        });
    }

    // Buscar el lead actual
    const currentLead = await prisma.lead.findUnique({
      where: { id: parseInt(id) }
    });

    if (!currentLead) {
      return res.status(404).json({
        success: false,
        message: 'Lead no encontrado'
      });
    }

    // Preparar el historial de status
    let statusHistory = currentLead.status_history as any[] | null;

    if (status && status !== currentLead.status) {
      const newHistoryEntry = {
        from: currentLead.status,
        to: status,
        timestamp: new Date().toISOString()
      };

      statusHistory = statusHistory ? [...statusHistory, newHistoryEntry] : [newHistoryEntry];
    }

    // Actualizar el lead
    const updatedLead = await prisma.lead.update({
      where: { id: parseInt(id) },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(statusHistory && { status_history: statusHistory })
      }
    });

    return res.status(200).json({
      success: true,
      lead: updatedLead
    });
  } catch (error: any) {
    console.error('[UPDATE LEAD] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
}
