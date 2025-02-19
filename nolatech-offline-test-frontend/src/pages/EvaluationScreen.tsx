import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { submitEvaluation, fetchEmployees } from "../services/api";

const EvaluationScreen = () => {
  const { auth } = useAuth();
  const [notification, setNotification] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      communicationScores: [3, 3, 3, 3, 3],
      teamworkScores: [3, 3, 3, 3, 3],
      problemSolvingScores: [3, 3, 3, 3, 3],
      leadershipScores: [3, 3, 3, 3, 3],
      comments: "",
    },
  });

  const getUserData = () => {
    if (auth.token) {
      const decoded: any = jwtDecode(auth.token);
      return decoded;
    }
    return null;
  };

  const userData = getUserData();
  const userId = userData?.id;
  const employeeId = userData?.employee?._id;
  const userRole = userData?.role;

  const { data: employees, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    enabled: userRole === "Admin" || userRole === "Manager",
  });

  const mutation = useMutation({
    mutationFn: submitEvaluation,
    onSuccess: () => {
      setNotification("Evaluación enviada con éxito");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error) => {
      setNotification("Ha ocurrido un error al enviar la evaluación");
      setTimeout(() => {
        setNotification("");
      }, 2000);
    },
  });

  const onSubmit = (data: any) => {
    const evaluationData = {
      evaluator: userId,
      employee: userRole === "Employee" ? employeeId : selectedEmployee,
      score: {
        communication: data.communicationScores.reduce(
          (total: number, score: number) => total + score,
          0
        ),
        teamwork: data.teamworkScores.reduce(
          (total: number, score: number) => total + score,
          0
        ),
        problemSolving: data.problemSolvingScores.reduce(
          (total: number, score: number) => total + score,
          0
        ),
        leadership: data.leadershipScores.reduce(
          (total: number, score: number) => total + score,
          0
        ),
      },
      comments: data.comments,
    };

    mutation.mutate(evaluationData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {userRole === "Employee" ? "Autoevaluación" : "Evaluar personal"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {userRole !== "Employee" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Seleccionar empleado
            </label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Seleccione un empleado</option>
              {employees?.map((employee: any) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName} -{" "}
                  {userRole === "Manager"
                    ? employee.position
                    : employee.department}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Comunicación</h2>
          {[
            "¿Cómo evaluas tu capacidad para escuchar activamente a tus colegas y superiores?",
            "¿Cómo calificas tu habilidad para comunicarte de manera clara y efectiva por escrito?",
            "¿Cómo evaluas tu capacidad para presentar información en reuniones o presentaciones?",
            "¿Cómo calificas tu habilidad para dar y recibir retroalimentación constructiva?",
            "¿Cómo evaluas tu capacidad para mantener una comunicación profesional en situaciones de conflicto?",
          ].map((question, index) => (
            <div key={index} className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {question}
              </label>
              <Controller
                name={`communicationScores.${index}`}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={1}>Muy malo</option>
                    <option value={2}>Malo</option>
                    <option value={3}>Intermedio</option>
                    <option value={4}>Bueno</option>
                    <option value={5}>Muy bueno</option>
                  </select>
                )}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Trabajo en equipo
          </h2>
          {[
            "¿Cómo calificas tu habilidad para colaborar con otros miembros del equipo para alcanzar objetivos comunes?",
            "¿Cómo evaluas tu capacidad para apoyar a tus colegas en momentos de alta carga de trabajo?",
            "¿Cómo calificas tu habilidad para resolver conflictos dentro del equipo de manera efectiva?",
            "¿Cómo evaluas tu disposición para trabajar con personas de diferentes antecedentes y habilidades?",
            "¿Cómo calificas tu capacidad para contribuir con ideas y soluciones durante las reuniones de equipo?",
          ].map((question, index) => (
            <div key={index} className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {question}
              </label>
              <Controller
                name={`teamworkScores.${index}`}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={1}>Muy malo</option>
                    <option value={2}>Malo</option>
                    <option value={3}>Intermedio</option>
                    <option value={4}>Bueno</option>
                    <option value={5}>Muy bueno</option>
                  </select>
                )}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Resolución de problemas
          </h2>
          {[
            "¿Cómo evaluas tu habilidad para identificar problemas rápidamente y proponer soluciones efectivas?",
            "¿Cómo calificas tu capacidad para analizar datos y tomar decisiones informadas?",
            "¿Cómo evaluas tu creatividad en la búsqueda de soluciones innovadoras?",
            "¿Cómo calificas tu habilidad para manejar situaciones de alta presión y encontrar soluciones rápidas?",
            "¿Cómo evaluas tu capacidad para implementar soluciones y seguir su progreso hasta la resolución del problema?",
          ].map((question, index) => (
            <div key={index} className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {question}
              </label>
              <Controller
                name={`problemSolvingScores.${index}`}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={1}>Muy malo</option>
                    <option value={2}>Malo</option>
                    <option value={3}>Intermedio</option>
                    <option value={4}>Bueno</option>
                    <option value={5}>Muy bueno</option>
                  </select>
                )}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Liderazgo</h2>
          {[
            "¿Cómo calificas tu habilidad para motivar y guiar a tu equipo hacia el cumplimiento de metas?",
            "¿Cómo evaluas tu capacidad para tomar decisiones en momentos críticos?",
            "¿Cómo calificas tu habilidad para delegar tareas de manera efectiva?",
            "¿Cómo evaluas tu capacidad para desarrollar el talento y las habilidades de los miembros de tu equipo?",
            "¿Cómo calificas tu habilidad para mantener la moral del equipo alta, incluso en situaciones difíciles?",
          ].map((question, index) => (
            <div key={index} className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {question}
              </label>
              <Controller
                name={`leadershipScores.${index}`}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={1}>Muy malo</option>
                    <option value={2}>Malo</option>
                    <option value={3}>Intermedio</option>
                    <option value={4}>Bueno</option>
                    <option value={5}>Muy bueno</option>
                  </select>
                )}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Comentarios
          </label>
          <Controller
            name="comments"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
            )}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Enviar Evaluación
        </button>
      </form>
      {notification && (
        <div className="bg-green-500 text-white p-2 rounded m-4">
          {notification}
        </div>
      )}
    </div>
  );
};

export default EvaluationScreen;
