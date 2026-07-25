"use client";

import { Lock, Mail, User } from "lucide-react";
import type { AuthMode } from "@/lib/auth";

interface AuthFormFieldsProps {
  mode: AuthMode;
  email: string;
  password: string;
  displayName: string;
  disabled?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
}

const fieldClassName =
  "w-full rounded-xl border border-[#1F2129] bg-[#0E1016] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-[#475569] hover:border-[#2D313E] focus:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40 disabled:opacity-60 lg:py-3";

export default function AuthFormFields({
  mode,
  email,
  password,
  displayName,
  disabled = false,
  onEmailChange,
  onPasswordChange,
  onDisplayNameChange,
}: AuthFormFieldsProps) {
  return (
    <div className="mb-5 flex w-full flex-col gap-4 lg:mb-4 lg:gap-3">
      {mode === "register" ? (
        <label className="block w-full">
          <span className="mb-2 block text-xs font-medium text-[#94A3B8] lg:mb-1.5">
            Display name
          </span>
          <span className="relative block">
            <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              name="displayName"
              autoComplete="name"
              disabled={disabled}
              value={displayName}
              onChange={(e) => onDisplayNameChange(e.target.value)}
              placeholder="Optional in development"
              className={fieldClassName}
            />
          </span>
        </label>
      ) : null}

      {/* Desktop: email + password share a row to use the wider card */}
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-3">
        <label className="block w-full">
          <span className="mb-2 block text-xs font-medium text-[#94A3B8] lg:mb-1.5">
            Email address
          </span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />
            <input
              type="email"
              name="email"
              autoComplete="email"
              disabled={disabled}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Optional in development"
              className={fieldClassName}
            />
          </span>
        </label>

        <label className="block w-full">
          <span className="mb-2 block text-xs font-medium text-[#94A3B8] lg:mb-1.5">
            Password
          </span>
          <span className="relative block">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />
            <input
              type="password"
              name="password"
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              disabled={disabled}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Optional in development"
              className={fieldClassName}
            />
          </span>
        </label>
      </div>

      <p className="text-[11px] leading-relaxed text-[#64748B] lg:text-[10px]">
        Development mock: empty fields still continue. Real validation arrives with
        backend auth.
      </p>
    </div>
  );
}
