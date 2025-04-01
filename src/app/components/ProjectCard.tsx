import React from 'react';

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="card">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectCard;
