import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../services/api";
import ResultsModal from "../components/ResultsModal";

interface Employee {
  dni: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  _id: string;
}

const EmployeesScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  const {
    data: employees = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredEmployees = employees.filter((employee: Employee) => {
    const matchesSearchTerm =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "" || employee.department === selectedDepartment;
    return matchesSearchTerm && matchesDepartment;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-4 mt-8">
      <div className="w-full max-w-6xl bg-white p-6 rounded shadow-xl">
        <h1 className="text-center text-2xl font-bold mb-4">
          Lista de Empleados Registrados
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Todos los departamentos</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">DNI</th>
              <th className="py-2 px-4 border-b text-left">Nombre</th>
              <th className="py-2 px-4 border-b text-left">Apellido</th>
              <th className="py-2 px-4 border-b text-left">
                Correo Electrónico
              </th>
              <th className="py-2 px-4 border-b text-left">Cargo</th>
              <th className="py-2 px-4 border-b text-left">Departamento</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee: Employee) => (
              <tr key={employee.dni}>
                <td className="py-2 px-4 border-b">{employee.dni}</td>
                <td className="py-2 px-4 border-b">{employee.firstName}</td>
                <td className="py-2 px-4 border-b">{employee.lastName}</td>
                <td className="py-2 px-4 border-b">{employee.email}</td>
                <td className="py-2 px-4 border-b">{employee.position}</td>
                <td className="py-2 px-4 border-b">{employee.department}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => setSelectedEmployeeId(employee._id)}
                  >
                    Resultados
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployeeId && (
        <ResultsModal
          employeeId={selectedEmployeeId}
          onClose={() => setSelectedEmployeeId(null)}
        />
      )}
    </div>
  );
};

export default EmployeesScreen;
