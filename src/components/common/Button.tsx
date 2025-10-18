import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "font-bold rounded-lg transition-all duration-300 cursor-pointer";

  const variants = {
    primary: "bg-verde-lima text-negro hover:bg-verde-lima-dark",
    secondary: "bg-negro text-verde-lima border-2 border-verde-lima hover:bg-verde-lima hover:text-negro",
    outline: "bg-transparent text-blanco border-2 border-blanco hover:bg-blanco hover:text-negro",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[44px]",
    md: "px-8 py-4 text-base min-h-[48px]",
    lg: "px-12 py-5 text-lg min-h-[56px]",
  };

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
