import type { Transition, Variants } from "framer-motion";

const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];
const baseTransition: Transition = {
  duration: 0.6,
  ease: easeOut
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: baseTransition
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: baseTransition
  }
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: baseTransition
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...baseTransition,
      duration: 0.5
    }
  }
};

export const floatSlow: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const buttonMotion: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.04,
    y: -2,
    transition: { type: "spring", stiffness: 220, damping: 16 }
  },
  tap: {
    scale: 0.97,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 32 }
  }
};

export const heroBlob: Variants = {
  initial: {
    opacity: 0.6,
    scale: 1
  },
  animate: {
    opacity: [0.6, 0.85, 0.6],
    scale: [1, 1.08, 1],
    transition: {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const heroFacts: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...baseTransition,
      delay: 0.2
    }
  }
};
