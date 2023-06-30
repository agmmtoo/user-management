import React from "react";
import { classNames } from "../../utils/classNames";

interface BadgeProps {
  children: React.ReactNode;
  type: "success" | "danger" | "warning";
  className?: string;
}

export default function Badge({ children, type, className }: BadgeProps) {
  return (
    <span
      className={classNames(
        type === "success"
          ? "bg-green-500"
          : type === "danger"
          ? "bg-rose-500"
          : "bg-amber-500",
        "rounded-sm",
        "px-2 py-1 text-white text-sm font-medium",
        className ? className : "",
      )}
    >
      {children}
    </span>
  );
}
