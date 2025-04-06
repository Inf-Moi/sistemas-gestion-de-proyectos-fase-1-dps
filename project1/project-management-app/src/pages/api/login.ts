
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  success: boolean;
  message?: string;
  token?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos para el inicio de sesión.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // En producción, compara contraseñas hasheadas
    if (user && user.password === password) {
      // Aquí podrías generar un token JWT real
      return res.status(200).json({ success: true, token: 'dummy-token' });
    } else {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al iniciar sesión.' });
  }
}

