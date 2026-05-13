"use client";

import { useState, useEffect } from "react";

interface RotatingTextProps {
  items: string[];
  interval?: number;
  className?: string;
}

export default function RotatingText({ items, interval = 3000, className = "" }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setFade(true);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (!mounted) {
    return <span className={className}>{items[0]}</span>;
  }

  return (
    <span
      className={`inline-block transition-all duration-700 ${
        fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      } ${className}`}
    >
      {items[index]}
    </span>
  );
}
