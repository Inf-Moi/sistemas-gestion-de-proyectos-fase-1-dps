import React from 'react';

const TaskCard = ({ task }: { task: any }) => {
  return (
    <div className="card">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
