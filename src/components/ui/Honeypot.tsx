import React from 'react';

interface HoneypotProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Invisible spam trap. Humans never see or fill it; the API rejects any
 * submission where it carries a value.
 */
export function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          name="hp_field"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
