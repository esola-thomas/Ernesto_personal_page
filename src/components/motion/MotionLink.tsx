import type { AnchorHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { buttonMotion } from "./variants";

const baseStyles = {
  primary: "button-primary",
  ghost: "button-ghost",
  outline: "button-outline"
} as const;

type StyleVariant = keyof typeof baseStyles;

interface MotionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: StyleVariant;
}

const MotionLink = ({ children, className = "", variant = "primary", ...rest }: MotionLinkProps) => {
  const variantClass = baseStyles[variant];
  const classes = `${variantClass} ${className}`.trim();

  return (
    <motion.a
      {...rest}
      className={classes}
      variants={buttonMotion}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.a>
  );
};

export default MotionLink;
