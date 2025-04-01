"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ResetPasswordForm from "./ResetPasswordForm";
import OtpVerificationForm from "./OtpVerificationForm";
import SuccessMessage from "./SuccessMessage";

const AuthModal = ({
  authType,
  userRole,
  onClose,
  onSwitchAuthType,
  setCursorVariant,
}) => {
  // Store the email from the registration step for OTP verification.
  const [verificationEmail, setVerificationEmail] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto auth-scrollbar"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="p-6">
          {authType === "login" && (
            <LoginForm
              userRole={userRole}
              onClose={onClose}
              onSwitchToSignup={() => onSwitchAuthType("signup")}
              onSwitchToReset={() => onSwitchAuthType("reset")}
              setCursorVariant={setCursorVariant}
            />
          )}

          {authType === "signup" && (
            <SignupForm
              userRole={userRole}
              onClose={onClose}
              onSwitchToLogin={() => onSwitchAuthType("login")}
              // When signup completes, save the email for OTP verification
              onSignupComplete={(email) => {
                setVerificationEmail(email);
                onSwitchAuthType("otp");
              }}
              setCursorVariant={setCursorVariant}
            />
          )}

          {authType === "reset" && (
            <ResetPasswordForm
              userRole={userRole}
              onClose={onClose}
              onBackToLogin={() => onSwitchAuthType("login")}
              onResetComplete={() => onSwitchAuthType("success-reset")}
              setCursorVariant={setCursorVariant}
            />
          )}

          {authType === "otp" && (
            <OtpVerificationForm
              userRole={userRole}
              email={verificationEmail} // pass the stored email here
              onClose={onClose}
              onVerificationComplete={() => onSwitchAuthType("success-otp")}
              setCursorVariant={setCursorVariant}
            />
          )}

          {authType === "success-otp" && (
            <SuccessMessage
              title="Verification Successful!"
              message="Your account has been successfully verified. You can now login to access your account."
              buttonText="Continue to Login"
              onButtonClick={() => onSwitchAuthType("login")}
              onClose={onClose}
              setCursorVariant={setCursorVariant}
            />
          )}

          {authType === "success-reset" && (
            <SuccessMessage
              title="Reset Link Sent!"
              message="We've sent a password reset link to your email. Please check your inbox and follow the instructions."
              buttonText="Back to Login"
              onButtonClick={() => onSwitchAuthType("login")}
              onClose={onClose}
              setCursorVariant={setCursorVariant}
            />
          )}

          {authType === "success-login" && (
            <SuccessMessage
              title="Login Successful!"
              message="You have successfully logged in to your account."
              buttonText="Continue"
              onButtonClick={onClose}
              onClose={onClose}
              setCursorVariant={setCursorVariant}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
