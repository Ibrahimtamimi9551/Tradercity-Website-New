import React from 'react';

export const GLASS_CARD_CLASSES =
  'bg-black/40 backdrop-blur-md border border-white/20 rounded-3xl';

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <div className={`${GLASS_CARD_CLASSES} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
