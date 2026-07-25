import { Suspense } from "react";
import Login from "@/components/login/Login";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#050608] text-sm text-[#94A3B8]">
          Loading…
        </div>
      }
    >
      <Login />
    </Suspense>
  );
}
