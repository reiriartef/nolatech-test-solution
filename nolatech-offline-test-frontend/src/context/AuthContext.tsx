import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  auth: { token: string | null };
  isAuthenticated: boolean;
  setAuth: React.Dispatch<React.SetStateAction<{ token: string | null }>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: { token: null },
  isAuthenticated: false,
  setAuth: () => {},
  logout: () => {},
});

const isTokenValid = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState<{ token: string | null }>({ token: null });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? isTokenValid(token) : false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setAuth({ token });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/auth");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null });
    setIsAuthenticated(false);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
