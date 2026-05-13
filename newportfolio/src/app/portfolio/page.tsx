"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import RotatingText from "@/components/RotatingText";

export default function PortfolioPage() {
  const [activePane, setActivePane] = useState<"archive" | "dispatch" | "expertise" | null>(null);

  const openPane = (pane: "archive" | "dispatch" | "expertise") => setActivePane(pane);
  const closePane = () => setActivePane(null);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white font-sans text-on-surface selection:bg-primary/10">
      {/* Grain Overlay */}
      <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      {/* Background Visual */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/digital_antique_bg.png"
          alt="Digital Antique Background"
          fill
          className="object-cover opacity-20 mix-blend-multiply"
          priority
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* Main Landing View */}
      <main className={`relative h-full w-full flex flex-col items-center justify-center p-8 md:p-24 transition-all duration-1000 ${activePane ? 'scale-[0.98] blur-sm' : 'scale-100 blur-0'}`}>
        {/* Header Brand Anchor */}
        <div className="absolute top-10 left-0 w-full flex justify-center px-10 opacity-0 animate-rise-up">
          <Link href="/" className="flex items-center gap-4 text-primary group">
            <div className="size-6 transition-transform group-hover:-rotate-12">
              <svg className="text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-primary text-xl font-bold leading-tight tracking-[0.3em] font-serif uppercase">Raamgopal S (CSE)</h2>
          </Link>
        </div>

        {/* Central Typography */}
        <div className="max-w-max text-center flex flex-col items-center z-10">
          <span className="font-label-caps uppercase text-on-surface-variant tracking-[0.4em] mb-6 block text-[10px] md:text-xs opacity-0 animate-rise-up delay-200">A Portfolio of Software Developer</span>
          <h1 className="font-serif text-[clamp(40px,10vw,100px)] text-primary leading-[0.9] font-bold tracking-tighter mb-12 opacity-0 animate-rise-up delay-400">
            Creating Digital Experiences <br/> As <RotatingText items={["Unique", "Innovative", "Purposeful"]} className="text-secondary italic font-serif drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]" /> For Business  
          </h1>
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 mt-4">
            <button 
              className="group flex flex-col items-center gap-4 focus:outline-none opacity-0 animate-rise-from-left delay-600" 
              onClick={() => openPane("archive")}
            >
              <div className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all duration-500 shadow-xl shadow-black/5">
                <span className="material-symbols-outlined text-2xl">layers</span>
              </div>
              <span className="font-label-caps font-bold tracking-[0.2em] text-[10px]">Explore My Work</span>
            </button>
           
            <button 
              className="group flex flex-col items-center gap-4 focus:outline-none opacity-0 animate-rise-up delay-800" 
              onClick={() => openPane("expertise")}
            >
              <div className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all duration-500 shadow-xl shadow-black/5">
                <span className="material-symbols-outlined text-2xl">architecture</span>
              </div>
              <span className="font-label-caps font-bold tracking-[0.2em] text-[10px]">My Expertise</span>
            
            </button>
            
            <button 
              className="group flex flex-col items-center gap-4 focus:outline-none opacity-0 animate-rise-from-right delay-1000" 
              onClick={() => openPane("dispatch")}
            >
              <div className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all duration-500 shadow-xl shadow-black/5">
                <span className="material-symbols-outlined text-2xl">alternate_email</span>
              </div>
              <span className="font-label-caps font-bold tracking-[0.2em] text-[10px]">Contact Us</span>
            </button>
          </div>
        </div>

        {/* Footer Coordinates */}
        <div className="absolute bottom-10 left-10 font-label-caps text-[9px] opacity-40 tracking-widest hidden md:block">
          11.6457° N, 78.1536° E
        </div>
        <div className="absolute bottom-10 right-10 font-label-caps text-[9px] opacity-40 tracking-widest">
          © Raamgopal S Reserved Rights
        </div>
      </main>

      {/* Slide-in Pane: PROJECT SHOWCASE (From Left) */}
      <div 
        className={`fixed inset-y-0 left-0 w-full md:w-[85vw] lg:w-[75vw] bg-white shadow-[20px_0_60px_rgba(0,0,0,0.1)] z-50 flex flex-col transition-transform duration-[800ms] cubic-bezier(0.77, 0, 0.175, 1) rounded-r-[40px] border-r border-outline-variant/30 ${activePane === 'archive' ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-8 md:p-12 border-b border-outline-variant/30">
          <div className="flex flex-col">
            <h3 className="font-serif text-3xl font-bold text-primary">PROJECT SHOWCASE</h3>
            <p className="font-label-caps text-on-surface-variant tracking-widest uppercase mt-1 text-[10px]">Selected works in AI, Cloud, and Scalable Systems</p>
          </div>
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-primary hover:text-surface transition-all duration-500 group" 
            onClick={closePane}
          >
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "SafePath AI",
                category: "MOBILE APP • AI NAVIGATION",
                img: "/safepath_ai.png",
                desc: "Sustainable navigation app recommending healthier travel routes based on real-time environmental risk factors and user health profiles."
              },
              {
                title: "Real-Time Surplus Engine",
                category: "WEB PLATFORM • RESOURCE AI",
                img: "/surplus_engine.png",
                desc: "Intelligent resource allocation system leveraging Google Firestore and Gemini AI for optimized matching in dynamic marketplaces."
              },
              {
                title: "System Failure Detector",
                category: "INFRASTRUCTURE • MONITORING",
                img: "/system_failure.png",
                desc: "Advanced cloud monitoring simulation environment designed for training AI agents in incident response and recovery."
              },
              {
                title: "Tutorx Bandit Service",
                category: "BACKEND • ML SERVICE",
                img: "/tutorx_bandit.png",
                desc: "Reinforcement learning-based recommendation engine utilizing LinUCB algorithms for personalized education paths."
              },
              {
                title: "Resume AI Suggest",
                category: "WEB TOOL • NLP",
                img: "/resume_ai.png",
                desc: "Streamlit-powered analysis tool using OpenAI to provide actionable improvements for resumes based on specific job roles."
              },
              {
                title: "Fledge Academy",
                category: "CLIENT PROJECT • EDUCATION",
                img: "/fledge_academy.png",
                desc: "A premium Japanese language academy platform built for professional clients, featuring interactive learning paths and automated enrollment."
              }
            ].map((artifact, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-video bg-neutral-100 overflow-hidden rounded-2xl relative shadow-md group-hover:shadow-2xl transition-all duration-700">
                  <Image 
                    src={artifact.img}
                    alt={artifact.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="mt-6 px-2">
                  <p className="font-label-caps text-secondary tracking-[0.2em] mb-2 text-[9px] uppercase font-bold">{artifact.category}</p>
                  <h4 className="font-serif text-xl font-medium text-primary group-hover:text-secondary transition-colors">{artifact.title}</h4>
                  <p className="font-body-md text-primary/60 mt-2 text-sm italic leading-relaxed">{artifact.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-outline-variant/30 pt-16 pb-12 text-center">
            <p className="max-w-2xl mx-auto font-serif text-2xl leading-relaxed text-on-surface-variant italic">
              &quot;Architecture is the learned game, correct and magnificent, of forms assembled in the light.&quot;
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-outline/40"></div>
              <span className="font-label-caps tracking-[0.3em] text-[10px] text-primary/40 uppercase">Design & Engineering Standards</span>
              <div className="h-[1px] w-12 bg-outline/40"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-in Pane: MY EXPERTISE (From Bottom) */}
      <div 
        className={`fixed inset-x-0 bottom-0 h-[92vh] bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.1)] z-50 flex flex-col transition-transform duration-[800ms] cubic-bezier(0.77, 0, 0.175, 1) rounded-t-[40px] border-t border-outline-variant/30 ${activePane === 'expertise' ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center justify-between p-8 md:p-12 border-b border-outline-variant/30">
          <div className="flex flex-col">
            <h3 className="font-serif text-3xl font-bold text-primary">MY EXPERTISE</h3>
            <p className="font-label-caps text-on-surface-variant tracking-widest uppercase mt-1 text-[10px]">Technical Stack & Core Competencies</p>
          </div>
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-primary hover:text-surface transition-all duration-500 group" 
            onClick={closePane}
          >
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Subtle Background for Skills */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Image 
              src="/skills_bg.png"
              alt="Skills Background"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8 md:p-12 space-y-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {[
                {
                  title: "Frontend Engineering",
                  icon: "auto_awesome_mosaic",
                  skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Material UI"],
                  accent: "bg-blue-500/5"
                },
                {
                  title: "Backend & Systems",
                  icon: "terminal",
                  skills: ["Node.js", "FastAPI", "Python", "Go", "PostgreSQL", "Prisma ORM"],
                  accent: "bg-emerald-500/5"
                },
                {
                  title: "AI Integration",
                  icon: "psychology_alt",
                  skills: ["Gemini AI", "OpenAI API", "Vertex AI", "LangChain", "Vector Databases"],
                  accent: "bg-purple-500/5"
                },
                {
                  title: "Cloud Infrastructure",
                  icon: "cloud_done",
                  skills: ["GCP", "Firebase", "Docker", "Vercel", "CI/CD Pipelines", "Terraform"],
                  accent: "bg-amber-500/5"
                }
              ].map((category, idx) => (
                <div key={idx} className={`group p-8 rounded-[32px] border border-outline-variant/20 hover:border-primary/20 transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 relative overflow-hidden ${category.accent}`}>
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-surface transition-all duration-500 border border-outline-variant/10">
                      <span className="material-symbols-outlined text-2xl">{category.icon}</span>
                    </div>
                    <h4 className="font-serif text-2xl font-semibold text-primary tracking-tight">{category.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="px-5 py-2.5 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-xl font-label-caps text-[10px] tracking-widest text-primary/80 hover:bg-primary hover:text-surface hover:border-primary transition-all duration-300 cursor-default shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-outline-variant/30 pt-16 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <h5 className="font-label-caps text-secondary tracking-[0.3em] mb-4 text-[10px] uppercase">Methodology</h5>
                  <p className="text-sm text-primary/60 italic leading-relaxed">
                    Agile development focused on clean architecture, modular code, and high-performance user experiences.
                  </p>
                </div>
                <div>
                  <h5 className="font-label-caps text-secondary tracking-[0.3em] mb-4 text-[10px] uppercase">Aesthetics</h5>
                  <p className="text-sm text-primary/60 italic leading-relaxed">
                    A commitment to minimalism, glassmorphism, and architectural precision in every digital interface.
                  </p>
                </div>
                <div>
                  <h5 className="font-label-caps text-secondary tracking-[0.3em] mb-4 text-[10px] uppercase">Innovation</h5>
                  <p className="text-sm text-primary/60 italic leading-relaxed">
                    Leveraging state-of-the-art AI models to create intelligent systems that solve real-world complexities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-in Pane: CONTACT (From Right) */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[85vw] lg:w-[75vw] bg-primary text-surface shadow-[-20px_0_60px_rgba(0,0,0,0.3)] z-50 flex flex-col transition-transform duration-[800ms] cubic-bezier(0.77, 0, 0.175, 1) rounded-l-[40px] border-l border-white/10 ${activePane === 'dispatch' ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-8 md:p-12 border-b border-white/10">
          <div className="flex flex-col">
            <h3 className="font-serif text-3xl font-bold text-surface">GET IN TOUCH</h3>
            <p className="font-label-caps text-on-primary-container tracking-widest uppercase mt-1 text-[10px]">Professional Inquiries & Collaborations</p>
          </div>
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-primary transition-all duration-500 group" 
            onClick={closePane}
          >
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="font-label-caps text-secondary tracking-[0.3em] text-[10px] font-bold">OFFICE</span>
                <p className="font-serif text-2xl">Salem, Tamil Nadu <br/> India</p>
              </div>
              <div className="space-y-4">
                <span className="font-label-caps text-secondary tracking-[0.3em] text-[10px] font-bold">DIGITAL</span>
                <p className="font-serif text-2xl hover:text-secondary transition-colors"><a href="mailto:raamgopal.dev@gmail.com">raamgopal2369@gmail.com</a></p>
                <p className="font-serif text-2xl hover:text-secondary transition-colors"><a href="https://linkedin.com/in/raamgopal-s-0707b0257">LinkedIn Profile</a></p>
                <p className="font-serif text-2xl hover:text-secondary transition-colors"><a href="https://github.com/Raamgopal8">GitHub Profile</a></p>
              </div>
              <div className="pt-8 opacity-40">
                <p className="text-xs italic leading-relaxed max-w-xs">
                  Available for full-stack engineering roles, AI integration consulting, and premium UI/UX design partnerships.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-white/5 rounded-3xl -z-10 blur-xl" />
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Background Overlay for active panes */}
      {activePane && (
        <div 
          className="fixed inset-0 z-[45] bg-black/40 backdrop-blur-sm cursor-pointer transition-opacity duration-500"
          onClick={closePane}
        />
      )}
    </div>
  );
}
