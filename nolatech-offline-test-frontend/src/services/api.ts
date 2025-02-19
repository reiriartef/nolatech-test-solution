import axios from "axios";
import { useAuth } from "../context/AuthContext";

const api = axios.create({
  baseURL: "https://nolatech-offline-test-backend.onrender.com/api", // Reemplaza con la URL de tu backend
});

interface EmployeeData {
  dni: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
}

interface UserData {
  username: string;
  password: string;
  role: string;
  employeeData?: EmployeeData;
}

interface LoginData {
  username: string;
  password: string;
}

interface EvaluationData {
  evaluator: string;
  employee: string;
  score: {
    communication: number;
    teamwork: number;
    problemSolving: number;
    leadership: number;
  };
  comments?: string;
}

export const registerUser = async (userData: UserData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (loginData: LoginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

export const fetchEmployees = async () => {
  const token = localStorage.getItem("token") || useAuth().auth.token;
  const response = await api.get("/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchResults = async (employeeId: string) => {
  const token = localStorage.getItem("token") || useAuth().auth.token;
  const response = await api.get(`/evaluations/employee/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const submitEvaluation = async (evaluationData: EvaluationData) => {
  const token = localStorage.getItem("token") || useAuth().auth.token;
  const response = await api.post("/evaluations", evaluationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
