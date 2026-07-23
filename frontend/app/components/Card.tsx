import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  style?: string;
};
const Card = ({ children, style }: CardProps) => {
  return (
    <div className={`bg-surface border border-border rounded-2xl p-[18px] ${style} `}>{children}</div>
  );
};

export default Card;
