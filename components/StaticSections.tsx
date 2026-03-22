"use client";

// ─── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        id: "transformers",
        name: "Transformer from Scratch",
        problem: "Understand attention without PyTorch hand-holding.",
        description:
            "Full transformer (encoder + decoder) in pure Python/NumPy. Multi-head self-attention, positional encoding, layer norm — every tensor by hand. No torch.nn, no abstraction.",
        tags: ["Python", "NumPy", "NLP", "Attention"],
        github: "https://gitlab.com/hssuryawanshi/transformer-from-scratch",
        live: null,
    },
    {
        id: "rag",
        name: "Labour Law Advisor",
        problem: "Make complex Indian labour law searchable and answerable in plain English.",
        description:
            "RAG pipeline over the Indian Labour Code. PDF ingestion → chunking → vector index → LLM context injection. Deployed on Streamlit. Ask any labour law question, get cited answers.",
        tags: ["Python", "LangChain", "FAISS", "LLMs", "Streamlit"],
        github: "https://github.com/hssuryawanshib23-afk/LLA",
        live: "https://labour-law-advisior.streamlit.app/",
    },
    {
        id: "insurance",
        name: "InsureWise — Rural Insurance Assistant",
        problem: "Make insurance legible for 800 million people.",
        description:
            "Conversational AI for India's unbanked. Voice input → intent extraction → policy recommendation → explanations. PWA-first, Hindi-capable, RAG-backed. Built for a Tech Championship.",
        tags: ["Next.js", "RAG", "PWA", "Voice", "Hindi NLP"],
        github: "https://github.com/hssuryawanshib23-afk/orchids-insurewise-pwa-prototype",
        live: "https://insurewise-pwa-prototype.vercel.app/",
    },
    {
        id: "swiggy-rag",
        name: "Swiggy's Financial Report (FY - 23-24) RAG Pipeline",
        problem: "Make every number and knowledge queryable with grounded answers.",
        description:
            "RAG application for Swiggy-style data exploration. Retrieval over indexed content plus LLM answer generation with context-aware responses. Deployed as an interactive Hugging Face Space.",
        tags: ["Python", "RAG", "LLMs", "Hugging Face", "Vector Search"],
        github: "https://github.com/hssuryawanshib23-afk/Swiggy-s_RAG_pipeline",
        live: "https://huggingface.co/spaces/Harsh2806/swiggy-rag",
    },
    {
        id: "forced-ending",
        name: "Forced Ending",
        problem: "Enforce a finite session on infinite-scroll sites.",
        description:
            "Chrome MV3 extension. Set a goal (3/5/10 videos or posts), get locked out when you hit it, write a short reflection before losing access. Survives refresh. Works on YouTube, Instagram, X.",
        tags: ["Chrome Extension", "MV3", "JavaScript", "DOM"],
        github: "https://github.com/hssuryawanshib23-afk/Finish",
        live: null,
    },
    {
        id: "portfolio-opt",
        name: "Portfolio Optimization",
        problem: "Beat a static Nifty 50 allocation using actual quant methods.",
        description:
            "Markowitz mean-variance + ML momentum overlay on Indian equities. Live data ingestion, backtest harness, Sharpe-ratio-optimized weights.",
        tags: ["Python", "NumPy", "Quant Finance", "ML"],
        github: "https://github.com/hssuryawanshib23-afk",
        live: null,
    },
    {
        id: "lie-detector",
        name: "Lie Detector",
        problem: "Can micro-expressions betray deception in real-time video?",
        description:
            "Real-time facial landmark tracking + physiological proxy signals. OpenCV + MediaPipe pipeline. Trained on CK+ dataset, deployed as a live webcam demo.",
        tags: ["Python", "OpenCV", "MediaPipe", "CV"],
        github: "https://github.com/hssuryawanshib23-afk",
        live: null,
    },
    {
        id: "distillation",
        name: "AI Surrogate for Distillation Column",
        problem: "Replace expensive CHEM simulations with ML models that predict in <1ms.",
        description:
            "4 ML surrogates (Polynomial, Random Forest, XGBoost, ANN) for ethanol-water distillation. 500-point Latin Hypercube dataset. Champion: Polynomial at 99.48% accuracy. Includes energy optimization — 15–25% reboiler duty reduction.",
        tags: ["Python", "XGBoost", "Sklearn", "ChemEng", "Optimization"],
        github: "https://github.com/hssuryawanshib23-afk/AI-Distillation-Surrogate",
        live: null,
    },
];

const STACK = [
    "Python", "Java", "PyTorch", "NumPy",
    "LangChain", "OpenCV",
    "Next.js", "React", "TypeScript", "Linux",
    "Verilog", "Git",
];

