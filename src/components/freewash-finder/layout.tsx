import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

interface BoxProps {
  children: ReactNode;
  className?: string;
}

export function Box({ children, className = "" }: BoxProps) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

interface StackProps {
  children: ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg";
}

export function Stack({ 
  children, 
  className = "", 
  spacing = "md" 
}: StackProps) {
  const spacingClasses = {
    sm: "space-y-4",
    md: "space-y-6", 
    lg: "space-y-8"
  };

  return (
    <div className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
}
