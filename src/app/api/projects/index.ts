import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma"; // Conexión de Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Obtener todos los proyectos
    try {
      const projects = await prisma.project.findMany();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener proyectos" });
    }
  } else if (req.method === "POST") {
    const { name, description, ownerId } = req.body;

    // Validar que se ha proporcionado un ownerId
    if (!ownerId) {
      return res.status(400).json({ message: "El 'ownerId' es obligatorio." });
    }

    // Crear un nuevo proyecto
    try {
      const newProject = await prisma.project.create({
        data: {
          name,
          description,
          ownerId,  // Asegúrate de pasar el 'ownerId'
        },
      });
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ message: "Error al crear proyecto" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}


