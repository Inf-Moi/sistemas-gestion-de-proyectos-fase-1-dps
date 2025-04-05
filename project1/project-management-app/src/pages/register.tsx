import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { registerUser } from '../services/api';
import styles from '../styles/Auth.module.css';

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      if (data.success) {
        router.push('/login');
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Registrarse</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Registrarse
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.footer}>
          ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
