import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-md p-6 transition-all duration-200",
        hover && "hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
