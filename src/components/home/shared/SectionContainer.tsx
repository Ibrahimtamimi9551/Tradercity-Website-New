import React from 'react';

export type SectionBand = 'medium' | 'wide';

type SectionContainerProps = {
  band: SectionBand;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
};

const bandClasses: Record<SectionBand, string> = {
  medium:
    'max-w-[1300px] mx-auto w-full px-6 py-12 lg:py-16 relative z-10 flex flex-col font-sans',
  wide:
    'relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-12 lg:py-16 flex flex-col font-sans',
};

export default function SectionContainer({
  band,
  children,
  className = '',
  centered = false,
}: SectionContainerProps) {
  const alignment = centered ? 'items-center' : '';
  return (
    <div className={`${bandClasses[band]} ${alignment} ${className}`.trim()}>
      {children}
    </div>
  );
}
