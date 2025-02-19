import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "El nombre de usuario es requerido")
    .max(20, "El nombre de usuario no puede tener más de 20 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["Admin", "Manager", "Employee"]),
  dni: z.string().min(7, "El DNI es requerido").transform(Number),
  firstName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  lastName: z
    .string()
    .min(1, "El apellido es requerido")
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  position: z.enum([
    "Developer",
    "Designer",
    "Product Manager",
    "QA Engineer",
    "DevOps",
  ]),
  department: z.enum([
    "Engineering",
    "Design",
    "Product",
    "Quality Assurance",
    "Operations",
  ]),
});
