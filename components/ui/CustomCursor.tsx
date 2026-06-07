"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!hasFinePointer) {
      return undefined;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      return undefined;
    }

    setIsEnabled(true);
    document.body.classList.add("custom-cursor-enabled");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPosition = { x: pointer.x, y: pointer.y };
    let frameId = 0;
    let isHoveringInteractive = false;
    let isPointerPressed = false;

    const syncVisualState = () => {
      const ringScale = isPointerPressed ? 0.88 : isHoveringInteractive ? 1.55 : 1;
      const ringOpacity = isHoveringInteractive ? 1 : 0.75;

      dot.style.opacity = "1";
      ring.style.opacity = "1";
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      ring.style.borderColor = isHoveringInteractive
        ? "rgba(255, 138, 91, 0.95)"
        : "rgba(255, 209, 102, 0.5)";
      ring.style.opacity = String(ringOpacity);
    };

    const animate = () => {
      ringPosition.x += (pointer.x - ringPosition.x) * 0.18;
      ringPosition.y += (pointer.y - ringPosition.y) * 0.18;
      syncVisualState();
      frameId = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const handleHover = (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        isHoveringInteractive = false;
        return;
      }

      isHoveringInteractive = Boolean(
        target.closest(
          "a, button, input, textarea, select, [data-cursor='hover'], [role='button']"
        )
      );
    };

    const handlePointerDown = () => {
      isPointerPressed = true;
    };

    const handlePointerUp = () => {
      isPointerPressed = false;
    };

    dot.style.opacity = "0";
    ring.style.opacity = "0";
    frameId = window.requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleHover, { passive: true });
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      window.cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-10 w-10 rounded-full border border-accent-cyan/60 bg-accent-cyan/5 shadow-neon md:block"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[71] hidden h-2.5 w-2.5 rounded-full bg-accent-cyan shadow-neon md:block"
        aria-hidden="true"
      />
    </>
  );
}
