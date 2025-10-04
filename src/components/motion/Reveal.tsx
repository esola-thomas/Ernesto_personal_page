import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { viewportOnce, motionEasing } from "./config";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

const Reveal = ({ children, className, delay = 0, y = 32, ...rest }: RevealProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const initial = prefersReducedMotion
    ? undefined
    : {
        opacity: 0,
        y
      };

  const animate = prefersReducedMotion
    ? undefined
    : {
        opacity: 1,
        y: 0
      };

  return (
    <motion.div
      className={className}
      // Removed initial prop for testing
      whileInView={animate}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: motionEasing.out, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
