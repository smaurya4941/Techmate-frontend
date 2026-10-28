import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'navy' | 'neutral' | 'success' | 'warning' | 'outline';
  size?: 'sm' | 'md';
  hasDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'neutral',
  size = 'sm',
  hasDot = false,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#174A83]/10 text-[#174A83] border-[#174A83]/20',
    accent: 'bg-[#D62836]/10 text-[#D62836] border-[#D62836]/20',
    navy: 'bg-[#102B46] text-white border-transparent',
    neutral: 'bg-[#F3F6FA] text-[#344054] border-gray-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    outline: 'bg-transparent text-[#344054] border-gray-300',
  };

  const dotStyles = {
    primary: 'bg-[#174A83]',
    accent: 'bg-[#D62836]',
    navy: 'bg-white',
    neutral: 'bg-gray-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    outline: 'bg-gray-400',
  };

  const sizeStyles = {
    sm: 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full',
    md: 'text-xs font-semibold px-3 py-1 rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border tracking-wide uppercase ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {hasDot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
};
