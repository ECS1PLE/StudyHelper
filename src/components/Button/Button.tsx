"use client";

import React, { useState, ReactElement, ReactNode } from "react";

interface IconProps {
  width?: number;
  height?: number;
}

interface ButtonProps {
  children: ReactNode;
  color: "white" | "transparent";
  icon?: ReactElement<IconProps>;
  onClick?: () => void;
  className?: string;
}

const UIButton: React.FC<ButtonProps> = ({
  children,
  color,
  icon,
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  function getBackgroundColor() {
    return isHovered
      ? color === "white"
        ? "bg-white/85"
        : "bg-white/5"
      : color === "white"
      ? "bg-white"
      : "bg-transparent";
  }

  function getTextColor() {
    return color === "white" ? "text-neutral-950" : "text-white";
  }

  const iconWithSize = icon
    ? React.cloneElement(icon, {
        width: 20,
        height: 20,
      })
    : null;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex w-full min-w-[174px] gap-[4px] justify-center items-center py-2 px-5 rounded-full transition-all duration-300 cursor-pointer ${getBackgroundColor()} ${className}`}
    >
      {icon && (
        <div className={`h-5 w-5 ${getTextColor()}`}>{iconWithSize}</div>
      )}
      <span className={`${getTextColor()}`}>{children}</span>
    </button>
  );
};

export default UIButton;