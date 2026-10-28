'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'navy' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses =
      'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

    // Variant mappings according to Corporate Brand System
    const variantClasses = {
      // Primary Corporate Blue #174A83
      primary:
        'bg-[#174A83] text-white hover:bg-[#123a67] focus-visible:ring-[#174A83] shadow-sm',
      // Limited Accent Red #D62836 for quote/action highlights
      accent:
        'bg-[#D62836] text-white hover:bg-[#b81d29] focus-visible:ring-[#D62836] shadow-md shadow-[#D62836]/25',
      // Deep Navy #102B46 for structural contrast
      navy:
        'bg-[#102B46] text-white hover:bg-[#0a1b2d] focus-visible:ring-[#102B46]',
      // Outline with corporate blue border
      outline:
        'border-2 border-[#174A83] text-[#174A83] bg-transparent hover:bg-[#174A83] hover:text-white focus-visible:ring-[#174A83]',
      // Subtle ghost button
      ghost:
        'text-[#344054] hover:bg-[#F3F6FA] hover:text-[#174A83] focus-visible:ring-[#174A83]',
    };

    // Size mappings
    const sizeClasses = {
      sm: 'px-3.5 py-1.5 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
