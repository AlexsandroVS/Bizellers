import type { VercelRequest, VercelResponse } from '@vercel/node';
import  prisma  from '../src/lib/prisma.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verificar autenticación básica
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({
      success: false,
      message: 'Método no permitido'
    });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'ID es requerido'
    });
  }

  try {
    await prisma.lead.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ success: true, message: 'Lead eliminado' });
  } catch (error: any) {
    console.error('[DELETE LEAD] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}
