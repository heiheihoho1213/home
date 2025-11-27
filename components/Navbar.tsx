'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const t = TRANSLATIONS[language];

  const isActive = (path: string) => {
    return pathname === path ? 'bg-black text-white' : 'bg-white text-black hover:bg-yellow-200';
  };

  const navItemClass = (path: string) => `
    border-2 border-black px-4 py-2 font-bold uppercase text-sm md:text-base transition-colors duration-200
    ${isActive(path)}
  `;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <svg
              width="32"
              height="32"
              viewBox="0 3 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 flex-shrink-0 transition-transform group-hover:scale-110 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Body Main Fill */}
              <rect x="7" y="15" width="20" height="10" fill="#ff9f27" />

              {/* OUTLINE */}
              {/* Top Line */}
              <rect x="8" y="14" width="1" height="1" fill="black" />
              <rect x="9" y="13" width="2" height="1" fill="black" />
              <rect x="11" y="14" width="3" height="1" fill="black" />
              <rect x="14" y="13" width="2" height="1" fill="black" />
              <rect x="16" y="14" width="9" height="1" fill="black" />
              <rect x="25" y="15" width="1" height="1" fill="black" />

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
              <rect x="11" y="15" width="3" height="1" fill="#e07e15" />

              {/* BACK STRIPES */}
              <rect x="18" y="15" width="2" height="2" fill="#e07e15" />
              <rect x="22" y="15" width="2" height="2" fill="#e07e15" />

              {/* CURLY TAIL OVERLAY */}
              {/* Tail Outline */}
              <rect x="17" y="24" width="7" height="1" fill="black" />
              <rect x="16" y="22" width="1" height="2" fill="black" />
              <rect x="17" y="21" width="1" height="1" fill="black" />
              <rect x="24" y="21" width="1" height="3" fill="black" />
              <rect x="20" y="20" width="3" height="1" fill="black" />
              <rect x="23" y="20" width="1" height="1" fill="black" />

              {/* Tail Fill */}
              <rect x="17" y="22" width="7" height="2" fill="#ff9f27" />
              <rect x="20" y="21" width="4" height="1" fill="#ff9f27" />

              {/* Tail Stripes */}
              <rect x="22" y="22" width="1" height="2" fill="#e07e15" />
              <rect x="19" y="22" width="1" height="2" fill="#e07e15" />
            </svg>
            <span className="hidden sm:inline font-bold text-xl tracking-tighter uppercase italic">Heiheihoho's<span className="text-stroke pl-2">Home</span></span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex space-x-2">
              <Link href="/" className={navItemClass('/')}>
                {t.nav_work}
              </Link>
              <Link href="/blog" className={navItemClass('/blog')}>
                {t.nav_blog}
              </Link>
              <Link href="/gallery" className={navItemClass('/gallery')}>
                {t.nav_gallery}
              </Link>
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="ml-2 px-3 py-2 font-mono font-bold text-sm border-2 border-black bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors"
            >
              {language === 'en' ? 'EN' : '中文'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
