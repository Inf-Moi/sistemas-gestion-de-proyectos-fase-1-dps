// src/pages/index.tsx

import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a la Gestión de Proyectos</h1>
      <p className={styles.description}>
        Administra tus proyectos y tareas de forma sencilla y eficiente.
      </p>
      <div className={styles.links}>
        <Link href="/login" legacyBehavior>
          <a className={styles.link}>Iniciar Sesión</a>
        </Link>
        <Link href="/register" legacyBehavior>
          <a className={styles.link}>Registrarse</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
