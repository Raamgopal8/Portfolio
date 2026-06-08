"use client";
 
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const SUGGESTED_QUESTIONS = [
  "What is Raamgopal's primary tech stack?",
  "Tell me about the SafePath AI project.",
  "How does the Real-Time Surplus Engine work?",
  "What is the Tutorx Bandit Service?",
  "Explain Raamgopal's design philosophy."
];

// Simple Markdown-lite renderer component
const MarkdownText = ({ text }: { text: string }) => {
  // Bold: **text**
  // Lists: - item
  const lines = text.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        let content: any = line;
        
        // Handle lists
        const isListItem = line.trim().startsWith('- ');
        if (isListItem) {
          content = line.trim().substring(2);
        }

        // Handle bolding
        const parts = String(content).split(/(\*\*.*?\*\*)/g);
        const rendered = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold text-primary underline decoration-primary/20">{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        if (isListItem) {
          return (
            <div key={i} className="flex gap-2 items-start ml-2">
              <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{rendered}</span>
            </div>
          );
        }

        return <p key={i} className="leading-relaxed">{rendered}</p>;
      })}
    </div>
  );
};

export default function CuratorChatbot() {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: 'bot' | 'user' }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('curator_chat_history');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        { id: 1, text: "Greetings. I am **The Curator**, his personal Mentor and AI Project Manager. I've been hired to help you explore his portfolio and give you an overview of his work and expertise.", sender: 'bot' },
        { id: 2, text: "I can help you explore specific projects, explain technical implementations, or even provide insights into design patterns. What shall we investigate?", sender: 'bot' },
      ]);
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('curator_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (customInput?: string) => {
    const messageText = customInput || input;
    if (!messageText.trim() || isTyping) return;

    const userMessage = { id: Date.now(), text: messageText, sender: 'user' as const };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Neural link failed');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let botMessageId = Date.now() + 1;
      setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot' }]);
      setIsTyping(false);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => prev.map(m => m.id === botMessageId ? { ...m, text: m.text + chunk } : m));
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: `SYSTEM ERROR: Neural core sync failed. ${error.message || "Please verify GEMINI_API_KEY configuration."}`, 
        sender: 'bot' 
      }]);
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    if (confirm("Execute archival purge? This will reset the current neural session.")) {
      const initialMessages = [
        { id: Date.now(), text: "Neural session reset. Archives are standing by for new queries.", sender: 'bot' as const }
      ];
      setMessages(initialMessages);
      localStorage.setItem('curator_chat_history', JSON.stringify(initialMessages));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple toast could be added here
  };

  return (
    <div className="flex h-screen w-full bg-surface text-on-surface selection:bg-primary/10 overflow-hidden font-body-md">
      <div className="grain-overlay opacity-[0.03] !fixed pointer-events-none" />

      {/* Main Content Area - Full Width */}
      <main className="flex-1 flex flex-col relative h-full bg-surface-container-lowest overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/ai_bot_bg_light.png')] bg-cover bg-center mix-blend-multiply opacity-[0.07]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest via-transparent to-surface-container-lowest"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-surface-container-lowest"></div>
        </div>

        {/* Chat Header */}
        <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-outline-variant bg-surface/80 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/5 shadow-inner bg-surface-container group">
              <Image 
                src="/curator_bot_avatar.png" 
                alt="The Curator" 
                fill
                className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
              />
            </div>
            <div>
              <h1 className="font-headline-sm text-primary tracking-tight">The Curator</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                <span className="text-[10px] font-label-caps text-on-primary-container/70 tracking-widest">Neural Core Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
             <button 
               onClick={clearChat}
               title="Clear Archives"
               className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-error/10 hover:text-error transition-all text-on-surface-variant active:scale-90"
             >
               <span className="material-symbols-outlined !text-xl">delete_sweep</span>
             </button>
          </div>
        </header>

        {/* Messages Area */}
        <section 
          ref={scrollRef}
          className="relative z-10 flex-1 overflow-y-auto custom-scrollbar px-6 py-10 space-y-8 max-w-4xl mx-auto w-full"
        >
          {messages.map((msg, idx) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-rise-up`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className={`flex gap-4 group ${msg.sender === 'user' ? 'flex-row-reverse max-w-[75%]' : 'flex-row max-w-[85%]'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant bg-surface shadow-sm self-end mb-1">
                    <Image src="/curator_bot_avatar.png" alt="Bot" width={40} height={40} className="scale-110" />
                  </div>
                )}
                
                <div className="flex flex-col gap-1 relative group/msg">
                  <div className={`
                    px-6 py-4 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-sm transition-all duration-300
                    ${msg.sender === 'user' 
                      ? 'bg-primary text-on-primary rounded-tr-none shadow-primary/10' 
                      : 'bg-surface/90 text-on-surface border border-outline-variant/50 rounded-tl-none hover:border-primary/20'}
                  `}>
                    <MarkdownText text={msg.text} />
                  </div>
                  
                  {msg.sender === 'bot' && (
                    <button 
                      onClick={() => copyToClipboard(msg.text)}
                      className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover/msg:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-primary"
                      title="Copy to clipboard"
                    >
                      <span className="material-symbols-outlined !text-lg">content_copy</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-4 flex-row max-w-[85%]">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant bg-surface shadow-sm self-end mb-1 opacity-50">
                  <Image src="/curator_bot_avatar.png" alt="Bot" width={40} height={40} className="scale-110" />
                </div>
                <div className="bg-surface/90 px-6 py-4 rounded-3xl border border-outline-variant/30 rounded-tl-none backdrop-blur-sm">
                  <div className="flex gap-1.5 items-center h-6">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    <span className="ml-2 text-[10px] font-label-caps text-primary/40 tracking-widest">Neural core initializing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="h-4" /> {/* Spacer */}
        </section>

        {/* Chat Input Container */}
        <footer className="relative z-20 p-8 pt-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/95 to-transparent">
          {/* Suggested Questions */}
          <div className="max-w-4xl mx-auto mb-6 flex gap-3 overflow-x-auto no-scrollbar pb-2 mask-linear-r">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-5 py-2.5 rounded-full border border-outline-variant/50 bg-surface/50 backdrop-blur-md text-[10px] font-label-caps tracking-widest text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300"
              >
                {q}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="max-w-3xl mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-primary/10 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"></div>
            
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                placeholder={isTyping ? "The Curator is decoding..." : "Query the archival intelligence..."}
                className="w-full bg-surface/95 backdrop-blur-2xl border border-outline-variant/50 focus:border-primary/30 px-8 py-6 rounded-[1.8rem] pr-20 shadow-xl transition-all font-body-lg text-primary focus:outline-none placeholder:text-on-primary-container/40 ring-0 focus:ring-4 focus:ring-primary/5 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-on-primary w-12 h-12 flex items-center justify-center rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/20 disabled:scale-100 disabled:opacity-30"
              >
                <span className="material-symbols-outlined !text-2xl">arrow_upward</span>
              </button>
            </div>
          </form>
          
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-1.5 opacity-40">
               <span className="material-symbols-outlined !text-sm">security</span>
               <span className="text-[9px] font-label-caps tracking-widest uppercase">Encryption Active</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-40">
               <span className="material-symbols-outlined !text-sm">database</span>
               <span className="text-[9px] font-label-caps tracking-widest uppercase">RAG Synchronized</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


