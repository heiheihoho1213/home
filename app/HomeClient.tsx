'use client';

import React, { useMemo } from 'react';
import { NeoButton } from '../components/NeoButton';
import { NeoCard } from '../components/NeoCard';
import { Reveal } from '../components/Reveal';
import { CONTENT } from '../data/content';
import { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

type HomeClientProps = {
  content: typeof CONTENT;
};

export default function HomeClient({ content }: HomeClientProps) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const projects = content[language].projects;

  const groupedProjects = useMemo(() => {
    const groups: Record<string, Project[]> = {};
    projects.forEach(project => {
      const cat = project.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(project);
    });
    return groups;
  }, [projects]);

  return (
    <div className="space-y-12 relative">
      <Reveal>
        <section className="mt-4 mb-10 flex flex-col items-start gap-3 relative">
          <div className="inline-block bg-black text-white px-3 py-0.5 font-bold text-xs mb-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,0,1)]">
            {t.hero_badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase relative z-10">
            {t.hero_title_1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 [-webkit-text-stroke:2px_black]">
              {t.hero_title_2}
            </span>
          </h1>
          <p className="text-lg pr-8 md:text-xl font-medium max-w-xl border-l-4 border-black pl-4 py-1 bg-white/50 relative z-10">
            {t.hero_desc}
          </p>
          <div className="flex flex-wrap gap-3 mt-2 relative z-10">
            <NeoButton variant="black" onClick={() => (window.location.href = 'mailto:hello@example.com')}>
              {t.hero_contact}
            </NeoButton>
            <NeoButton onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero_view_works}
            </NeoButton>
          </div>
        </section>
      </Reveal>

      <section id="work">
        <Reveal>
          <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-2">
            <h2 className="text-4xl md:text-5xl font-black uppercase">{t.projects_title}</h2>
            <span className="font-mono font-bold text-lg">
              {t.projects_total}: {projects.length.toString().padStart(2, '0')}
            </span>
          </div>
        </Reveal>

        {Object.entries(groupedProjects).map(([category, grouped], groupIndex) => (
          <div key={category} className="mb-12 last:mb-0">
            <Reveal delay={groupIndex * 100}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-black" />
                <h3 className="text-xl font-bold uppercase tracking-wider bg-yellow-300 inline-block px-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {category}
                </h3>
                <div className="h-0.5 bg-black flex-grow ml-2 opacity-20" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {grouped.map((project, index) => (
                <Reveal key={project.id} delay={index * 50 + 200}>
                  <NeoCard className="group flex flex-col h-full bg-white" hoverEffect>
                    <a href={project.link} className="block flex-grow flex flex-col h-full">
                      <div className="w-full aspect-video border-b-2 border-black overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute bottom-0 right-0 bg-white border-t-2 border-l-2 border-black p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map(tag => (
                            <span key={tag} className="bg-yellow-200 border border-black px-1.5 py-0.5 text-[10px] font-bold uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-bold mb-2 uppercase group-hover:underline decoration-4 underline-offset-4 decoration-yellow-400 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-gray-700 font-medium mb-4 text-xs leading-relaxed flex-grow">{project.description}</p>
                        <div className="mt-auto">
                          <NeoButton fullWidth className="!py-2 text-xs">
                            {t.project_visit}
                          </NeoButton>
                        </div>
                      </div>
                    </a>
                  </NeoCard>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

