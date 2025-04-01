"use client";

import { motion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { AnimatedButton } from "./AnimatedComponents";

const SuccessMessage = ({
  title,
  message,
  buttonText,
  onButtonClick,
  onClose,
  setCursorVariant,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-2xl font-bold text-teal-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
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

      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.1,
        }}
      >
        <motion.div
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.4,
            }}
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>
        </motion.div>
        <motion.h3
          className="text-lg font-medium mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {message}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <AnimatedButton
          onClick={onButtonClick}
          className="w-full py-2 text-white rounded-md bg-teal-500 hover:bg-teal-600"
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          {buttonText}
        </AnimatedButton>
      </motion.div>
    </>
  );
};

export default SuccessMessage;
