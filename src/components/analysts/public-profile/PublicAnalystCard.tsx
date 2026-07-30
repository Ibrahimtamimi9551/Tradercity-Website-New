"use client";

import type { ComponentType, SVGProps } from "react";
import {
  Bitcoin,
  ChartCandlestick,
  ExternalLink,
  Globe2,
  Landmark,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Star,
} from "lucide-react";
import { cn } from "@/lib/admin/cn";
import {
  displayNameInitials,
  PUBLIC_CARD_STATS_MAX,
  type PublicAnalystCardProps,
  type PublicProfileAvatarTone,
  type PublicProfileMarket,
} from "@/types/analysts/public-profile";

const avatarToneStyles: Record<PublicProfileAvatarTone, string> = {
  discord: "bg-[#5865F2]/25 text-[#c9cdff] border-[#5865F2]/40",
  violet: "bg-violet-500/20 text-violet-100 border-violet-400/40",
  emerald: "bg-emerald-500/20 text-emerald-100 border-emerald-400/40",
  amber: "bg-amber-500/20 text-amber-50 border-amber-400/40",
  rose: "bg-rose-500/20 text-rose-100 border-rose-400/40",
  sky: "bg-sky-500/20 text-sky-100 border-sky-400/40",
};

const marketIcons: Record<
  PublicProfileMarket,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  crypto: Layers,
  btc: Bitcoin,
  eth: ChartCandlestick,
  forex: Globe2,
  stocks: TrendingUp,
  macro: Landmark,
  multi_asset: Layers,
};

const statIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  experience: Award,
  followers: Users,
  community_rating: Star,
  win_rate: TrendingUp,
  ranking: Sparkles,
};

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.2a3.03 3.03 0 00-2.13-2.15C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.37.55A3.03 3.03 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.03 3.03 0 002.13 2.15C4.5 20.5 12 20.5 12 20.5s7.5 0 9.37-.55a3.03 3.03 0 002.13-2.15A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export type PublicAnalystCardVariant = "full" | "compact";

type PublicAnalystCardComponentProps = PublicAnalystCardProps & {
  className?: string;
  /** Soften interactive chrome in admin live preview. */
  preview?: boolean;
  /**
   * `full` — featured spotlight / admin preview.
   * `compact` — side peek identity only.
   */
  variant?: PublicAnalystCardVariant;
};

function buildLinkEntries(links: PublicAnalystCardProps["links"]) {
  return [
    links.website
      ? { key: "website", href: links.website, label: "Website", icon: ExternalLink }
      : null,
    links.x ? { key: "x", href: links.x, label: "X", icon: XIcon } : null,
    links.youtube
      ? { key: "youtube", href: links.youtube, label: "YouTube", icon: YouTubeIcon }
      : null,
    links.telegram
      ? { key: "telegram", href: links.telegram, label: "Telegram", icon: TelegramIcon }
      : null,
    links.discord
      ? { key: "discord", href: links.discord, label: "Discord", icon: DiscordIcon }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    href: string;
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
  }>;
}

