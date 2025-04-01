"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { AnimatedButton } from "./AnimatedComponents";
import { verifyOtp } from "./authService";

const OtpVerificationForm = ({
  userRole,
  email: initialEmail, // Renamed to avoid confusion with state
  onClose,
  onVerificationComplete,
  setCursorVariant,
}) => {
  // OTP state for 6 digits
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState(initialEmail || ""); // State for editable email
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const emailRef = useRef(null); // Ref for email input
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isResending) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResending(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isResending]);

  // Auto-focus first OTP input on mount
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.every((digit) => digit) && email) {
      const otpCode = otp.join("");
      try {
        // Pass updated email along with otp and userRole
        const data = await verifyOtp({ otp: otpCode, userRole, email });
        if (data.token) {
          console.log("OTP verified:", data);
          onVerificationComplete();
        } else {
          setError(data.message || "OTP verification failed.");
        }
      } catch (err) {
        setError("An error occurred during OTP verification.");
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  const handleResendOtp = () => {
    console.log("Resending OTP to:", email);
    setIsResending(true);
    // Optionally add logic to call a resend endpoint with updated email here.
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-2xl font-bold text-teal-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Verify OTP
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
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          <Check className="h-8 w-8 text-teal-600" />
        </motion.div>
        <h3 className="text-lg font-medium mb-2">OTP Verification</h3>
        <p className="text-gray-600">
          We've sent a verification code to your email and mobile number. Please
          enter the 6-digit code below.
        </p>
      </motion.div>

      {/* Email Input Field */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <label className="block text-gray-700 text-sm font-medium mb-2 text-center">
          Registered Email
        </label>
        <input
          ref={emailRef}
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-4 py-2 text-center text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          placeholder="Enter your email"
          required
        />
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2 text-center">
            Enter 6-digit OTP
          </label>
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                required
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatedButton
            type="submit"
            className="w-full py-2 text-white rounded-md mb-4 bg-teal-500 hover:bg-teal-600"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            disabled={!otp.every((digit) => digit) || !email}
          >
            Verify & Continue
          </AnimatedButton>
        </motion.div>
      </form>

      <motion.div
        className="text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Didn't receive the code?{" "}
        {isResending ? (
          <span className="text-gray-500">Resend in {countdown}s</span>
        ) : (
          <motion.button
            className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
            onClick={handleResendOtp}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isResending || !email}
          >
            Resend OTP
          </motion.button>
        )}
      </motion.div>
    </>
  );
};

export default OtpVerificationForm;
