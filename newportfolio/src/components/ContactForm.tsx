"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="relative">
        <label className="font-label-caps text-[10px] text-on-tertiary-container absolute -top-2 left-0 tracking-widest">
          SENDER NAME
        </label>
        <input
          className="w-full bg-transparent border-b border-outline focus:border-on-tertiary-container outline-none py-2 font-body-md text-primary placeholder:text-outline-variant transition-colors"
          placeholder=""
          type="text"
          required
        />
      </div>
      <div className="relative">
        <label className="font-label-caps text-[10px] text-on-tertiary-container absolute -top-2 left-0 tracking-widest">
          YOUR   MAIL
        </label>
        <input
          className="w-full bg-transparent border-b border-outline focus:border-on-tertiary-container outline-none py-2 font-body-md text-primary placeholder:text-outline-variant transition-colors"
          placeholder=""
          type="email"
          required
        />
      </div>
      <div className="relative">
        <label className="font-label-caps text-[10px] text-on-tertiary-container absolute -top-2 left-0 tracking-widest">
          MESSAGE CONTENT
        </label>
        <textarea
          className="w-full bg-transparent border-b border-outline focus:border-on-tertiary-container outline-none py-2 font-body-md text-primary placeholder:text-outline-variant transition-colors resize-none"
          placeholder=""
          rows={4}
          required
        />
      </div>
      
      {status === "success" && (
        <div className="p-4 bg-tertiary-container text-on-tertiary font-label-caps text-[10px] uppercase tracking-widest text-center animate-pulse">
          Mail Sent
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || status === "success"}
        className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-4 px-10 hover:bg-on-tertiary-container disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-4 rounded-full shadow-2xl shadow-primary/30"
      >
        <span>
          {status === "submitting" ? "SUBMITTING..." : status === "success" ? "SENT" : "SUBMIT BUTTON"}
        </span>
        <span className="material-symbols-outlined text-[16px]">
          {status === "success" ? "check" : "send"}
        </span>
      </button>
    </form>
  );
}