function CompactPublicAnalystCard({
  profileImageUrl,
  avatarTone,
  displayName,
  analystTitle,
  featured,
  className,
}: Pick<
  PublicAnalystCardComponentProps,
  | "profileImageUrl"
  | "avatarTone"
  | "displayName"
  | "analystTitle"
  | "featured"
  | "className"
>) {
  const initials = displayNameInitials(displayName || "?");

  return (
    <article
      className={cn(
        "relative flex h-full min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-[1.75rem]",
        "border border-white/10 bg-[#0A0C12]/90 px-5 py-8 text-center",
        "shadow-[0_16px_48px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_60%)]"
        aria-hidden
      />
      <div
        className={cn(
          "relative mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border text-lg font-semibold",
          avatarToneStyles[avatarTone]
        )}
      >
        {profileImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- curated arbitrary URLs
          <img
            src={profileImageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden>{initials}</span>
        )}
      </div>
      <h3 className="relative text-xl font-semibold tracking-tight text-white">
        {displayName || "Untitled analyst"}
      </h3>
      {analystTitle ? (
        <p className="relative mt-2 text-sm font-medium text-[#D4AF37]/90">
          {analystTitle}
        </p>
      ) : null}
      {featured ? (
        <span className="relative mt-4 inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#E8C96A]">
          <Sparkles className="h-3 w-3" aria-hidden />
          Featured
        </span>
      ) : null}
    </article>
  );
}

/**
 * Adaptive public presentation card — driven only by Public Profile data.
 * Shared by Admin live preview and Meet the Analysts homepage.
 * Spotlight layout keeps a stable height: clamped text + max 4 stats in one row.
 */
export function PublicAnalystCard({
  profileImageUrl,
  avatarTone,
  displayName,
  analystTitle,
  featured,
  verified,
  active,
  shortIntroduction,
  publicStatement,
  statistics,
  researchFocus,
  philosophyTitle,
  philosophyDescription,
  markets,
  links,
  className,
  preview = false,
  variant = "full",
}: PublicAnalystCardComponentProps) {
  if (variant === "compact") {
    return (
      <CompactPublicAnalystCard
        profileImageUrl={profileImageUrl}
        avatarTone={avatarTone}
        displayName={displayName}
        analystTitle={analystTitle}
        featured={featured}
        className={className}
      />
    );
  }

  const initials = displayNameInitials(displayName || "?");
  const linkEntries = buildLinkEntries(links);
  const rowStats = statistics.slice(0, PUBLIC_CARD_STATS_MAX);

  const showPhilosophy = Boolean(philosophyTitle || philosophyDescription);
  const showStats = rowStats.length > 0;
  const showFocus = researchFocus.length > 0;
  const showMarkets = markets.length > 0;
  const showLinks = linkEntries.length > 0;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0A0C12]",
        "shadow-[0_28px_90px_rgba(0,0,0,0.5)]",
        featured &&
          "border-[#D4AF37]/35 shadow-[0_28px_90px_rgba(0,0,0,0.5),0_0_60px_rgba(212,175,55,0.12)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.05),transparent_45%)]"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col gap-5 p-6 sm:gap-6 sm:p-8 lg:p-9">
        {/* Hero */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <div className="relative mx-auto shrink-0 sm:mx-0">
            <div
              className="pointer-events-none absolute -inset-3 rounded-full bg-[#D4AF37]/15 blur-xl"
              aria-hidden
            />
            <div
              className={cn(
                "relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 text-2xl font-semibold sm:h-28 sm:w-28 sm:text-3xl",
                featured ? "border-[#D4AF37]/70" : "border-white/20",
                avatarToneStyles[avatarTone]
              )}
            >
              {profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- curated arbitrary URLs
                <img
                  src={profileImageUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span aria-hidden>{initials}</span>
              )}
            </div>
            {featured ? (
              <span className="absolute -left-1 -top-1 inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#12100A] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#E8C96A]">
                <Sparkles className="h-2.5 w-2.5" aria-hidden />
                Featured
              </span>
            ) : null}
            {active ? (
              <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#0A0C12] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Active
              </span>
            ) : null}
            {verified ? (
              <span
                className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#0A0C12] text-[#D4AF37]"
                title="TraderCity Verified Analyst"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              </span>
            ) : null}
          </div>

          <div className="min-w-0 flex-1 space-y-2.5 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2rem]">
                {displayName || "Untitled analyst"}
              </h3>
              {verified ? (
                <span className="hidden text-[#D4AF37] sm:inline" aria-hidden>
                  <ShieldCheck className="h-5 w-5" />
                </span>
              ) : null}
            </div>
            {analystTitle ? (
              <p className="text-sm font-medium text-[#D4AF37] sm:text-base">
                {analystTitle}
              </p>
            ) : (
              <p className="text-sm font-medium text-transparent sm:text-base" aria-hidden>
                —
              </p>
            )}
            <p
              className={cn(
                "line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed sm:min-h-[4.05rem] sm:text-[15px]",
                shortIntroduction ? "text-white/65" : "text-transparent"
              )}
            >
              {shortIntroduction || "\u00A0"}
            </p>
            {publicStatement ? (
              <p className="line-clamp-2 min-h-[2.75rem] text-sm font-medium italic leading-snug text-white/85 sm:text-base">
                “{publicStatement}”
              </p>
            ) : (
              <p className="min-h-[2.75rem]" aria-hidden />
            )}
          </div>
        </header>

        {/* Statistics — single row, max 4, fixed columns for stable height */}
        <section className="border-t border-white/8 pt-5">
          {showStats ? (
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {rowStats.map((stat) => {
                const Icon = statIcons[stat.key] ?? Sparkles;
                return (
                  <div
                    key={stat.key}
                    className="flex min-h-[4.25rem] items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <dt className="truncate text-[10px] uppercase tracking-wider text-white/40">
                        {stat.label}
                      </dt>
                      <dd className="truncate text-sm font-semibold text-white">
                        {stat.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          ) : (
            <div className="min-h-[4.25rem]" aria-hidden />
          )}
        </section>

        {/* Middle grid — reserved min height so cards stay aligned */}
        <section className="grid min-h-[9.5rem] flex-1 gap-5 border-t border-white/8 pt-5 lg:grid-cols-3 lg:gap-6">
          {showFocus ? (
            <div>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Research Focus
              </h4>
              <ul className="space-y-2.5">
                {researchFocus.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-white/85"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]"
                      aria-hidden
                    />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div aria-hidden />
          )}

          {showMarkets ? (
            <div>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Markets Covered
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                {markets.map((market) => {
                  const Icon = marketIcons[market.id] ?? Layers;
                  return (
                    <li
                      key={market.id}
                      className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-2 text-xs font-medium text-white/85"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/90" aria-hidden />
                      {market.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div aria-hidden />
          )}

          {showPhilosophy ? (
            <div>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Trading Approach
              </h4>
              {philosophyTitle ? (
                <p className="mb-2 inline-flex max-w-full truncate rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-2.5 py-1 text-xs font-semibold text-[#E8C96A]">
                  {philosophyTitle}
                </p>
              ) : null}
              {philosophyDescription ? (
                <p className="line-clamp-4 text-sm leading-relaxed text-white/65">
                  {philosophyDescription}
                </p>
              ) : null}
            </div>
          ) : (
            <div aria-hidden />
          )}
        </section>

        {/* Connect — reserved footer height */}
        <section className="mt-auto border-t border-white/8 pt-5">
          {showLinks ? (
            <div className="flex min-h-10 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Connect
              </h4>
              <div className="flex flex-wrap gap-2">
                {linkEntries.map((entry) => {
                  const Icon = entry.icon;
                  const classNameLink =
                    "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-[#D4AF37]/40 hover:text-[#E8C96A]";
                  if (preview) {
                    return (
                      <span key={entry.key} className={classNameLink} title={entry.label}>
                        <Icon className="h-4 w-4" />
                      </span>
                    );
                  }
                  return (
                    <a
                      key={entry.key}
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classNameLink}
                      aria-label={entry.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="min-h-10" aria-hidden />
          )}
        </section>
      </div>
    </article>
  );
}
