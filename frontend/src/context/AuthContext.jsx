import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000";

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/auth/current`, {
          withCredentials: true,
        });
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        // User is not logged in or session expired - this is expected
        // Silently fail and set user to null
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/auth/register`,
        { name, email, password, role },
        { withCredentials: true },
      );
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      const message = err.response?.data?.message || "Logout failed";
      setError(message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
