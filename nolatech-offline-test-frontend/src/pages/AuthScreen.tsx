import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

function AuthScreen() {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-[600px] bg-white p-6 rounded-lg shadow-md bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-200">
        <div className="grid w-full grid-cols-2 mb-4">
          <button
            className={`py-2 px-4 text-center rounded-l-md ${
              activeTab === "register"
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Registro
          </button>
          <button
            className={`py-2 px-4 text-center rounded-r-md ${
              activeTab === "login"
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Inicio de Sesión
          </button>
        </div>
        {activeTab === "register" && (
          <RegisterForm setActiveTab={setActiveTab} />
        )}
        {activeTab === "login" && <LoginForm />}
      </div>
    </div>
  );
}

export default AuthScreen;
