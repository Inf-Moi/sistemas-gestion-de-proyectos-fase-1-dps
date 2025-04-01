import { prisma } from "../../lib/prisma";  // Ajusta la ruta de acuerdo con tu estructura
import bcrypt from 'bcryptjs';

async function createUser() {
  const password = 'myPassword'; // La contraseña en texto plano
  const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'John Doe',
     
    },
  });

  console.log(user);
}

createUser();
