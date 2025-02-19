import React, { useEffect, useState } from "react";
import { fetchResults } from "../services/api";
import { useQuery } from "@tanstack/react-query";

interface ResultsModalProps {
  employeeId: string;
  onClose: () => void;
}

interface Result {
  score: {
    communication: number;
    teamwork: number;
    problemSolving: number;
    leadership: number;
  };
  evaluator: {
    username: string;
    employee: {
      firstName: string;
      lastName: string;
      position: string;
      department: string;
    };
  };
  comments: string;
  date: string;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ employeeId, onClose }) => {
  const {
    data: results = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["results", employeeId],
    queryFn: () => fetchResults(employeeId),
  });

  const calculateTotalScore = (score: Result["score"]) => {
    return (
      score.communication +
      score.teamwork +
      score.problemSolving +
      score.leadership
    );
  };

  const getScoreRange = (totalScore: number) => {
    if (totalScore <= 25) return "Bajo";
    if (totalScore <= 50) return "Promedio";
    if (totalScore <= 75) return "Bueno";
    return "Excelente";
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Ocurrio un error al obtener los resultados.</div>;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 z-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 h-3/4 overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Resultados</h2>
        {results.length === 0 ? (
          <div className="text-center text-gray-500">
            Este empleado no posee evaluaciones
          </div>
        ) : (
          results.map((result: Result, index: number) => {
            const totalScore = calculateTotalScore(result.score);
            const scoreRange = getScoreRange(totalScore);
            return (
              <div
                key={index}
                className="mb-4 p-4 border rounded shadow text-black"
              >
                <h3 className="text-xl font-bold mb-2">
                  Evaluador:{" "}
                  {result.evaluator.employee.firstName +
                    " " +
                    result.evaluator.employee.lastName}
                </h3>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(result.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Comentarios:</strong> {result.comments}
                </p>
                <div className="mt-4">
                  <h4 className="text-lg font-bold">Puntuaciones:</h4>
                  <p>Comunicación: {result.score.communication}/25</p>
                  <p>Trabajo en equipo: {result.score.teamwork}/25</p>
                  <p>
                    Resolución de problemas: {result.score.problemSolving}/25
                  </p>
                  <p>Liderazgo: {result.score.leadership}/25</p>
                  <p className="mt-2">
                    <strong>Puntuación total:</strong> {totalScore}/100 (
                    {scoreRange})
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ResultsModal;
