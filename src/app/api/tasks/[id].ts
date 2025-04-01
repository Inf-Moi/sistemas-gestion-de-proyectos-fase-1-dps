// pages/api/tasks/[id].ts
import { NextApiRequest, NextApiResponse } from "next";

// Simulamos una base de datos en memoria para las tareas
let tasks = [
  { id: 1, title: "Tarea 1", description: "Descripción de tarea 1" },
  { id: 2, title: "Tarea 2", description: "Descripción de tarea 2" },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Asegurarse de que el id sea un número válido (no un array y no NaN)
  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const taskId = parseInt(id as string); // Convertir id de string a número

  if (req.method === "GET") {
    // Obtener una tarea específica
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(task);
  } else if (req.method === "PUT") {
    const { title, description } = req.body;
    // Validar que title y description están presentes
    if (!title || !description) {
      return res.status(400).json({ message: "'title' y 'description' son obligatorios" });
    }

    // Actualizar una tarea específica
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    tasks[taskIndex] = { id: taskId, title, description };
    res.status(200).json(tasks[taskIndex]);
  } else if (req.method === "DELETE") {
    // Eliminar una tarea específica
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    tasks.splice(taskIndex, 1); // Eliminar la tarea del array
    res.status(204).json({ message: "Tarea eliminada" });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
