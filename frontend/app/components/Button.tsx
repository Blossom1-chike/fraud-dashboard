import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "outline" | "danger" | "dangerOutline";
};

export function Button({
  children,
  onClick,
  variant = "solid",
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "border-none cursor-pointer px-4 py-[9px] rounded-[9px] text-[12.5px] font-medium font-sans transition-opacity";

  const variants = {
    solid: "bg-teal text-white",
    outline: "bg-transparent text-ink-muted border border-border",
    danger: "bg-coral text-white",
    dangerOutline: "bg-transparent text-coral border-[1.5px] border-coral",
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${disabled ? "opacity-60 cursor-default" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
