
import React from 'react';

interface Project {
  id: number;
  name: string;
  
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          {/* Renderizar tareas de rpyecto */}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
