import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUser } from "../hooks/useLoginUser";
import { useNavigate } from "react-router";
import { loginSchema } from "../schemas/loginSchema";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, status, isError, isSuccess, error } = useLoginUser();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError || isSuccess) {
      const timer = setTimeout(() => {
        reset();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isError, isSuccess, reset]);

  const onSubmit = (data) => {
    const loginData = {
      ...data,
      username: data.username.toLowerCase(),
    };
    mutate(loginData, {
      onSuccess: (response) => {
        localStorage.setItem("token", response.token);
        setAuth({ token: response.token });
        navigate("/");
      },
      onError: (error) => {
        console.error("Error al iniciar sesión", error);
      },
    });
  };

  return (
    <div className="p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Inicio de Sesión
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {status === "pending" ? "Iniciando..." : "Iniciar Sesión"}
        </button>
        {isError && (
          <p className="text-red-500 mt-2">
            Error al iniciar sesión:{" "}
            {(error as any).response?.data?.message || error.message}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-2">Inicio de sesión exitoso.</p>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
