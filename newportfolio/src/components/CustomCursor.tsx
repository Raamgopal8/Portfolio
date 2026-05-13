"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let animationFrameId: number;
    let followerX = position.x;
    let followerY = position.y;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animateFollower = () => {
      followerX += (position.x - followerX) * 0.1;
      followerY += (position.y - followerY) * 0.1;
      setFollowerPosition({ x: followerX, y: followerY });
      animationFrameId = requestAnimationFrame(animateFollower);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationFrameId = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y, isVisible]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("group")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        className="fixed pointer-events-none z-[10000] rounded-full transition-transform duration-200 ease-out bg-on-tertiary-container"
        style={{
          width: "12px",
          height: "12px",
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Follower */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border border-on-tertiary-container transition-all duration-300 ease-out"
        style={{
          width: isHovering ? "60px" : "40px",
          height: isHovering ? "60px" : "40px",
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: "translate(-50%, -50%)",
          backgroundColor: isHovering
            ? "rgba(165, 131, 63, 0.05)"
            : "transparent",
        }}
      />
    </>
  );
}
