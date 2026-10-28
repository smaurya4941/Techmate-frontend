import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      isRequired = false,
      options,
      placeholder = 'Select an option',
      id,
      value,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-bold uppercase tracking-wider text-[#102B46]"
          >
            {label}
            {isRequired && <span className="text-[#D62836] ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          <select
            id={selectId}
            ref={ref}
            value={value}
            aria-invalid={error ? 'true' : 'false'}
            className={`block w-full rounded-lg border text-sm text-[#344054] bg-white transition-colors pl-3.5 pr-10 py-2.5 appearance-none
              ${
                error
                  ? 'border-[#D62836] focus:border-[#D62836] focus:ring-1 focus:ring-[#D62836]'
                  : 'border-gray-300 focus:border-[#174A83] focus:ring-1 focus:ring-[#174A83]'
              }
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              outline-none
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-gray-400">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error ? (
          <p className="flex items-center gap-1 text-xs text-[#D62836] font-medium mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-gray-500 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = 'Select';
