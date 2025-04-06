
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  success: boolean;
  message?: string;
  newUser?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos para el registro.' });
  }

  try {
    // Crea el usuario en la base de datos (en producción, hashea la contraseña)
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return res.status(200).json({ success: true, message: 'Usuario registrado exitosamente.', newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al registrar usuario.' });
  }
}

