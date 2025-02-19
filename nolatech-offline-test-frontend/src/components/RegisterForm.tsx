import React, { useEffect } from "react";
import { useRegisterUser } from "../hooks/useRegisterUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";

const roles = ["Admin", "Manager", "Employee"];
const positions = [
  "Developer",
  "Designer",
  "Product Manager",
  "QA Engineer",
  "DevOps",
];
const departments = [
  "Engineering",
  "Design",
  "Product",
  "Quality Assurance",
  "Operations",
];

interface RegisterFormProps {
  setActiveTab: (tab: string) => void;
}

function RegisterForm({ setActiveTab }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { mutate, status, isError, isSuccess, error } = useRegisterUser();

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      password: data.password,
      role: data.role,
      employeeData: {
        dni: data.dni,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        position: data.position,
        department: data.department,
      },
    };
    mutate(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset();
        setActiveTab("login");
      }, 2000);
    }
  }, [isSuccess, reset, setActiveTab]);

  return (
    <div className="p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Registro</h2>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre de Usuario
          </label>
          <input
            id="username"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            placeholder="Tu nombre de usuario"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            placeholder="Tu contraseña"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Rol
          </label>
          <select
            id="role"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            {...register("role")}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="dni"
            className="block text-sm font-medium text-gray-700"
          >
            DNI
          </label>
          <input
            id="dni"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            placeholder="Tu DNI"
            {...register("dni")}
          />
          {errors.dni && (
            <p className="text-red-500 mt-1">{errors.dni.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            id="firstName"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            placeholder="Tu nombre"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Apellido
          </label>
          <input
            id="lastName"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            placeholder="Tu apellido"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500 mt-1">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            placeholder="Tu correo electrónico"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Posición
          </label>
          <select
            id="position"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            {...register("position")}
          >
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          {errors.position && (
            <p className="text-red-500 mt-1">{errors.position.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Departamento
          </label>
          <select
            id="department"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            {...register("department")}
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 mt-1">{errors.department.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {status === "pending" ? "Registrando..." : "Crear Cuenta"}
          </button>
          {isError && (
            <p className="text-red-500 mt-2">
              Error al registrar el usuario: {error.message}
            </p>
          )}
          {isSuccess && (
            <p className="text-green-500 mt-2">
              Usuario registrado exitosamente.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
