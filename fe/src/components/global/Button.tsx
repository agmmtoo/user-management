import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/classNames";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  to?: string;
}

function Button({ children, onClick, className, variant, to }: ButtonProps) {
  const classes = classNames(
    "border py-2 px-4 rounded",
    variant
    ? variant == "primary" ? "bg-white text-blue-500" : "bg-white text-red-500"
    : "text-gray-500",
    className ? className : ""
  );
  if (to) {
    return (
      <Link to={to} role="button" className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
