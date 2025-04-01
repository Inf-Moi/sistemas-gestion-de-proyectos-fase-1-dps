"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      if (response.status === 200) {
        router.push("/projects"); // Redirigir tras login exitoso
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input {...register("email")} placeholder="Email" className="p-2 border rounded" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        
        <input type="password" {...register("password")} placeholder="Contraseña" className="p-2 border rounded" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ingresar</button>
      </form>
      <p className="mt-3 text-sm">
        ¿No tienes cuenta? <a href="/register" className="text-blue-500">Regístrate</a>
      </p>
    </div>
  );
}
