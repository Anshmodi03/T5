// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8000/api/auth";

// Create the authentication context
const AuthContext = createContext(null);

// Hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component for the auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount.
  useEffect(() => {
    const storedUser = localStorage.getItem("t5_user");
    const storedToken = localStorage.getItem("t5_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function: calls /login then /me to fetch user details.
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Call login endpoint.
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const { token } = await response.json();
      localStorage.setItem("t5_token", token);

      // Call GET /me to retrieve user details.
      const meResponse = await fetch(`${API_BASE_URL}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!meResponse.ok) {
        const errorData = await meResponse.json();
        throw new Error(errorData.error || "Failed to retrieve user data");
      }

      const userData = await meResponse.json();
      setUser(userData);
      localStorage.setItem("t5_user", JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Choose endpoint based on the role ('student' or 'teacher').
      const endpoint = userData.role === "teacher" ? "teacher" : "student";
      const response = await fetch(`${API_BASE_URL}/signup/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      const newUser = await response.json();
      // You might want to handle OTP verification before setting user details.
      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function: call server's logout endpoint and clear data.
  const logout = async () => {
    try {
      const token = localStorage.getItem("t5_token");
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("t5_user");
      localStorage.removeItem("t5_token");
    }
  };

  // Verify OTP function
  const verifyOtp = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "OTP verification failed");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Reset password function (send reset request)
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/password-reset-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Password reset request failed");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    verifyOtp,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
