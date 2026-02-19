import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-mono text-primary mb-2 tracking-widest uppercase opacity-80">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dim group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input 
          className={`
            w-full bg-[#050505] text-white border border-white/10 rounded-lg px-4 py-3
            focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]
            placeholder:text-white/20 font-mono text-left transition-all duration-300
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};