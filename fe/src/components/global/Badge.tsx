import React from "react";
import { classNames } from "../../utils/classNames";

interface BadgeProps {
  children: React.ReactNode;
  type: "success" | "danger" | "warning";
}

export default function Badge({ children, type }: BadgeProps) {
  return (
    <span
      className={classNames(
        type === "success"
          ? "bg-green-400"
          : type === "danger"
          ? "bg-red-400"
          : "bg-yellow-400",
        "rounded-sm",
        "px-2 py-1 text-white text-sm font-medium"
      )}
    >
      {children}
    </span>
  );
}
