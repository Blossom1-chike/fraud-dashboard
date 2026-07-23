"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 900);
  };

  return (
    <AuthLayout>
      <div className="flex items-center gap-[9px] mb-2">
        <div className="w-7 h-7 rounded-lg bg-teal-soft flex items-center justify-center text-[15px]">
          🛡️
        </div>

        <span className="font-serif text-ink text-[17px] font-semibold">
          FraudShield AI
        </span>
      </div>

      <p className="text-ink-muted text-[13px] mb-[30px]">
        Sign in to your fraud investigation workspace
      </p>

      <div className="mb-4">
        <label className="text-ink-muted text-xs block mb-1.5">
          Work email
        </label>

        <input
          defaultValue="b.adeyemi@fraudshield.ai"
          className="border border-border rounded-[10px] py-[11px] px-3.5 text-[13.5px] w-full box-border font-sans"
        />
      </div>

      <div className="mb-5">
        <label className="text-ink-muted text-xs block mb-1.5">Password</label>

        <input
          type="password"
          defaultValue="password123"
          className="border border-border rounded-[10px] py-[11px] px-3.5 text-[13.5px] w-full box-border font-sans"
        />
      </div>

      <Button
        onClick={handleSignIn}
        disabled={loading}
        className="w-full py-3 text-[13.5px] mb-3.5 box-border"
      >
        {loading ? "Signing in…" : "Sign in"}
      </Button>

      <div className="flex items-center gap-3 text-center text-xs text-ink-muted mb-[18px]">
        Just want to look around?{" "}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-teal font-semibold font-sans text-xs p-0"
        >
          Try the demo <MoveRight className="w-4 h-4" />
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