// ─── Shared token ─────────────────────────────────────────────────────────────
const GOLD = "#e5a00d";
const BLUE = "#3b82f6";
const F = "'Inter', system-ui, sans-serif";

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
    return (
        <p style={{
            fontFamily: F, fontSize: 10, letterSpacing: "0.32em",
            textTransform: "uppercase", color: `rgba(${hexToRgb(GOLD)},0.6)`,
            margin: "0 0 16px",
        }}>
            {children}
        </p>
    );
}

function Divider() {
    return (
        <div style={{
            width: "100%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
            margin: "80px 0",
        }} />
    );
}

function ProjectCard({ p }: { p: typeof PROJECTS[number] }) {
    return (
        <article
            style={{
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 4,
                padding: "28px 28px 22px",
                background: "rgba(255,255,255,0.02)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s",
                cursor: "default",
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `rgba(${hexToRgb(GOLD)},0.35)`;
                el.style.boxShadow = `0 0 32px rgba(${hexToRgb(GOLD)},0.06)`;
                el.style.background = "rgba(229,160,13,0.03)";
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.02)";
            }}
        >
            {/* Problem pill */}
            <p style={{
                fontFamily: F, fontSize: 10, letterSpacing: "0.15em",
                textTransform: "uppercase", color: `rgba(${hexToRgb(BLUE)},0.8)`,
                margin: 0,
            }}>
                {p.problem}
            </p>

            {/* Title */}
            <h3 style={{
                fontFamily: F, fontWeight: 700, fontSize: "clamp(18px,2vw,22px)",
                color: "#fff", margin: 0, letterSpacing: "-0.02em",
            }}>
                {p.name}
            </h3>

            {/* Description */}
            <p style={{
                fontFamily: F, fontWeight: 300, fontSize: 14, lineHeight: 1.65,
                color: "rgba(255,255,255,0.55)", margin: 0, flexGrow: 1,
            }}>
                {p.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {p.tags.map((t) => (
                    <span key={t} style={{
                        fontFamily: F, fontSize: 10, letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 2, padding: "3px 8px",
                    }}>
                        {t}
                    </span>
                ))}
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
                >
                    GitHub ↗
                </a>
                {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                        style={linkStyle}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
                    >
                        Live ↗
                    </a>
                )}
            </div>
        </article>
    );
}

const linkStyle: React.CSSProperties = {
    fontFamily: F, fontSize: 11, letterSpacing: "0.12em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
    textDecoration: "none", transition: "color 0.2s",
};

// ─── Main export ──────────────────────────────────────────────────────────────

