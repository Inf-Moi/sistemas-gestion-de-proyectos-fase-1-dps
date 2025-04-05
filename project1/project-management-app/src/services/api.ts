// services/api.ts

const API_URL = 'https://api.tuservidor.com'; // Reemplaza con la URL de tu API

export interface ApiResponse {
  success: boolean;
  message?: string;
  token?: string;
  projects?: Project[];
}

export interface UserData {
  username: string;
  email: string;
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Project {
  id: number;
  name: string;
  
}

export const registerUser = async (userData: UserData): Promise<ApiResponse> => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return await res.json();
};

export const loginUser = async (credentials: Credentials): Promise<ApiResponse> => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return await res.json();
};

export const fetchProjects = async (token: string): Promise<ApiResponse> => {
  const res = await fetch(`${API_URL}/projects`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return await res.json();
};
