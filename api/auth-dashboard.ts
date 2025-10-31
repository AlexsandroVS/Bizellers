import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    const { username, password } = req.body;

    const adminUsername = process.env.DASHBOARD_USERNAME || 'admin';
    const adminPassword = process.env.DASHBOARD_PASSWORD || 'admin123';

    if (username === adminUsername && password === adminPassword) {
      // Generar un token simple (en producción usar JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

      return res.status(200).json({
        success: true,
        token,
        message: 'Autenticación exitosa'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
  } catch (error: any) {
    console.error('[AUTH] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
}
