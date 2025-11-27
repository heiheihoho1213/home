import React from 'react';
import { useRouter } from 'next/router';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div 
      key={router.asPath} 
      className="animate-brutal-enter w-full"
    >
      {children}
    </div>
  );
};