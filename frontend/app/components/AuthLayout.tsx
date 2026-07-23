import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="bg-gradient-to-br from-sidebar to-teal min-h-screen flex items-center justify-center p-10">
      <div className="bg-surface rounded-[20px] py-11 px-10 w-[380px] shadow-[0_12px_40px_rgba(18,58,50,0.25)] font-sans">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
