import React from 'react';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'accent' | 'white';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const variantStyles = {
    primary: 'text-[#174A83]',
    accent: 'text-[#D62836]',
    white: 'text-white',
  };

  return (
    <Loader2
      className={`animate-spin ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    />
  );
};
