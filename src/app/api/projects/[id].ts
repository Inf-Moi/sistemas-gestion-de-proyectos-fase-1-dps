import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma"; // Conexión de Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Convertir id a número, ya que Prisma espera un número para la comparación
  const numericId = parseInt(id as string, 10); // Convierte el id a un número

  if (isNaN(numericId)) {
    return res.status(400).json({ message: "El ID proporcionado no es válido" });
  }

  if (req.method === "GET") {
    // Obtener un proyecto específico
    try {
      const project = await prisma.project.findUnique({
        where: { id: numericId }, // Utilizamos numericId aquí
      });

      if (!project) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el proyecto" });
    }
  } else if (req.method === "PUT") {
    const { name, description } = req.body;
    // Actualizar un proyecto específico
    try {
      const updatedProject = await prisma.project.update({
        where: { id: numericId }, // Utilizamos numericId aquí
        data: { name, description },
      });
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el proyecto" });
    }
  } else if (req.method === "DELETE") {
    // Eliminar un proyecto específico
    try {
      await prisma.project.delete({
        where: { id: numericId }, // Utilizamos numericId aquí
      });
      res.status(204).json({ message: "Proyecto eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el proyecto" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}

