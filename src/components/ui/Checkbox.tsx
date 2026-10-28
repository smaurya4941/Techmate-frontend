import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, description, id, ...props }, ref) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            className={`w-4 h-4 text-[#174A83] border-gray-300 rounded focus:ring-[#174A83] focus:ring-2 transition ${className}`}
            {...props}
          />
        </div>
        <div className="ml-2.5 text-xs">
          <label htmlFor={inputId} className="font-medium text-[#102B46] cursor-pointer">
            {label}
          </label>
          {description && <p className="text-gray-500 text-[11px] mt-0.5">{description}</p>}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
