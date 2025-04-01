"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const AnimatedButton = ({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  ...props
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      setIsHovered(true);
      onMouseEnter && onMouseEnter(e);
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled) {
      setIsHovered(false);
      onMouseLeave && onMouseLeave(e);
    }
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && !disabled && (
        <motion.div
          className="absolute w-32 h-32 bg-white/20 rounded-full -z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            left: position.x - 64,
            top: position.y - 64,
          }}
        />
      )}
    </motion.button>
  );
};

export const AnimatedInput = ({
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  return (
    <motion.input
      className={`transition-all duration-300 ${className}`}
      whileFocus={{
        scale: 1.02,
        boxShadow: "0 0 0 2px rgba(45, 212, 191, 0.3)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    />
  );
};
