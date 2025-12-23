import React from 'react';

interface SectionBadgeProps {
  number: number;
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ number, className = '' }) => {
  return (
    <div className={`section-badge-large animate-scale-in ${className}`}>
      <span className="text-xs font-semibold tracking-widest uppercase opacity-80">Seção</span>
      <span className="section-number mt-1">{number}</span>
    </div>
  );
};
