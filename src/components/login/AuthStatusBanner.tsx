"use client";

type BannerTone = "error" | "success" | "info";

interface AuthStatusBannerProps {
  tone: BannerTone;
  message: string;
}

const toneClasses: Record<BannerTone, string> = {
  error: "border-red-500/40 bg-red-500/10 text-red-200",
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  info: "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#BFDBFE]",
};

export default function AuthStatusBanner({ tone, message }: AuthStatusBannerProps) {
  return (
    <div
      role="status"
      className={`mb-5 w-full rounded-xl border px-4 py-3 text-left text-sm font-medium lg:mb-4 lg:py-2.5 ${toneClasses[tone]}`}
    >
      {message}
    </div>
  );
}
