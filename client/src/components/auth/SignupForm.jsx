"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  MessageSquare,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { AnimatedButton } from "./AnimatedComponents";
import { register } from "./authService";

const SignupForm = ({
  userRole,
  onClose,
  onSwitchToLogin,
  onSignupComplete,
  setCursorVariant,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    agreeToTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      setPasswordStrength({
        hasMinLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ ...formData, userRole });
      if (data.teacher || data.user) {
        console.log("Registration successful:", data);
        onSignupComplete();
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-2xl font-bold text-teal-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sign Up
        </motion.h2>
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100"
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <X className="h-5 w-5" />
        </motion.button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white overflow-hidden bg-teal-500"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <span className="text-2xl font-bold">
              {userRole === "student" ? "S" : "T"}
            </span>
          </motion.div>
        </div>
        <h3 className="text-center text-lg font-medium">
          Sign up as{" "}
          <span className="text-teal-500 font-semibold">
            {userRole === "student" ? "Student" : "Teacher"}
          </span>
        </h3>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your full name"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            required
          />
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your mobile number"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Create a password"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              required
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </motion.button>
          </div>

          {formData.password && (
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex items-center">
                {passwordStrength.hasMinLength ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasMinLength
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.hasUppercase ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasUppercase
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least one uppercase letter
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.hasLowercase ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasLowercase
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least one lowercase letter
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.hasNumber ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasNumber
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least one number
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.hasSpecialChar ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasSpecialChar
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least one special character
                </span>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              required
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-teal-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-600 hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <AnimatedButton
            type="submit"
            className="w-full py-2 text-white rounded-md mb-4 bg-teal-500 hover:bg-teal-600"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            disabled={!isPasswordStrong || !formData.agreeToTerms}
          >
            Sign Up
          </AnimatedButton>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="border-t border-gray-300 absolute w-full"></div>
          <div className="bg-white px-4 relative z-10 text-sm text-gray-500">
            or
          </div>
        </motion.div>

        <motion.button
          type="button"
          className="w-full py-2 border border-green-600 text-green-600 rounded-md flex items-center justify-center gap-2 mb-6 hover:bg-green-50 transition-colors"
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(22, 163, 74, 0.05)",
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          onClick={() => window.open("https://wa.me/1234567890", "_blank")}
        >
          <MessageSquare className="h-5 w-5" />
          Connect via WhatsApp
        </motion.button>
      </form>

      <motion.div
        className="text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        Already have an account?{" "}
        <motion.button
          className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
          onClick={onSwitchToLogin}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.div>
    </>
  );
};

export default SignupForm;
