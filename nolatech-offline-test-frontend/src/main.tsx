import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthScreen from "./pages/AuthScreen";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import EmployeesScreen from "./pages/EmployeesScreen";
import ProfileScreen from "./pages/ProfileScreen";
import EvaluationScreen from "./pages/EvaluationScreen";
import DashboardScreen from "./pages/DashboardScreen";
const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path="/auth"
                element={
                  <PublicRoute>
                    <AuthScreen />
                  </PublicRoute>
                }
              />
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Routes>
                        <Route path="/" element={<DashboardScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route
                          path="/empleados"
                          element={<EmployeesScreen />}
                        />
                        <Route
                          path="/evaluaciones"
                          element={<EvaluationScreen />}
                        />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}
