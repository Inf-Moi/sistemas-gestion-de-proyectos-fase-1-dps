import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loginUser } from '../services/api';
import styles from '../styles/Auth.module.css';

const Login: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
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
            Entrar
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.footer}>
          ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
