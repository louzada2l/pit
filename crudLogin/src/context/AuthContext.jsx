// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Adiciona estado de carregamento

    useEffect(() => {
        const token = localStorage.getItem("storedToken");
        const role = localStorage.getItem("role");
        const name = localStorage.getItem("name");

        const verifyToken = async () => {
            setIsLoading(true); // Inicia o carregamento
            try {
                if (token) {
                    await axios.get("http://localhost:5000/api/auth/verify-token", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    
                    setIsAuthenticated(true);
                    setUserRole(role);
                    setUserName(name);
                }
            } catch (error) {
                // Limpa dados de autenticação em caso de erro
                setIsAuthenticated(false);
                setUserRole(null);
                setUserName(null);
                localStorage.removeItem("storedToken");
                localStorage.removeItem("role");
                localStorage.removeItem("name");
            } finally {
                setIsLoading(false); // Finaliza o carregamento
            }
        };

        verifyToken();
    }, []);

    const login = (name, role, token) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(name);
        localStorage.setItem("storedToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserName(null);
        localStorage.removeItem("storedToken");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
    };

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                userRole, 
                userName, 
                login, 
                logout,
                isLoading // Adiciona estado de carregamento ao contexto
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};