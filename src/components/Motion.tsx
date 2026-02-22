"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type MotionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease },
};

export const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const sectionReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease },
};

export function FadeIn({ children, className = "", delay = 0 }: MotionProps) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { ...sectionReveal.transition, delay };
  const initial = reduceMotion ? { opacity: 0 } : sectionReveal.initial;
  const whileInView = reduceMotion ? { opacity: 1 } : sectionReveal.whileInView;
  const viewport = reduceMotion ? { once: true } : sectionReveal.viewport;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "" }: MotionProps) {
  const reduceMotion = useReducedMotion();
  const viewport = reduceMotion ? { once: true } : sectionReveal.viewport;
  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : stagger}
      initial={reduceMotion ? false : "initial"}
      whileInView={reduceMotion ? undefined : "animate"}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: MotionProps) {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : fadeUp;
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
