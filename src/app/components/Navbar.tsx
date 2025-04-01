import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link href="/projects">Proyectos</Link> |  
      <Link href="/Pages/tasks">Tareas</Link> |  
      <Link href="/Pages/login">Login</Link> |  
      <Link href="/Pages/register">Registro</Link>
    </nav>
  );
}
