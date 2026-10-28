import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', label, error, helperText, isRequired = false, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-[#102B46]"
          >
            {label}
            {isRequired && <span className="text-[#D62836] ml-1">*</span>}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          aria-invalid={error ? 'true' : 'false'}
          className={`block w-full rounded-lg border text-sm text-[#344054] placeholder:text-gray-400 bg-white transition-colors p-3
            ${
              error
                ? 'border-[#D62836] focus:border-[#D62836] focus:ring-1 focus:ring-[#D62836]'
                : 'border-gray-300 focus:border-[#174A83] focus:ring-1 focus:ring-[#174A83]'
            }
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            outline-none resize-y
            ${className}
          `}
          {...props}
        />
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
TextArea.displayName = 'TextArea';
