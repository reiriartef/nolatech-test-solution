import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { jwtDecode, JwtPayload } from "jwt-decode";

const dataEvaluations = [
  { name: "Enero", evaluations: 30 },
  { name: "Febrero", evaluations: 45 },
  { name: "Marzo", evaluations: 60 },
  { name: "Abril", evaluations: 50 },
  { name: "Mayo", evaluations: 70 },
];

const dataScores = [
  { name: "Comunicación", score: 85 },
  { name: "Trabajo en equipo", score: 90 },
  { name: "Resolución de problemas", score: 75 },
  { name: "Liderazgo", score: 80 },
];

const dataPie = [
  { name: "Evaluaciones Completadas", value: 400 },
  { name: "Evaluaciones Pendientes", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const dataRadar = [
  { subject: "Comunicación", A: 120, B: 110, fullMark: 150 },
  { subject: "Trabajo en equipo", A: 98, B: 130, fullMark: 150 },
  { subject: "Resolución de problemas", A: 86, B: 130, fullMark: 150 },
  { subject: "Liderazgo", A: 99, B: 100, fullMark: 150 },
];

const dataEmployees = [{ name: "Total Empleados", value: 150 }];

const dataEmployeeScores = [
  { name: "1-20", value: 10 },
  { name: "21-40", value: 20 },
  { name: "41-60", value: 30 },
  { name: "61-80", value: 40 },
  { name: "81-100", value: 50 },
];

const DashboardScreen = () => {
  const { auth } = useAuth();
  const token = auth?.token;
  interface CustomJwtPayload extends JwtPayload {
    role?: string;
  }

  const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const userRole = decodedToken?.role;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(userRole === "Admin" ||
          userRole === "Manager" ||
          userRole === "Employee") && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium mb-2">
              Evaluaciones Realizadas
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dataEvaluations}>
                <Line type="monotone" dataKey="evaluations" stroke="#8884d8" />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        {(userRole === "Admin" ||
          userRole === "Manager" ||
          userRole === "Employee") && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium mb-2">Puntuaciones Promedio</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataScores}>
                <Bar dataKey="score" fill="#82ca9d" />
                <Tooltip />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {(userRole === "Admin" || userRole === "Manager") && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium mb-2">Estado de Evaluaciones</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataPie}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {(userRole === "Admin" || userRole === "Manager") && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium mb-2">
              Distribución de Puntuaciones
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
        {(userRole === "Admin" || userRole === "Manager") && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium mb-2">Evaluaciones por Mes</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataEvaluations}>
                <Bar dataKey="evaluations" fill="#8884d8" />
                <Tooltip />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {userRole === "Admin" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium mb-2">Cantidad de Empleados</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataEmployees}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataEmployees.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {userRole === "Admin" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium mb-2">
              Empleados según Puntuaciones
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataEmployeeScores}>
                <Bar dataKey="value" fill="#8884d8" />
                <Tooltip />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        <p>
          <strong>Disclaimer:</strong> Los datos mostrados en este dashboard son
          ficticios y solo tienen fines de demostración. Para utilizar datos
          reales, se deben crear las APIs correspondientes para obtener
          estadísticas reales.
        </p>
      </div>
    </div>
  );
};

export default DashboardScreen;
