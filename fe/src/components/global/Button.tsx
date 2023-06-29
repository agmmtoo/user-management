import React from "react";
import { classNames } from "../../utils/classNames";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary";
}

function Button({ children, onClick, variant }: ButtonProps) {
  return (
    <button
      className={classNames(
        "border py-2 px-4 rounded",
        variant == "primary"
          ? "bg-white text-blue-500"
          : "bg-white text-red-500"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
