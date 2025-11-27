import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'black';
  fullWidth?: boolean;
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative font-bold uppercase tracking-wider border-2 border-black transition-all duration-75 active:top-[4px] active:left-[4px] active:shadow-none";
  
  let colorStyles = "";
  let shadowStyles = "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";

  switch (variant) {
    case 'primary':
      colorStyles = "bg-white text-black hover:bg-yellow-200";
      break;
    case 'secondary':
      colorStyles = "bg-white text-black hover:bg-gray-100";
      break;
    case 'black':
      colorStyles = "bg-black text-white hover:bg-gray-900";
      shadowStyles = "shadow-[4px_4px_0px_0px_rgba(100,100,100,1)]";
      break;
  }

  return (
    <button 
      className={`
        ${baseStyles} 
        ${colorStyles} 
        ${shadowStyles}
        py-3 px-6 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
