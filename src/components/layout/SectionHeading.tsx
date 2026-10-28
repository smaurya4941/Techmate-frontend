import React from 'react';
import { Badge } from '../ui/Badge';

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  action,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-8 sm:mb-12 ${
        isCenter ? 'text-center max-w-3xl mx-auto' : 'flex flex-col md:flex-row md:items-end justify-between gap-4'
      } ${className}`}
    >
      <div>
        {badge && (
          <div className={`mb-2.5 ${isCenter ? 'flex justify-center' : ''}`}>
            <Badge variant="primary" hasDot>
              {badge}
            </Badge>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#102B46] tracking-tight font-heading leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-[#344054] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && !isCenter && <div className="shrink-0 pt-2 md:pt-0">{action}</div>}
    </div>
  );
};
