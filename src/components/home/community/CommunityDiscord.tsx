'use client';

import React from 'react';
import SectionEyebrow from '../shared/SectionEyebrow';
import GradientText from '../shared/GradientText';

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function CommunityDiscord() {
  return (
    <div className="relative z-10 w-full flex flex-col items-center pt-12 lg:pt-16 font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mb-16 lg:mb-24 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
        <div className="w-full lg:max-w-3xl">
          <SectionEyebrow
            number="05"
            label="Community"
            accentColor="#3B82F6"
            className="mb-8"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            One Community.
            <br />
            Real Traders.
            <br />
            <GradientText from="#60A5FA" via="#3B82F6" to="#06B6D4">
              Real Connections.
            </GradientText>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start lg:justify-end gap-6 lg:gap-8 lg:mt-8 w-full lg:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#3B82F6]/30 flex items-center justify-center shrink-0">
            <UsersIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#3B82F6]" />
          </div>
          <div className="text-white/80 text-xl lg:text-2xl leading-relaxed">
            <p>Different traders.</p>
            <p>Different analysts.</p>
            <p className="text-[#3B82F6] mt-2 font-medium">
              One place where ideas
              <br className="hidden sm:block" />
              converge and everyone grows.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 relative">
        <div
          className="w-full rounded-2xl sm:rounded-[2rem] border border-white/5 overflow-hidden relative"
          style={{
            WebkitMaskImage: `
    linear-gradient(
      to bottom,
      black 0%,
      black 35%,
      rgba(0,0,0,0.95) 50%,
      rgba(0,0,0,0.8) 65%,
      rgba(0,0,0,0.55) 78%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )
  `,
            maskImage: `
    linear-gradient(
      to bottom,
      black 0%,
      black 35%,
      rgba(0,0,0,0.95) 50%,
      rgba(0,0,0,0.8) 65%,
      rgba(0,0,0,0.55) 78%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )
  `,
          }}
        >
          <img
            src="/images/Community/Discord.png"
            alt="TraderCity Discord Community"
            className="w-full h-auto object-cover block"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
}
