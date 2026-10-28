import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`text-center py-12 px-4 rounded-2xl border-2 border-dashed border-gray-200 bg-[#F3F6FA]/50 max-w-lg mx-auto ${className}`}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#174A83]/10 text-[#174A83] flex items-center justify-center">
        {icon || <PackageOpen className="w-7 h-7" />}
      </div>
      <h3 className="font-heading font-bold text-lg text-[#102B46] mb-1.5">{title}</h3>
      <p className="text-sm text-[#344054] max-w-sm mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
