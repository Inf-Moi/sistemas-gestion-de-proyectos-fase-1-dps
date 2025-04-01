// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma"; 
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Aquí ya no estamos validando la contraseña
      // Directamente generamos el token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
