// pages/dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchProjects, ApiResponse, Project } from '../services/api';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      loadProjects(token);
    }
  }, [router]);

  const loadProjects = async (token: string) => {
    try {
      const data: ApiResponse = await fetchProjects(token);
      if (data.success && data.projects) {
        setProjects(data.projects);
      } else {
        setError(data.message || 'Error al cargar proyectos');
      }
    } catch (err) {
      setError('Error al cargar proyectos');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            {/* Aquí puedes incluir un componente TaskList para mostrar las tareas */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
