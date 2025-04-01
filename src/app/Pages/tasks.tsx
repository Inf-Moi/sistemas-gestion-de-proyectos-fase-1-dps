"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";  // Correcta

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);  // Usamos 'any' para simplificar

  useEffect(() => {
    axios.get("/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error al obtener tareas:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">Tareas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
