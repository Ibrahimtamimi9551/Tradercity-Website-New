"use client";

import { Loader2 } from "lucide-react";
import { DiscordIcon, GoogleIcon } from "./icons";

interface SocialAuthButtonsProps {
  busyProvider: "google" | "discord" | null;
  disabled?: boolean;
  onGoogle: () => void;
  onDiscord: () => void;
}

const baseButton =
  "w-full h-14 sm:h-16 lg:h-12 rounded-xl flex items-center justify-center gap-3 font-extrabold text-[15px] sm:text-[16px] lg:text-[14px] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C10] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0";

export default function SocialAuthButtons({
  busyProvider,
  disabled = false,
  onGoogle,
  onDiscord,
}: SocialAuthButtonsProps) {
  const locked = disabled || busyProvider !== null;

  return (
    <div className="mb-6 flex w-full flex-col gap-3 lg:mb-4">
      {/* Desktop: side-by-side social row to reduce card height */}
      <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-3">
        <button
          type="button"
          disabled={locked}
          onClick={onGoogle}
          className={`${baseButton} bg-white text-black shadow-lg hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-xl focus-visible:ring-white lg:flex-1`}
        >
          {busyProvider === "google" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <GoogleIcon className="h-6 w-6 lg:h-5 lg:w-5" />
          )}
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          disabled={locked}
          onClick={onDiscord}
          className={`${baseButton} bg-gradient-to-r from-[#5865F2] to-[#4752C4] text-white shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_0_25px_rgba(88,101,242,0.4)] focus-visible:ring-[#5865F2] lg:flex-1`}
        >
          {busyProvider === "discord" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <DiscordIcon className="h-6 w-6 text-white lg:h-5 lg:w-5" />
          )}
          <span>Continue with Discord</span>
        </button>
      </div>

      <div className="flex w-full items-center gap-4 lg:gap-3">
        <div className="h-px flex-1 bg-[#1F2129]" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#64748B]">
          OR
        </span>
        <div className="h-px flex-1 bg-[#1F2129]" />
      </div>
    </div>
  );
}
