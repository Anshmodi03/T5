"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const stats = [
  {
    label: "Total Enrolled",
    value: "50000",
    suffix: "+",
    icon: "👨‍🎓",
    description: "Students from around the world",
  },
  {
    label: "Satisfaction Rate",
    value: "98",
    suffix: "%",
    icon: "🏆",
    description: "Based on student feedback",
  },
  {
    label: "Certified Tutors",
    value: "500",
    suffix: "+",
    icon: "👨‍🏫",
    description: "Industry experts and academics",
  },
];

const CountUp = ({ end, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const value = Number.parseInt(end, 10);

      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(value * progress);

        if (progress < 1) {
          setDisplayValue(currentCount.toString());
        } else {
          setDisplayValue(value.toString());
          clearInterval(counter);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }
  }, [inView, end]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

const Achievements = ({ setCursorVariant }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      id="achievements"
      className="py-20 animated-bg text-white"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
            OUR ACHIEVEMENTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Achievements
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We take pride in our growth and the success of our students
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.2 },
                },
              }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="glass rounded-xl p-8 h-full border border-white/20 flex flex-col items-center text-center">
                <motion.div
                  className="text-5xl mb-4"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <h3 className="text-4xl font-bold mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-xl font-medium mb-2">{stat.label}</p>
                <p className="text-white/70">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
