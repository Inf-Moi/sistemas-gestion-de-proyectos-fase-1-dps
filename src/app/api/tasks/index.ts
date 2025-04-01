// pages/api/tasks/index.ts
import { NextApiRequest, NextApiResponse } from "next";

// Simulamos una base de datos en memoria para las tareas
let tasks = [
  { id: 1, title: "Tarea 1", description: "Descripción de tarea 1", projectId: 1 },
  { id: 2, title: "Tarea 2", description: "Descripción de tarea 2", projectId: 2 },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Obtener todas las tareas
    try {
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener tareas" });
    }
  } else if (req.method === "POST") {
    const { title, description, projectId } = req.body;

    // Validar que 'title', 'description' y 'projectId' están presentes
    if (!title || !description || !projectId) {
      return res.status(400).json({ message: "'title', 'description' y 'projectId' son obligatorios" });
    }

    // Crear una nueva tarea
    try {
      // Generamos un nuevo ID para la tarea
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      const newTask = { id: newId, title, description, projectId };
      tasks.push(newTask); // Agregar la nueva tarea al "almacenamiento"
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Error al crear tarea" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}

