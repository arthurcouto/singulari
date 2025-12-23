import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'textarea';
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  rows = 4,
}) => {
  return (
    <div className="flex flex-col gap-2 group">
      <label className="form-label transition-colors duration-200 group-focus-within:text-primary">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="iep-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          className="iep-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
