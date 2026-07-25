/** DEV MOCK ONLY — public apply → Admin Applications queue. */

import type {
  AnalystApplication,
  AudiencePlatform,
  PrimaryMarket,
  TradingStyle,
} from "@/types/analysts/applications";
import { createMockApplication } from "./applications";
import { bindMemberApplication } from "./member-application";

export type PublicApplicationFormValues = {
  analystName: string;
  email: string;
  shortBio: string;
  yearsOfExperience: string;
  primaryMarkets: PrimaryMarket[];
  xHandle: string;
  discordUsername: string;
  tradingDuration: string;
  primaryTradingStyle: TradingStyle;
  publicTrackRecordUrl: string;
  tradingWebsite: string;
  primaryAudiencePlatform: AudiencePlatform;
  totalAudienceSize: string;
  telegramUrl: string;
  youtubeUrl: string;
  audienceWebsite: string;
  bestAnalysisUrl: string;
  bestEducationalUrl: string;
  motivation: string;
};

export function submitPublicAnalystApplication(input: {
  userId: string;
  values: PublicApplicationFormValues;
}): AnalystApplication {
  const { userId, values } = input;
  const xHandle = values.xHandle.trim().startsWith("@")
    ? values.xHandle.trim()
    : `@${values.xHandle.trim().replace(/^@/, "")}`;

  const socialLinks = [
    {
      id: "x",
      label: "X",
      href: `https://twitter.com/${xHandle.replace(/^@/, "")}`,
    },
  ];
  if (values.telegramUrl.trim()) {
    socialLinks.push({
      id: "tg",
      label: "Telegram",
      href: values.telegramUrl.trim(),
    });
  }
  if (values.youtubeUrl.trim()) {
    socialLinks.push({
      id: "yt",
      label: "YouTube",
      href: values.youtubeUrl.trim(),
    });
  }

  const application = createMockApplication({
    email: values.email.trim(),
    analystName: values.analystName.trim(),
    shortBio: values.shortBio.trim(),
    yearsOfExperience: values.yearsOfExperience.trim(),
    primaryMarkets:
      values.primaryMarkets.length > 0 ? values.primaryMarkets : ["crypto"],
    xHandle,
    discordUsername: values.discordUsername.trim() || null,
    tradingDuration: values.tradingDuration.trim(),
    primaryTradingStyle: values.primaryTradingStyle,
    publicTrackRecordUrl: values.publicTrackRecordUrl.trim() || null,
    tradingWebsite: values.tradingWebsite.trim() || null,
    primaryAudiencePlatform: values.primaryAudiencePlatform,
    totalAudienceSize: values.totalAudienceSize.trim(),
    socialLinks,
    audienceWebsite: values.audienceWebsite.trim() || null,
    bestAnalysis: values.bestAnalysisUrl.trim()
      ? {
          kind: "link",
          label: "Best analysis",
          href: values.bestAnalysisUrl.trim(),
        }
      : null,
    bestEducational: values.bestEducationalUrl.trim()
      ? {
          kind: "link",
          label: "Best educational",
          href: values.bestEducationalUrl.trim(),
        }
      : null,
    motivation: values.motivation.trim(),
  });

  bindMemberApplication(userId, application.id);
  return application;
}