export default function StaticSections() {
    return (
        <section
            style={{
                position: "relative",
                zIndex: 50,
                background: "#050505",
                paddingBottom: 100,
            }}
        >
            {/* Fade-in gradient from transparent (so canvas fades naturally) */}
            <div style={{
                height: 120,
                background: "linear-gradient(to bottom, transparent, #050505)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

                {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
                <div style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 400px" }}>
                        <SectionLabel>About</SectionLabel>
                        <h2 style={{
                            fontFamily: F, fontWeight: 800,
                            fontSize: "clamp(28px,3.5vw,42px)",
                            letterSpacing: "-0.03em", color: "#fff",
                            lineHeight: 1.1, margin: "0 0 24px",
                        }}>
                            I build things<br />
                            <span style={{ color: GOLD }}>that shouldn't work</span><br />
                            until they do.
                        </h2>
                        <p style={{
                            fontFamily: F, fontWeight: 300, fontSize: 16,
                            lineHeight: 1.8, color: "rgba(255,255,255,0.6)",
                            margin: "0 0 16px", maxWidth: 480,
                        }}>
                            I'am a third year Electronics Engineering student at VJTI Mumbai. I got
                            bored of textbooks, so I started building: Each one
                            taught me something a lecture couldn't.
                        </p>
                        <p style={{
                            fontFamily: F, fontWeight: 300, fontSize: 16,
                            lineHeight: 1.8, color: "rgba(255,255,255,0.6)",
                            margin: "0 0 32px", maxWidth: 480,
                        }}>
                            Currently: obsessed with how large systems fail at scale, and
                            building the infrastructure that catches them before they do. Also freelancing for a VJTI alum on production-grade application.
                        </p>

                        {/* Resume button */}
                        <a
                            href="https://drive.google.com/file/d/1P6cfXdURuVZL8AXsOoDIHoLvx-AXHj6d/view?usp=sharing"
                            download
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 10,
                                padding: "12px 28px",
                                border: `1px solid rgba(${hexToRgb(GOLD)},0.4)`,
                                borderRadius: 2,
                                background: `rgba(${hexToRgb(GOLD)},0.06)`,
                                color: GOLD,
                                fontFamily: F, fontSize: 11, fontWeight: 600,
                                letterSpacing: "0.2em", textTransform: "uppercase",
                                textDecoration: "none",
                                transition: "all 0.25s",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = `rgba(${hexToRgb(GOLD)},0.14)`;
                                el.style.borderColor = GOLD;
                                el.style.boxShadow = `0 0 20px rgba(${hexToRgb(GOLD)},0.2)`;
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = `rgba(${hexToRgb(GOLD)},0.06)`;
                                el.style.borderColor = `rgba(${hexToRgb(GOLD)},0.4)`;
                                el.style.boxShadow = "none";
                            }}
                        >
                            <span style={{ fontSize: 14 }}>↓</span>
                            Download Résumé
                        </a>
                    </div>
                </div>

                <Divider />

                {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
                <SectionLabel>Projects</SectionLabel>
                <h2 style={{
                    fontFamily: F, fontWeight: 800,
                    fontSize: "clamp(28px,3.5vw,42px)",
                    letterSpacing: "-0.03em", color: "#fff",
                    margin: "0 0 48px",
                }}>
                    Some of the things I've built
                </h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: 20,
                }}>
                    {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
                </div>

                <Divider />

                {/* ── STACK ─────────────────────────────────────────────────────────── */}
                <SectionLabel>Stack</SectionLabel>
                <h2 style={{
                    fontFamily: F, fontWeight: 800,
                    fontSize: "clamp(28px,3.5vw,42px)",
                    letterSpacing: "-0.03em", color: "#fff",
                    margin: "0 0 36px",
                }}>
                    Tools I reach for
                </h2>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {STACK.map((s) => (
                        <span key={s} style={{
                            fontFamily: F, fontSize: 12, fontWeight: 500,
                            letterSpacing: "0.06em",
                            color: "rgba(255,255,255,0.7)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 3, padding: "8px 16px",
                            background: "rgba(255,255,255,0.02)",
                            transition: "all 0.2s",
                            cursor: "default",
                        }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = `rgba(${hexToRgb(BLUE)},0.5)`;
                                el.style.color = "#fff";
                                el.style.background = `rgba(${hexToRgb(BLUE)},0.06)`;
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = "rgba(255,255,255,0.1)";
                                el.style.color = "rgba(255,255,255,0.7)";
                                el.style.background = "rgba(255,255,255,0.02)";
                            }}
                        >
                            {s}
                        </span>
                    ))}
                </div>

                <Divider />

                {/* ── CONTACT ───────────────────────────────────────────────────────── */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 40 }}>
                    <div>
                        <SectionLabel>Contact</SectionLabel>
                        <h2 style={{
                            fontFamily: F, fontWeight: 800,
                            fontSize: "clamp(28px,3.5vw,48px)",
                            letterSpacing: "-0.03em", color: "#fff",
                            margin: "0 0 8px", lineHeight: 1.05,
                        }}>
                            Let's work on<br />
                            <span style={{ color: GOLD }}>something real.</span>
                        </h2>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 8 }}>
                        {[
                            { label: "Email", href: "mailto:hssuryawanshi_b23@el.vjti.ac.in", text: "hssuryawanshi_b23@el.vjti.ac.in" },
                            { label: "GitHub", href: "https://github.com/hssuryawanshib23-afk", text: "Github" },
                            { label: "Blog", href: "/blog", text: "Read learnings" },
                            { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-suryawanshi-206922265/", text: "linkedin.com" },
                        ].map(({ label, href, text }) => (
                            <a key={label} href={href} target={href.startsWith("http") || href.startsWith("mailto:") ? "_blank" : undefined} rel={href.startsWith("http") || href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
                                style={{
                                    display: "flex", alignItems: "center", gap: 16,
                                    textDecoration: "none",
                                    transition: "opacity 0.2s",
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                            >
                                <span style={{
                                    fontFamily: F, fontSize: 9, letterSpacing: "0.2em",
                                    textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
                                    width: 56, flexShrink: 0,
                                }}>
                                    {label}
                                </span>
                                <span style={{
                                    fontFamily: F, fontSize: 14, fontWeight: 400,
                                    color: "rgba(255,255,255,0.7)",
                                }}>
                                    {text}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Footer line */}
                <div style={{
                    marginTop: 80,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                }}>
                    <p style={{
                        fontFamily: F, fontSize: 10, letterSpacing: "0.15em",
                        textTransform: "uppercase", color: "rgba(255,255,255,0.18)", margin: 0,
                    }}>
                        © 2026 Harsh Sunil Suryawanshi
                    </p>
                    <p style={{
                        fontFamily: F, fontSize: 10, letterSpacing: "0.15em",
                        textTransform: "uppercase", color: "rgba(255,255,255,0.18)", margin: 0,
                    }}>
                        Built in Next.js · VJTI Mumbai
                    </p>
                </div>

            </div>
        </section>
    );
}

// ─── Util ─────────────────────────────────────────────────────────────────────
function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
}
