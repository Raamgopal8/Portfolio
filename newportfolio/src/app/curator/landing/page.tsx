import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <main className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-surface">
        {/* Left Side: Static Website Portal */}
        <section className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b md:border-b-0 md:border-r border-outline-variant/10">
          <div className="grain-overlay opacity-[0.04]"></div>
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              alt="Developer Portfolio Visualization" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src="/dev_portfolio_bg.png"
              fill
              priority
            />
            <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
          </div>
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
            <span className="font-label-caps text-surface/60 uppercase tracking-[0.4em] mb-6 text-[10px]">THE DIGITAL ARCHIVE</span>
            <h2 className="font-display-lg text-surface mb-8 max-w-md leading-tight">Digital Exploration</h2>
            <p className="font-body-lg text-surface/70 mb-12 max-w-sm">Experience the portfolio through a timeless, minimalist lens focusing on high-impact results.</p>
            <Link className="shimmer-effect group relative overflow-hidden px-12 py-4 bg-transparent border border-surface/30 text-surface font-label-caps uppercase tracking-[0.2em] text-[11px] hover:bg-surface hover:text-primary transition-all duration-500 active:scale-95" href="/portfolio">
                Enter Archive
                <span className="material-symbols-outlined text-[18px] ml-2 align-middle group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </Link>
          </div>
        </section>

        {/* Right Side: AI Chatbot Portal */}
        <section className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden bg-surface-container-low">
          <div className="grain-overlay opacity-[0.03]"></div>
          {/* Background Visuals */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-10 bg-[url('/ai_bot_bg_light.png')] bg-cover bg-center mix-blend-multiply transition-all duration-1000 group-hover:scale-110 group-hover:opacity-15"></div>
            
            {/* Abstract Tech Patterns */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 grayscale pointer-events-none">
              <div className="w-4/5 h-3/4 border border-primary/20 rounded-[40px] flex flex-col gap-10 p-12">
                <div className="w-1/2 h-1 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="w-2/3 h-32 border border-primary/10 rounded-2xl self-end"></div>
                <div className="w-3/4 h-48 border border-primary/10 rounded-2xl"></div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low via-transparent to-surface-container-low"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
            <h2 className="font-display-lg text-primary mb-8 max-w-md leading-tight">AI Assistant</h2>
            <p className="font-body-lg text-on-surface-variant/70 mb-12 max-w-sm">Consult with an intelligent technical agent for deep project insights and stack analysis.</p>
            <Link className="shimmer-effect group relative overflow-hidden px-12 py-4 bg-primary text-surface font-label-caps uppercase tracking-[0.2em] text-[11px] hover:bg-on-surface transition-all duration-500 active:scale-95 shadow-2xl shadow-primary/20" href="/curator">
                Initialize Bot
                <span className="material-symbols-outlined text-[18px] ml-2 align-middle group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

