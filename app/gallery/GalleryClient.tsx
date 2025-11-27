'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { NeoCard } from '../../components/NeoCard';
import { Reveal } from '../../components/Reveal';
import { CONTENT } from '../../data/content';
import { GalleryItem } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../data/translations';

type GalleryClientProps = {
  content: typeof CONTENT;
};

export default function GalleryClient({ content }: GalleryClientProps) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const t = TRANSLATIONS[language];
  const images = content[language].gallery;

  const [activeFilter, setActiveFilter] = useState<'ALL' | '3D RENDER' | 'PHOTOGRAPHY' | '3D 渲染' | '摄影' | '全部'>('ALL');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setActiveFilter(language === 'en' ? 'ALL' : '全部');
  }, [language]);

  const filteredImages = images.filter(img => {
    if (activeFilter === 'ALL' || activeFilter === '全部') return true;
    return img.category === activeFilter;
  });

  const getButtonClass = (filter: string) => `
    px-4 py-2 font-bold uppercase text-sm border-2 border-black transition-colors duration-200
    ${activeFilter === filter ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
  `;

  const modal =
    selectedImage && typeof document !== 'undefined'
      ? createPortal(
        <div
          className="fixed inset-0 h-[100vh] z-[100] bg-[transparent] backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-0 md:border-r-4 border-black h-[50vh] md:h-auto">
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-full object-contain" />
            </div>

            <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-yellow-300 border-2 border-black px-2 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {selectedImage.category}
                </span>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h2 className="text-3xl font-black uppercase mb-4 leading-none">{selectedImage.title}</h2>

              <div className="h-1 w-20 bg-black mb-6" />

              <p className="font-medium text-lg text-gray-700 leading-relaxed mb-8">{selectedImage.description}</p>

              <div className="mt-auto pt-6 border-t-2 border-gray-200">
                <p className="text-xs font-bold uppercase text-gray-400">
                  {t.gallery_id}: {selectedImage.id}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
      : null;

  return (
    <>
      <div>
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b-2 border-black pb-6">
            <div>
              <h1 className="text-6xl font-black uppercase leading-none mb-2">{t.gallery_title}</h1>
              <p className="font-medium text-xl">{t.gallery_subtitle}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter(language === 'en' ? 'ALL' : '全部')}
                className={getButtonClass(language === 'en' ? 'ALL' : '全部')}
              >
                {t.gallery_filter_all}
              </button>
              <button
                onClick={() => setActiveFilter(language === 'en' ? '3D RENDER' : '3D 渲染')}
                className={getButtonClass(language === 'en' ? '3D RENDER' : '3D 渲染')}
              >
                {t.gallery_filter_3d}
              </button>
              <button
                onClick={() => setActiveFilter(language === 'en' ? 'PHOTOGRAPHY' : '摄影')}
                className={getButtonClass(language === 'en' ? 'PHOTOGRAPHY' : '摄影')}
              >
                {t.gallery_filter_photo}
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[50vh]">
          {filteredImages.map((img, index) => (
            <Reveal key={img.id} delay={index * 50}>
              <NeoCard className="bg-white group overflow-hidden h-full cursor-pointer" hoverEffect>
                <div onClick={() => setSelectedImage(img)} className="relative aspect-square">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100">
                    <span className="bg-white border-2 border-black text-black px-2 py-1 font-bold text-xs self-start uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-2">
                      {img.category}
                    </span>
                    <span className="text-white font-bold uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">{t.gallery_expand}</span>
                  </div>
                </div>
              </NeoCard>
            </Reveal>
          ))}

          {filteredImages.length === 0 && (
            <div className="col-span-full flex items-center justify-center py-20 text-gray-500 font-bold uppercase border-2 border-dashed border-gray-300">
              No images found in this category.
            </div>
          )}
        </div>
      </div>
      {modal}
    </>
  );
}

