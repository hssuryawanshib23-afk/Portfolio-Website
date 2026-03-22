"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import type { SpringValue } from "@react-spring/web";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import StaticSections from "@/components/StaticSections";

const SolarCanvas = dynamic(() => import("@/components/SolarCanvas"), { ssr: false });

// ─── Beat config (user's text preserved exactly) ─────────────────────────────
const BEATS = [
  {
    id: "singularity",
    scrollStart: 0, scrollEnd: 0.22,
    label: "Vent",
    title: "HARSH\nSURYAWANSHI",
    subtitle: "Electronics Engineer. AI/ML Builder. VJTI Mumbai · 19",
    detail: null as string | null,
    cta: null as string | null,
    align: "center" as const,
  },
  {
    id: "deconstruction",
    scrollStart: 0.25, scrollEnd: 0.47,
    label: "Interests",
    title: "ROOTS",
    subtitle: "love VLSI, Control Systems,(studying as part of academics) :). \nObsessed with open source, DeepTech, exploring & extending research.",
    detail: "That's the edge.",
    cta: null as string | null,
    align: "left" as const,
  },
  {
    id: "fusion",
    scrollStart: 0.50, scrollEnd: 0.72,
    label: "What i have built",
    title: "BUILD HIGHLIGHTS",
    subtitle: "Transformers from scratch. A GazeTracker from Scratch. RAG pipelines. \n Voice models. Lie detector. Portfolio Optimization. . . \n  Things that shouldn't work until they do.",
    detail: "",
    cta: null as string | null,
    align: "right" as const,
  },
  {
    id: "supernova",
    scrollStart: 0.75, scrollEnd: 0.97,
    label: "",
    title: "LET'S BUILD SOMETHING",
    subtitle: "Open to solving problems that are worth losing sleep over.",
    detail: null as string | null,
    cta: "GET IN TOUCH",
    align: "center" as const,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function beatOpacity(sp: number, s: number, e: number): number {
  if (sp < s) return 0;
  const fadeOutStart = s + (e - s) * 0.6;
  if (sp <= fadeOutStart) return 1;
  if (sp < e) return 1 - (sp - fadeOutStart) / (e - fadeOutStart);
  return 0;
}

function beatY(sp: number, s: number, e: number): number {
  const fadeOutStart = s + (e - s) * 0.6;
  if (sp > fadeOutStart && sp < e) {
    return -15 * ((sp - fadeOutStart) / (e - fadeOutStart));
  }
  return 0;
}

function brightness(sp: number): number {
  const d = Math.abs(sp - 0.5);
  return 1 + (d < 0.035 ? (1 - d / 0.035) * 0.65 : 0);
}

// ─── Canvas wrapper — reads spring directly, no re-renders ───────────────────
function CanvasShell({ sp, frames }: { sp: SpringValue<number>; frames: HTMLImageElement[] }) {
  return <SolarCanvas sp={sp} frames={frames} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [rawScroll, setRawScroll] = useState(0);
  const [canvasOpacity, setCanvasOpacity] = useState(1);

  // Ref for the INNER scroll container (animation zone)
  const animRef = useRef<HTMLDivElement>(null);

  // Spring drives frame index — smooth, configurable
  const { sp } = useSpring({
    sp: rawScroll,
    config: { tension: 220, friction: 28, clamp: false },
  });

  const handleLoaded = useCallback((loaded: HTMLImageElement[]) => {
    setFrames(loaded);
    setReady(true);
  }, []);

  // ── Inner container scroll → animation progress ───────────────────────────
  useEffect(() => {
    const el = animRef.current;
    if (!el || !ready) return;
    const handler = () => {
      const max = el.scrollHeight - el.clientHeight; // 4 × 100vh
      setRawScroll(max > 0 ? el.scrollTop / max : 0);
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [ready]);

  // ── Outer page scroll → canvas fades out entering static section ──────────
  useEffect(() => {
    const handler = () => {
      // animRef container is 100vh tall and sits at the top.
      // window.scrollY > 0 means we're past it into static content.
      const fadeEnd = window.innerHeight * 0.45;
      const co = 1 - Math.max(0, Math.min(1, window.scrollY / fadeEnd));
      setCanvasOpacity(co);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll only during loading
  useEffect(() => {
    document.body.style.overflowY = ready ? "" : "hidden";
    return () => { document.body.style.overflowY = ""; };
  }, [ready]);

  const inStatic = canvasOpacity < 0.05;

  return (
    <>
      {!ready && <LoadingScreen onComplete={handleLoaded} />}

      {/* ── ANIMATION ZONE: 100vh tall inner scroll container ──────────────
           scroll-snap-type:y mandatory lives HERE, not on html/body.
           5 × 100vh sections snap beat-by-beat. When user scrolls past
           the last section the scroll bubbles to the page body, revealing
           the static content below.                                       ── */}
      <div
        id="anim-zone"
        ref={animRef}
        style={{
          height: "100vh",
          overflowY: ready ? "scroll" : "hidden",
          overflowX: "hidden",
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none", // Firefox
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: "100vh",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              background: "transparent",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* ── STATIC SECTIONS: sit naturally below animation zone ─────────── */}
      {ready && <StaticSections />}

      {/* ── FIXED CANVAS ─────────────────────────────────────────────────── */}
      <animated.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          opacity: canvasOpacity,
          filter: sp.to((v) => `brightness(${brightness(v)})`),
          pointerEvents: "none",
          transition: "opacity 0.06s linear",
        }}
      >
        {ready && frames.length > 0 && <CanvasShell sp={sp} frames={frames} />}
      </animated.div>

      {/* ── VIGNETTE ─────────────────────────────────────────────────────── */}
      {!inStatic && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.65) 100%)",
          pointerEvents: "none",
          opacity: canvasOpacity,
          transition: "opacity 0.06s linear",
        }} />
      )}

      {/* ── SCROLL HINT ──────────────────────────────────────────────────── */}
      {!inStatic && (
        <animated.div style={{
          position: "fixed", bottom: 36, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          pointerEvents: "none",
          opacity: sp.to((v) => Math.max(0, 1 - v / 0.04) * canvasOpacity),
        }}>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 9, letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.4)", textTransform: "uppercase", margin: 0,
          }}>SCROLL TO INITIATE</p>
          <div style={{
            width: 1, height: 36,
            background: "linear-gradient(to bottom, rgba(229,160,13,0.7), transparent)",
            animation: "scrollPulse 1.8s ease-in-out infinite",
          }} />
        </animated.div>
      )}

      {/* ── HUD ──────────────────────────────────────────────────────────── */}
      {!inStatic && (
        <animated.div style={{
          position: "fixed", top: 32, left: 40, zIndex: 20,
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(229,160,13,0.45)", pointerEvents: "none",
          opacity: sp.to((v) => v > 0.04 ? 1 : 0),
        }}>
          {BEATS.map((b) => (
            <animated.span key={b.id} style={{
              display: "block", marginBottom: 4,
              opacity: sp.to((v) => beatOpacity(v, b.scrollStart, b.scrollEnd) > 0.3 ? 1 : 0.15),
            }}>
              {b.label}
            </animated.span>
          ))}
        </animated.div>
      )}

      {/* ── BEAT TEXT OVERLAYS ───────────────────────────────────────────── */}
      {!inStatic && BEATS.map((beat) => (
        <animated.div
          key={beat.id}
          style={{
            position: "fixed", inset: 0, zIndex: 10,
            display: "flex", flexDirection: "column",
            justifyContent: beat.id === "singularity" ? "center" : "flex-end",
            alignItems:
              beat.align === "left" ? "flex-start" :
                beat.align === "right" ? "flex-end" : "center",
            padding: beat.id === "singularity" ? "0 48px" : "0 64px 9vh",
            pointerEvents: "none",
            opacity: sp.to((v) => beatOpacity(v, beat.scrollStart, beat.scrollEnd)),
            transform: sp.to((v) => `translateY(${beatY(v, beat.scrollStart, beat.scrollEnd)}px)`),
          }}
        >
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase",
            color: "rgba(59,130,246,0.85)", margin: 0, marginBottom: 14, textAlign: beat.align,
          }}>{beat.label}</p>

          <h1 style={{
            fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 900,
            fontSize: "clamp(44px, 7.5vw, 104px)", lineHeight: 0.92,
            letterSpacing: "-0.04em", color: "#ffffff", whiteSpace: "pre-line",
            textAlign: beat.align, margin: 0, marginBottom: 20,
            textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 60px rgba(229,160,13,0.2)",
          }}>{beat.title}</h1>

          <div style={{
            width: beat.id === "singularity" ? 100 : 56, height: 1,
            background: "linear-gradient(90deg, #e5a00d, #3b82f6 60%, transparent)",
            marginBottom: 20,
            alignSelf:
              beat.align === "center" ? "center" :
                beat.align === "left" ? "flex-start" : "flex-end",
          }} />

          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300,
            fontSize: "clamp(14px, 1.6vw, 19px)", lineHeight: 1.6,
            color: "rgba(255,255,255,0.72)", whiteSpace: "pre-line",
            textAlign: beat.align, margin: 0, marginBottom: beat.detail ? 12 : 0,
            maxWidth: 500, textShadow: "0 1px 20px rgba(0,0,0,0.9)",
          }}>{beat.subtitle}</p>

          {beat.detail && (
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "clamp(10px, 1vw, 12px)", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(229,160,13,0.65)",
              textAlign: beat.align, margin: 0, textShadow: "0 1px 20px rgba(0,0,0,0.9)",
            }}>{beat.detail}</p>
          )}

          {beat.cta && (
            <div style={{
              marginTop: 36, display: "flex",
              justifyContent: beat.align === "center" ? "center" : "flex-start",
              pointerEvents: "auto",
            }}>
              <a
                href="mailto:harshsuryawanshi@icloud.com"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 14,
                  padding: "14px 38px",
                  border: "1px solid rgba(229,160,13,0.5)", borderRadius: 2,
                  background: "linear-gradient(135deg,rgba(229,160,13,0.07),rgba(59,130,246,0.05))",
                  backdropFilter: "blur(8px)", color: "#e5a00d",
                  fontFamily: "'Inter',system-ui,sans-serif",
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.22em",
                  textDecoration: "none", textTransform: "uppercase", cursor: "pointer",
                  transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "linear-gradient(135deg,rgba(229,160,13,0.18),rgba(59,130,246,0.1))";
                  el.style.borderColor = "rgba(229,160,13,0.9)";
                  el.style.boxShadow = "0 0 24px rgba(229,160,13,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "linear-gradient(135deg,rgba(229,160,13,0.07),rgba(59,130,246,0.05))";
                  el.style.borderColor = "rgba(229,160,13,0.5)";
                  el.style.boxShadow = "none";
                }}
              >
                <span style={{
                  width: 6, height: 6, background: "#e5a00d", borderRadius: "50%",
                  animation: "ctaPulse 1.4s ease-in-out infinite", flexShrink: 0,
                }} />
                {beat.cta}
              </a>
            </div>
          )}
        </animated.div>
      ))}

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      {!inStatic && (
        <animated.div style={{
          position: "fixed", bottom: 24, right: 40,
          zIndex: 20, pointerEvents: "none",
          opacity: sp.to((v) => Math.min(1, v / 0.08)),
        }}>
          <p style={{
            fontFamily: "'Inter',system-ui,sans-serif",
            fontSize: 9, letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)", textTransform: "uppercase", margin: 0,
          }}>
            Harsh Sunil Suryawanshi · VJTI Mumbai · Electronics Engineering
          </p>
        </animated.div>
      )}

      <style>{`
        #anim-zone::-webkit-scrollbar { display: none; }
        @keyframes scrollPulse {
          0%,100% { opacity:0.4; transform:scaleY(1); }
          50%      { opacity:1;   transform:scaleY(1.18); }
        }
        @keyframes ctaPulse {
          0%,100% { transform:scale(1);   opacity:1;   }
          50%      { transform:scale(1.5); opacity:0.6; }
        }
      `}</style>
    </>
  );
}
