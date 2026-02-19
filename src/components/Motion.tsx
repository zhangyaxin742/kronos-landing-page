"use client";

import * as React from "react";
import { motion } from "framer-motion";

type MotionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const fadeInUp = {
  offscreen: { opacity: 1, y: 14 },
  onscreen: { opacity: 1, y: 0 },
};

const staggerContainer = {
  offscreen: {},
  onscreen: {
    transition: { staggerChildren: 0.12 },
  },
};

export function FadeIn({ children, className = "", delay = 0 }: MotionProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "" }: MotionProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: MotionProps) {
  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}
