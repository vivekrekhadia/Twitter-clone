import React from "react";
type buttonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  small,
  gray,
  className = "",
  ...props
}: buttonProps) => {
  const sizeClass = small ? "px-2 py-1" : "px-4 py-2 font-bold";
  const colorClass = gray
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
    : "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400";

  return (
    <button
      className={`rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass} ${colorClass} ${className}`}
      {...props}
    ></button>
  );
};
