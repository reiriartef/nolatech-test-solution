import { z } from "zod";
export const loginSchema = z.object({
  username: z.string().min(1, "Ingrese nombre de usuario válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
