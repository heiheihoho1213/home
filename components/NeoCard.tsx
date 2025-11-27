import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  color?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  color = 'bg-white'
}) => {
  return (
    <div className={`
      border-2 border-black 
      ${color}
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      ${hoverEffect ? 'transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};
