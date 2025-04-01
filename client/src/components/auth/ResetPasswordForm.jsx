"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Mail, ArrowLeft } from "lucide-react";
import { AnimatedButton } from "./AnimatedComponents";
import { requestPasswordReset } from "./authService";

const ResetPasswordForm = ({
  userRole,
  onClose,
  onBackToLogin,
  onResetComplete,
  setCursorVariant,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await requestPasswordReset({ email, userRole });
      if (data.message && data.message.includes("sent")) {
        console.log("Reset link sent:", data);
        onResetComplete();
      } else {
        setError(data.message || "Request failed");
      }
    } catch (err) {
      setError("An error occurred while requesting password reset.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBackToLogin}
          className="p-1 rounded-full hover:bg-gray-100"
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>
        <motion.h2
          className="text-xl font-bold text-teal-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Reset Password
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
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              required
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatedButton
            type="submit"
            className="w-full py-2 text-white rounded-md mb-4 bg-teal-500 hover:bg-teal-600"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Send Reset Link
          </AnimatedButton>
        </motion.div>
      </form>

      <motion.div
        className="text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
          onClick={onBackToLogin}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Login
        </motion.button>
      </motion.div>
    </>
  );
};

export default ResetPasswordForm;
