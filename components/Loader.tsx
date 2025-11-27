'use client';

import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onFinish: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Randomize the loading speed slightly for a more organic feel
    const interval = setInterval(() => {
      setProgress((prev) => {
        const remaining = 100 - prev;
        const jump = Math.ceil(Math.random() * 10) + 1;
        const next = Math.min(prev + jump, 100);

        if (next === 100) {
          clearInterval(interval);
          setTimeout(onFinish, 800); // Delay before removing loader
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#f3f4f6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-between items-end mb-2">
          <span className="font-bold font-mono uppercase text-sm tracking-widest">System Boot</span>
          <span className="font-black text-6xl md:text-8xl leading-none">{progress}%</span>
        </div>

        {/* Brutalist Progress Bar */}
        <div className="w-full h-6 md:h-8 border-4 border-black p-1 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div
            className="h-full bg-black transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="mt-4 font-mono text-xs md:text-sm text-gray-500 space-y-1 h-20">
          <p>{'>'} Initializing core modules...</p>
          {progress > 25 && <p>{'>'} Loading texture assets... OK</p>}
          {progress > 50 && <p>{'>'} Compiling shaders... OK</p>}
          {progress > 75 && <p>{'>'} Mounting interface... OK</p>}
          {progress === 100 && <p className="text-black font-bold animate-pulse">{'>'} READY TO LAUNCH</p>}
        </div>
      </div>
    </div>
  );
};
