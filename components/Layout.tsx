'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { PixelCat } from './PixelCat';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0] text-black">
      <Navbar />
      {/* 
         PixelCat is placed here to be available globally on all pages. 
         It has fixed positioning, so it stays in place relative to the viewport.
      */}
      <PixelCat />
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
        {children}
      </main>
      <footer className="border-t-2 border-black bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-bold">{t.footer_copyright}</p>
          <div className="flex gap-4">
            <a target="_blank" href="https://juejin.cn/user/2911933190649815" className="hover:underline font-medium">JUEJIN</a>
            <a target="_blank" href="https://github.com/heiheihoho1213" className="hover:underline font-medium">GITHUB</a>
            <div className="relative group">
              <span className="hover:underline font-medium cursor-pointer">WECHAT</span>
              <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="w-48 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-2">
                  <img
                    src="/home/img/wechat/me-qrcode.jpg"
                    alt="WeChat QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
