'use client';

import React, { useEffect, useState } from 'react';

export const PixelCat: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalDocScrollLength = docHeight - windowHeight;

      // Calculate scroll percentage (0 to 1)
      const percentage = Math.min(Math.max(scrollY / (totalDocScrollLength || 1), 0), 1);
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State Logic
  let variant: 'cool' | 'yellow-sleep' | 'pink-sleep' | 'grey-sleep' = 'cool';

  if (scrollPercentage > 0.80) {
    variant = 'grey-sleep';
  } else if (scrollPercentage > 0.40) {
    variant = 'pink-sleep';
  } else if (scrollPercentage > 0.05) {
    variant = 'yellow-sleep';
  }

  // Palettes
  const PALETTES = {
    cool: {
      body: '#ff9f27',
      stripe: '#e07e15',
    },
    'yellow-sleep': {
      body: '#ff9f27',
      stripe: '#e07e15',
    },
    'pink-sleep': {
      body: '#ffb6ec',
      stripe: '#d98bc4',
    },
    'grey-sleep': {
      body: '#999999',
      stripe: '#666666',
    }
  };

  const currentPalette = PALETTES[variant];
  const isSleeping = variant !== 'cool';

  // Helper to render a rect pixel
  const P = ({ x, y, c }: { x: number, y: number, c: string }) => (
    <rect x={x} y={y} width="1" height="1" fill={c} />
  );

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none">
      <div
        className="relative pointer-events-auto cursor-pointer transition-transform hover:scale-110 active:scale-95"
        onClick={scrollToTop}
        title="Scroll to Top"
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* ==========================================
              COOL CAT STATE (STANDING)
              ========================================== */}
          {!isSleeping && (
            <g id="cool-cat">
              {/* BODY FILL */}
              <rect x="9" y="12" width="14" height="13" fill={currentPalette.body} />
              <rect x="10" y="10" width="12" height="2" fill={currentPalette.body} />

              {/* HEAD OUTLINE */}
              <P x={10} y={9} c="black" /> <P x={11} y={9} c="black" /> <P x={20} y={9} c="black" /> <P x={21} y={9} c="black" /> {/* Ears Top */}
              <P x={9} y={10} c="black" /> <P x={12} y={10} c="black" /> <P x={19} y={10} c="black" /> <P x={22} y={10} c="black" /> {/* Ears Side */}
              <P x={13} y={10} c="black" /> <P x={14} y={10} c="black" /> <P x={15} y={10} c="black" /> <P x={16} y={10} c="black" /> <P x={17} y={10} c="black" /> <P x={18} y={10} c="black" /> {/* Head Top */}
              <P x={8} y={11} c="black" /> <P x={23} y={11} c="black" /> {/* Head Sides */}

              {/* BODY OUTLINE */}
              <rect x="8" y="12" width="1" height="12" fill="black" /> {/* Left Side */}
              <rect x="23" y="12" width="1" height="7" fill="black" />  {/* Right Side Upper */}

              {/* TAIL (Upright Curve) */}
              <rect x="24" y="18" width="3" height="1" fill="black" />
              <rect x="26" y="16" width="1" height="2" fill="black" />
              <rect x="27" y="13" width="1" height="3" fill="black" />
              <rect x="24" y="19" width="3" height="4" fill={currentPalette.body} /> {/* Tail fill base */}
              <rect x="26" y="14" width="1" height="4" fill={currentPalette.body} /> {/* Tail fill tip */}
              <P x={27} y={19} c="black" /> <P x={27} y={20} c="black" /> {/* Tail Right Edge */}

              {/* BOTTOM / LEGS */}
              <rect x="9" y="24" width="14" height="1" fill="black" />
              <P x={11} y={23} c="black" /> <P x={12} y={23} c="black" /> {/* Paw Separator */}
              <P x={19} y={23} c="black" /> <P x={20} y={23} c="black" /> {/* Paw Separator */}

              {/* SUNGLASSES (Refined) */}
              {/* Left Lens */}
              <rect x="10" y="13" width="5" height="3" fill="black" />
              <rect x="11" y="13" width="1" height="1" fill="white" /> {/* Shine */}

              {/* Right Lens */}
              <rect x="17" y="13" width="5" height="3" fill="black" />
              <rect x="18" y="13" width="1" height="1" fill="white" /> {/* Shine */}

              {/* Bridge */}
              <rect x="15" y="14" width="2" height="1" fill="black" />

              {/* NOSE */}
              <P x={15} y={17} c="black" /> <P x={16} y={17} c="black" />

              {/* STRIPES */}
              <P x={15} y={9} c={currentPalette.stripe} /> <P x={16} y={9} c={currentPalette.stripe} /> {/* Head Stripe */}
              <rect x="8" y="18" width="2" height="1" fill={currentPalette.stripe} /> {/* Left Stripe 1 */}
              <rect x="8" y="20" width="2" height="1" fill={currentPalette.stripe} /> {/* Left Stripe 2 */}
              <rect x="22" y="18" width="2" height="1" fill={currentPalette.stripe} /> {/* Right Stripe 1 */}
              <rect x="22" y="20" width="2" height="1" fill={currentPalette.stripe} /> {/* Right Stripe 2 */}

              {/* WHISKERS */}
              <rect x="5" y="13" width="3" height="1" fill="black" />
              <rect x="5" y="15" width="3" height="1" fill="black" />
              <rect x="24" y="13" width="3" height="1" fill="black" />
              <rect x="24" y="15" width="3" height="1" fill="black" />
            </g>
          )}


          {/* ==========================================
              SLEEPING LOAF STATE (FAT CAT WITH CURLY TAIL)
              ========================================== */}
          {isSleeping && (
            <g id="sleeping-loaf">
              {/* Body Main Fill */}
              <rect x="7" y="15" width="20" height="10" fill={currentPalette.body} />

              {/* OUTLINE */}
              {/* Top Line */}
              <rect x="8" y="14" width="1" height="1" fill="black" /> {/* Ear L Base */}
              <rect x="9" y="13" width="2" height="1" fill="black" /> {/* Ear L Tip */}
              <rect x="11" y="14" width="3" height="1" fill="black" /> {/* Head Top */}
              <rect x="14" y="13" width="2" height="1" fill="black" /> {/* Ear R Tip */}
              <rect x="16" y="14" width="9" height="1" fill="black" /> {/* Back */}
              <rect x="25" y="15" width="1" height="1" fill="black" /> {/* Back Curve */}

              {/* Right Side */}
              <rect x="26" y="16" width="1" height="9" fill="black" />

              {/* Bottom Side */}
              <rect x="7" y="25" width="19" height="1" fill="black" />

              {/* Left Side */}
              <rect x="6" y="16" width="1" height="9" fill="black" />
              <rect x="7" y="15" width="1" height="1" fill="black" />

              {/* FACE DETAILS */}
              {/* Eyes */}
              <rect x="9" y="18" width="2" height="1" fill="black" />
              <rect x="13" y="18" width="2" height="1" fill="black" />
              {/* Nose */}
              <rect x="12" y="19" width="1" height="1" fill="black" />

              {/* WHISKERS */}
              <rect x="3" y="17" width="3" height="1" fill="black" />
              <rect x="3" y="19" width="3" height="1" fill="black" />

              {/* STRIPES ON HEAD */}
              <rect x="11" y="15" width="3" height="1" fill={currentPalette.stripe} />

              {/* BACK STRIPES */}
              <rect x="18" y="15" width="2" height="2" fill={currentPalette.stripe} />
              <rect x="22" y="15" width="2" height="2" fill={currentPalette.stripe} />

              {/* CURLY TAIL OVERLAY */}
              {/* Tail Outline */}
              <rect x="17" y="24" width="7" height="1" fill="black" /> {/* Tail Bottom */}
              <rect x="16" y="22" width="1" height="2" fill="black" /> {/* Tail Tip */}
              <rect x="17" y="21" width="1" height="1" fill="black" />
              <rect x="24" y="21" width="1" height="3" fill="black" /> {/* Tail Right Vert */}
              <rect x="20" y="20" width="3" height="1" fill="black" /> {/* Tail Top */}
              <rect x="23" y="20" width="1" height="1" fill="black" />

              {/* Tail Fill (on top of body) */}
              <rect x="17" y="22" width="7" height="2" fill={currentPalette.body} />
              <rect x="20" y="21" width="4" height="1" fill={currentPalette.body} />

              {/* Tail Stripes */}
              <rect x="22" y="22" width="1" height="2" fill={currentPalette.stripe} />
              <rect x="19" y="22" width="1" height="2" fill={currentPalette.stripe} />

              {/* ZZZ ANIMATION */}
              <g className="animate-pulse">
                <text x="26" y="10" fontSize="8" fontFamily="monospace" fill="black" style={{ animation: 'float 2s infinite ease-in-out' }}>z</text>
                <text x="30" y="6" fontSize="6" fontFamily="monospace" fill="black" style={{ animation: 'float 2.5s infinite ease-in-out', animationDelay: '0.5s' }}>z</text>
              </g>
            </g>
          )}
        </svg>
        <style>{`
          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-10px) translateX(5px); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
};