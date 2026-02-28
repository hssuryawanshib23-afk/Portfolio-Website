"use client";

import { useEffect, useState } from "react";
import { preloadFrames, TOTAL_FRAMES } from "@/components/SolarCanvas";

interface LoadingScreenProps {
  onComplete: (frames: HTMLImageElement[]) => void;
}

const BOOT_LINES = [
  "BOOT: Solar Core v3.1.4",
  "INIT: Gravity renderer ........... OK",
  "INIT: Orbital mechanics ........... OK",
  "LOAD: Image sequence 196 frames ...",
  "SYNC: Scroll interpolation ........ OK",
  "SCAN: Consciousness engine ........ OK",
  "READY: Deploying The Harsh Protocol",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loaded, setLoaded] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    preloadFrames(({ loaded: n }) => {
      setLoaded(n);
    }).then((frames) => {
      // Small pause so the user sees 100%
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => onComplete(frames), 700);
      }, 400);
    });
  }, [onComplete]);

  const progress = Math.min(100, (loaded / TOTAL_FRAMES) * 100);
  const lineIdx = Math.min(BOOT_LINES.length - 1, Math.floor((loaded / TOTAL_FRAMES) * BOOT_LINES.length));

  return (
    <div
      aria-label="Loading"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Sun pulse */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #fff7d6, #e5a00d 45%, #7c3f00)",
          boxShadow: `0 0 ${20 + (loaded % 30)}px rgba(229,160,13,0.8), 0 0 60px rgba(229,160,13,0.3)`,
          marginBottom: 32,
        }}
      />

      {/* Title */}
      <p style={{
        color: "#e5a00d",
        fontSize: 11,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        marginBottom: 24,
        opacity: 0.9,
      }}>
        THE HARSH PROTOCOL — SYSTEM BOOT
      </p>

      {/* Terminal log */}
      <div style={{ width: 360, height: 130, overflow: "hidden", marginBottom: 32, fontFamily: "'Courier New', monospace" }}>
        {BOOT_LINES.slice(0, lineIdx + 1).map((line, i) => (
          <p key={i} style={{
            color: i === lineIdx ? "#e5a00d" : "rgba(255,255,255,0.3)",
            fontSize: 11,
            lineHeight: "20px",
            margin: 0,
          }}>
            <span style={{ color: "rgba(59,130,246,0.7)", marginRight: 8 }}>&gt;</span>
            {line}
            {i === lineIdx && (
              <span style={{
                display: "inline-block",
                width: 7, height: 13,
                background: "#e5a00d",
                marginLeft: 4,
                animation: "blink 0.8s step-end infinite",
                verticalAlign: "middle",
              }} />
            )}
          </p>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        width: 280, height: 2,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 2, overflow: "hidden", marginBottom: 12,
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #e5a00d, #3b82f6)",
          transition: "width 0.08s linear",
          boxShadow: "0 0 8px rgba(229,160,13,0.8)",
        }} />
      </div>

      {/* Counter */}
      <p style={{
        color: "rgba(255,255,255,0.3)",
        fontSize: 10,
        letterSpacing: "0.15em",
        fontFamily: "'Courier New', monospace",
      }}>
        {String(loaded).padStart(3, "0")} / {TOTAL_FRAMES} frames &nbsp;·&nbsp; {Math.round(progress)}%
      </p>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
