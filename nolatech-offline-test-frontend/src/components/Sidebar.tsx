import React, { useState } from "react";
import {
  Home,
  UserRoundSearch,
  UserRoundCheck,
  UserRoundPen,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import ResultsModal from "../components/ResultsModal";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const getUserRole = () => {
    if (auth.token) {
      const decoded: any = jwtDecode(auth.token);
      return decoded.role;
    }
    return null;
  };

  const getEmployeeId = () => {
    if (auth.token) {
      const decoded: any = jwtDecode(auth.token);
      return decoded.employee._id;
    }
    return null;
  };

  const userRole = getUserRole();
  const employeeId = getEmployeeId();

  return (
    <div
      className={`h-full bg-gray-800 text-white ${
        isExpanded ? "w-50" : "w-15"
      } transition-width duration-300`}
    >
      <div className="p-4 flex justify-between items-center">
        <h2 className={`text-xl font-bold ${!isExpanded && "hidden"}`}>
          Nolatech
        </h2>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <Menu className="text-white" />
        </button>
      </div>
      <ul className="mt-4">
        <li
          className="p-4 hover:bg-gray-700 flex items-center"
          onClick={() => navigate("/")}
        >
          <Home className="mr-2" />
          {isExpanded && <span>Inicio</span>}
        </li>
        {(userRole === "Admin" || userRole === "Manager") && (
          <li
            className="p-4 hover:bg-gray-700 flex items-center"
            onClick={() => navigate("/empleados")}
          >
            <UserRoundSearch className="mr-2" />
            {isExpanded && <span>Empleados</span>}
          </li>
        )}
        <li
          className="p-4 hover:bg-gray-700 flex items-center"
          onClick={() => navigate("/evaluaciones")}
        >
          <UserRoundPen className="mr-2" />
          {isExpanded && (
            <span>
              {userRole === "Employee" ? "Autoevaluación" : "Evaluaciones"}
            </span>
          )}
        </li>
        {userRole === "Employee" && (
          <li
            className="p-4 hover:bg-gray-700 flex items-center"
            onClick={() => setShowResultsModal(true)}
          >
            <UserRoundCheck className="mr-2" />
            {isExpanded && <span>Mis Resultados</span>}
          </li>
        )}
      </ul>
      {showResultsModal && employeeId && (
        <ResultsModal
          employeeId={employeeId}
          onClose={() => setShowResultsModal(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
