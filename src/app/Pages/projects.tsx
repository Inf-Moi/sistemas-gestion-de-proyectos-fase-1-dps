"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";  // Correcta

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);  // Usamos 'any' para simplificar

  useEffect(() => {
    axios.get("/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error al obtener proyectos:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
