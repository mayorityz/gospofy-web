import { ReactNode } from "react";

interface FormInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  icon: ReactNode;
  required?: boolean;
}

export const FormInput = ({
  id,
  type,
  value,
  onChange,
  label,
  placeholder,
  icon,
  required = false,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[12px] text-gold-900/90 mb-[6px]">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold/70">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="w-full h-[50px] p-2 pl-10 rounded-md border border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-1 focus:ring-gold-900/50 focus:outline-none transition-colors"
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};
