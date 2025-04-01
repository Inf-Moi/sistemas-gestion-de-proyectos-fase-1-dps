// lib/validations.ts
import * as yup from 'yup';

// Validación para login
export const loginSchema = yup.object().shape({
  email: yup.string().email('Correo electrónico inválido').required('El correo es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});

// Validación para registro
export const registerSchema = yup.object().shape({
  email: yup.string().email('Correo electrónico inválido').required('El correo es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});

// Validación para proyectos
export const projectSchema = yup.object().shape({
  name: yup.string().required('El nombre del proyecto es requerido'),
  description: yup.string().required('La descripción es requerida'),
});

// Validación para tareas
export const taskSchema = yup.object().shape({
  title: yup.string().required('El título de la tarea es requerido'),
  description: yup.string().required('La descripción es requerida'),
});
