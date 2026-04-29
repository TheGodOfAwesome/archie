"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  viewportMargin?: string;
  stagger?: boolean;
  viewOnce?: boolean;
}

export function AnimatedSection({ 
  children, 
  className, 
  delay = 0, 
  viewportMargin = "-100px",
  stagger = false,
  viewOnce = true
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewOnce, margin: viewportMargin }}
      variants={stagger ? staggerContainer : fadeInUp}
      transition={stagger ? {} : { delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}
