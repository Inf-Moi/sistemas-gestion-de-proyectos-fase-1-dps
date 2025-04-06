

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  success: boolean;
  projects?: any[];
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Verifica el header de autorización (este ejemplo usa token dummy)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No autorizado.' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== 'dummy-token') {
    return res.status(401).json({ success: false, message: 'Token inválido.' });
  }

  try {
    // Obtén proyectos asociados a un usuario (para este ejemplo, todos los proyectos)
    const projects = await prisma.project.findMany();
    return res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al obtener proyectos.' });
  }
}
