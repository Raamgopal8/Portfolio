"use client";

import React from 'react';

export default function CuratorChatbot() {
  return (
    <div className="flex h-screen w-full bg-surface text-on-surface selection:bg-primary/10">
      <div className="grain-overlay opacity-[0.03] !fixed pointer-events-none" />

      {/* Main Content Area - Full Width */}
      <main className="flex-1 flex flex-col relative h-full bg-surface-container-lowest overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/ai_bot_bg_light.png')] bg-cover bg-center mix-blend-multiply opacity-[0.07]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest via-transparent to-surface-container-lowest"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-surface-container-lowest"></div>
        </div>

        {/* Chat Area - Empty Canvas */}
        <section className="flex-1 relative z-10">
          {/* Messages would render here */}
        </section>

        {/* Input Dock - Floating Design */}
        <div className="fixed bottom-0 left-0 right-0 p-8 md:p-12 z-40 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/90 to-transparent">
          <div className="max-w-[850px] mx-auto relative group">
            {/* Glossy Backdrop */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/60 transition-all duration-500 group-focus-within:shadow-[0_20px_60px_rgba(0,0,0,0.12)] group-focus-within:border-primary/10"></div>
            
            <div className="relative flex items-center p-3">
              <button className="ml-4 text-on-surface-variant/30 hover:text-primary transition-all p-2.5 hover:bg-surface-variant/30 rounded-xl">
                <span className="material-symbols-outlined text-[22px]">add_circle</span>
              </button>
              <input 
                className="w-full bg-transparent px-6 py-5 pr-36 focus:outline-none font-body-md text-primary placeholder:text-primary/20 selection:bg-primary/20" 
                placeholder="Message the AI Assistant..." 
                type="text" 
              />
              <div className="absolute right-5 flex items-center gap-2">
                <button className="text-on-surface-variant/30 hover:text-primary transition-all p-2.5 hover:bg-surface-variant/30 rounded-xl">
                  <span className="material-symbols-outlined text-[22px]">mic</span>
                </button>
                <button className="bg-primary text-surface p-4 rounded-full flex items-center justify-center hover:scale-[1.03] transition-all shadow-2xl shadow-primary/30 active:scale-95 group/send">
                  <span className="material-symbols-outlined text-[22px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
