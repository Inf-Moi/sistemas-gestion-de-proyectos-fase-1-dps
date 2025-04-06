import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';

interface Task {
  id: number;
  title: string;
  status: 'To Do' | 'Doing' | 'Done';
}

interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

const STATUSES: Array<'To Do' | 'Doing' | 'Done'> = ['To Do', 'Doing', 'Done'];

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'To Do' | 'Doing' | 'Done'>('To Do');

  useEffect(() => {
    // Verifica token
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      // Para este ejemplo usamos datos simulados; en un entorno real, llama a tu API
      const initialProjects: Project[] = [
        {
          id: 1,
          name: 'Proyecto A',
          tasks: [
            { id: 101, title: 'Tarea 1 de A', status: 'To Do' },
            { id: 102, title: 'Tarea 2 de A', status: 'Doing' },
          ],
        },
        {
          id: 2,
          name: 'Proyecto B',
          tasks: [
            { id: 201, title: 'Tarea 1 de B', status: 'Done' },
          ],
        },
      ];
      setProjects(initialProjects);
      if (initialProjects.length > 0) {
        setSelectedProjectId(initialProjects[0].id);
      }
    }
  }, [router]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjectId(Number(e.target.value));
  };

  // Crear un nuevo proyecto
  const createProject = () => {
    if (!newProjectName.trim()) return;
    const newProject: Project = {
      id: Date.now(),
      name: newProjectName,
      tasks: [],
    };
    setProjects([...projects, newProject]);
    setNewProjectName('');
    setSelectedProjectId(newProject.id);
  };

  // Eliminar el proyecto seleccionado
  const deleteProject = () => {
    if (selectedProjectId === null) return;
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;
    const updatedProjects = projects.filter((p) => p.id !== selectedProjectId);
    setProjects(updatedProjects);
    setSelectedProjectId(updatedProjects.length > 0 ? updatedProjects[0].id : null);
  };

  // Agregar una tarea al proyecto seleccionado (el formulario se muestra arriba de las columnas)
  const addTask = () => {
    if (!newTaskTitle.trim() || selectedProjectId === null) return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      status: newTaskStatus,
    };
    const updatedProjects = projects.map((project) =>
      project.id === selectedProjectId ? { ...project, tasks: [...project.tasks, newTask] } : project
    );
    setProjects(updatedProjects);
    setNewTaskTitle('');
    setNewTaskStatus('To Do');
  };

  // Editar el título de una tarea
  const editTaskTitle = (taskId: number) => {
    if (!selectedProject) return;
    const newTitle = prompt('Nuevo título de la tarea:');
    if (!newTitle?.trim()) return;
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectId) {
        const updatedTasks = project.tasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        );
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Cambiar el estado de una tarea
  const changeTaskStatus = (taskId: number, newStatus: 'To Do' | 'Doing' | 'Done') => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectId) {
        const updatedTasks = project.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Eliminar una tarea
  const deleteTask = (taskId: number) => {
    if (!confirm('¿Eliminar esta tarea?')) return;
    if (!selectedProject) return;
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectId) {
        const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Dashboard</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Sección para gestionar proyectos */}
      <div className={styles.projectManagement}>
        <h3>Gestionar Proyectos</h3>
        <div className={styles.projectForm}>
          <input
            type="text"
            placeholder="Nombre del proyecto"
            className={styles.inputField}
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button className={styles.button} onClick={createProject}>
            Crear Proyecto
          </button>
        </div>
        {projects.length > 0 && (
          <div className={styles.projectList}>
            <label>Selecciona un proyecto: </label>
            <select
              value={selectedProjectId || ''}
              onChange={handleProjectChange}
              className={styles.selectInput}
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <button className={styles.button} onClick={deleteProject}>
              Eliminar Proyecto
            </button>
          </div>
        )}
      </div>

      {/* Sección para agregar tareas (arriba de las columnas) */}
      {selectedProject && (
        <div className={styles.addTaskContainer}>
          <h3>Añadir Tarea a {selectedProject.name}</h3>
          <div className={styles.addTaskForm}>
            <input
              type="text"
              placeholder="Título de la tarea"
              className={styles.addTaskInput}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <select
              className={styles.addTaskSelect}
              value={newTaskStatus}
              onChange={(e) =>
                setNewTaskStatus(e.target.value as 'To Do' | 'Doing' | 'Done')
              }
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <button className={styles.button} onClick={addTask}>
              Agregar Tarea
            </button>
          </div>
        </div>
      )}

      {/* Columnas para mostrar tareas */}
      {selectedProject && (
        <div className={styles.kanbanContainer}>
          {STATUSES.map((status) => {
            const tasksForStatus = selectedProject.tasks.filter(
              (t) => t.status === status
            );
            return (
              <div key={status} className={styles.column}>
                <h3 className={styles.columnTitle}>{status}</h3>
                <div className={styles.taskList}>
                  {tasksForStatus.map((task) => (
                    <div key={task.id} className={styles.taskCard}>
                      <p className={styles.taskTitle}>{task.title}</p>
                      <div className={styles.taskActions}>
                        <button
                          className={styles.button}
                          onClick={() => editTaskTitle(task.id)}
                        >
                          Editar
                        </button>
                        <select
                          value={task.status}
                          onChange={(e) =>
                            changeTaskStatus(
                              task.id,
                              e.target.value as 'To Do' | 'Doing' | 'Done'
                            )
                          }
                          style={{ fontSize: '0.8rem' }}
                        >
                          {STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <button
                          className={styles.button}
                          onClick={() => deleteTask(task.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
