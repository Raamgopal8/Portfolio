import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <main className="flex flex-col md:flex-row h-full w-full">
        {/* Left Side: Static Website Portal */}
        <section className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b md:border-b-0 md:border-r border-outline-variant/20">
          <div className="grain-overlay"></div>
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
          </div>
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
            <h2 className="font-display-lg text-surface mb-8 max-w-md">Digital Exploration</h2>
            <p className="font-body-lg text-surface/70 mb-12 max-w-sm">Explore my projects through a timeless, minimalist lens.</p>
            <Link className="shimmer-effect relative overflow-hidden px-10 py-4 bg-transparent border-2 border-surface text-surface font-label-caps uppercase tracking-widest hover:bg-surface hover:text-primary transition-all duration-300 active:scale-95 rounded-full shadow-2xl shadow-black/20" href="/portfolio">
                Portfolio
            </Link>
          </div>
        </section>

        {/* Right Side: AI Chatbot Portal */}
        <section className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden">
          <div className="grain-overlay"></div>
          {/* Background Image (AI Bot theme) */}
          <div className="absolute inset-0 z-0 bg-[#f5f3f3]">
            <div className="absolute inset-0 opacity-80 bg-[url('/ai_bot_bg_light.png')] bg-cover bg-center"></div>
            {/* Symbolic representation of the chatbot interface layout in the background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 grayscale transition-all duration-700 group-hover:opacity-10 group-hover:scale-110">
              <div className="w-4/5 h-3/4 border-2 border-primary/20 p-8 flex flex-col gap-8">
                <div className="w-1/2 h-8 bg-primary/10"></div>
                <div className="w-2/3 h-24 bg-primary/5 self-end"></div>
                <div className="w-3/4 h-32 bg-primary/10"></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-surface/40 group-hover:bg-surface/20 transition-colors duration-500"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
            <h2 className="font-display-lg text-primary mb-8 max-w-md">AI Assistant</h2>
            <p className="font-body-lg text-on-surface-variant mb-12 max-w-sm">Consult with our intelligent AI bot for project walkthroughs and dynamic insights.</p>
            <Link className="shimmer-effect relative overflow-hidden px-10 py-4 bg-primary text-surface font-label-caps uppercase tracking-widest hover:bg-tertiary transition-all duration-300 active:scale-95 rounded-full shadow-2xl shadow-primary/30" href="/curator">
                Start Chat
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
