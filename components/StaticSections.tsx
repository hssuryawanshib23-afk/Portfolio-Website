import Reveal from "./Reveal";

// ─── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        id: "research-council",
        name: "Research Council: Multi-Agent Literature Review",
        problem: "Surface disagreement across sources instead of averaging it away.",
        description:
            "6-node LangGraph pipeline: three agents (Evidence, Skeptic, Methodology) analyze a question in parallel, cross-review each other, and a Chairman agent synthesizes a final answer across 7 sequential LLM calls per query. Hybrid retrieval in Neo4j with cosine-similarity vector search over 384-dim MiniLM embeddings; 25 arXiv papers ingested and validated by a 5-test pytest suite.",
        tags: ["Python", "LangGraph", "Neo4j", "FastAPI", "Groq"],
        github: "https://github.com/hssuryawanshib23-afk/Research-Council",
        live: null,
    },
    {
        id: "mumbai-stone",
        name: "Mumbai in Stone & Concrete",
        problem: "An accessible alternative to paid architecture walks.",
        description:
            "3D walkthrough of 28 Mumbai landmarks across multiple architectural styles, pulling real building heights from OpenStreetMap and live photos and historical context from Wikipedia.",
        tags: ["MapLibre GL", "OpenFreeMap", "Wikipedia API"],
        github: "https://github.com/hssuryawanshib23-afk/Mumbai-in-stone-concrete/tree/main",
        live: "https://mumbai-in-stone-concrete.vercel.app/",
    },
    {
        id: "meshery",
        name: "Meshery Open Source Contributions",
        problem: "Find and fix real bugs in a CNCF project.",
        description:
            "Reported a high-impact (CVSS 8.7) unauthenticated arbitrary file read in the Meshery server endpoints /api/system/fileView and /api/system/fileDownload, with reproduction steps, severity and remediation guidance. Also fixed a mesheryctl QA failure by aligning Bats e2e tests with updated CLI output (PR #18604).",
        tags: ["API Security", "Path Traversal", "Bats", "CLI Testing"],
        github: "https://github.com/meshery/meshery/issues/18375",
        live: "https://www.vulncheck.com/advisories/meshery-unauthenticated-arbitrary-file-read-via-fileview-and-filedownload",
    },
    {
        id: "braingain",
        name: "BrainGain AI Platform",
        problem: "Build an AI-powered adaptive learning system for ICSE curriculum.",
        description:
            "Shipped a production assessment engine adopted by 35+ students across 102+ tests, with randomized question selection, chapter-wise filtering, and configurable difficulty distribution. Built a Python workflow that turns ICSE textbook content into 2,500+ MCQs across 29 chapters using Generative AI, with 2,132+ questions attempted in production. Designed a JSON schema integrated with Bloom's Taxonomy and AI validation to cut manual review effort.",
        tags: ["Python", "Generative AI", "OCR", "JSON Schema", "Bloom's Taxonomy", "Assessment Engine"],
        github: "https://github.com/hssuryawanshib23-afk/braingain",
        live: "https://class-9-icse-online-test-platform.streamlit.app/",
    },
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
        name: "DocuMind: RAG-based Document Q&A",
        problem: "Make a dense annual report queryable with grounded answers.",
        description:
            "Full-stack document Q&A chatbot for Swiggy's annual report. Hybrid pdfplumber + PyMuPDF + Tesseract OCR pipeline handles digital and scanned pages; TF-IDF embeddings in FAISS with a dual-LLM fallback (Gemini & Groq) reach 98% source-citation accuracy at 1.02s average response time.",
        tags: ["LangChain", "FastAPI", "FAISS", "OCR", "RAG"],
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
    "LangChain", "OpenCV", "FastAPI",
    "Next.js", "React", "TypeScript", "Linux",
    "Verilog", "Git", "Docker", "Kubernetes",
    "OCR", "Bloom's Taxonomy", "FAISS",
    "LangGraph", "Neo4j", "Scikit-learn", "Pandas",
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[number]; index: number }) {
    return (
        <Reveal delay={(index % 3) * 90}>
            <article className="card">
                <span className="card-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{p.name}</h3>
                <p className="problem">{p.problem}</p>
                <p className="desc">{p.description}</p>
                <div className="tags">
                    {p.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                    ))}
                </div>
                <div className="card-links">
                    <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                    {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer">Live ↗</a>
                    )}
                </div>
            </article>
        </Reveal>
    );
}

const CONTACT = [
    { label: "Email", href: "mailto:hssuryawanshi_b23@el.vjti.ac.in", text: "hssuryawanshi_b23@el.vjti.ac.in" },
    { label: "GitHub", href: "https://github.com/hssuryawanshib23-afk", text: "hssuryawanshib23-afk" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-suryawanshi-206922265/", text: "linkedin.com" },
    { label: "Blog", href: "/blog", text: "Read learnings" },
];

// ─── Main export ──────────────────────────────────────────────────────────────

export default function StaticSections() {
    return (
        <>
            {/* ── INTERESTS + BUILDS ───────────────────────────────────────── */}
            <section className="section" style={{ borderTop: "none", paddingTop: 0 }}>
                <div className="wrap two-col">
                    <Reveal>
                        <div className="note">
                            <p className="eyebrow">Interests</p>
                            <h3>Roots</h3>
                            <p>
                                Love VLSI and Control Systems (studying them as part of academics) :){"\n"}
                                Obsessed with open source, DeepTech, exploring &amp; extending research.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <div className="note">
                            <p className="eyebrow">What I&apos;ve built</p>
                            <h3>Build highlights</h3>
                            <p>
                                Transformers from scratch. A GazeTracker from scratch. RAG pipelines.{"\n"}
                                Voice models. Lie detector. Portfolio Optimization…
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── ABOUT ────────────────────────────────────────────────────── */}
            <section className="section" id="about">
                <div className="wrap two-col">
                    <Reveal>
                        <p className="eyebrow">About</p>
                        <h2 className="h2">
                            About <span className="accent">me</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={120}>
                        <div className="about-body">
                            <p>
                                Electronics Engineering student at VJTI Mumbai. I build systems that bridge the gap between theory and real-world impact.
                            </p>
                            <p>
                                Currently focused on AI-powered product development and multi-agent systems. Previously an AI &amp; Product Development Intern at BrainGain, where I shipped an assessment engine used by 35+ students and a 2,500+ question bank. Open-source contributor to Meshery, and an Allianz Tech Championship 2025 finalist.
                            </p>
                            <a className="btn" href="/resume.pdf" download="Harsh_Suryawanshi_Resume.pdf">
                                <span aria-hidden>↓</span> Download Résumé
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── PROJECTS ─────────────────────────────────────────────────── */}
            <section className="section" id="projects">
                <div className="wrap">
                    <Reveal className="section-head">
                        <p className="eyebrow">Projects</p>
                        <h2 className="h2">Selected <span className="accent">projects</span></h2>
                    </Reveal>
                    <div className="grid">
                        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
                    </div>
                </div>
            </section>

            {/* ── STACK ────────────────────────────────────────────────────── */}
            <section className="section" id="stack">
                <div className="wrap">
                    <Reveal className="section-head">
                        <p className="eyebrow">Stack</p>
                        <h2 className="h2">Tech <span className="accent">stack</span></h2>
                    </Reveal>
                    <Reveal delay={100}>
                        <div className="stack">
                            {STACK.map((s) => <span key={s}>{s}</span>)}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CONTACT ──────────────────────────────────────────────────── */}
            <section className="section" id="contact">
                <div className="wrap">
                    <div className="contact">
                        <Reveal>
                            <p className="eyebrow">Contact</p>
                            <h2 className="h2">
                                Get in <span className="accent">touch</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={120}>
                            <ul className="contact-links">
                                {CONTACT.map(({ label, href, text }) => {
                                    const external = href.startsWith("http") || href.startsWith("mailto:");
                                    return (
                                        <li key={label}>
                                            <a
                                                href={href}
                                                target={external ? "_blank" : undefined}
                                                rel={external ? "noopener noreferrer" : undefined}
                                            >
                                                <span className="k">{label}</span>
                                                <span className="v">{text}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Reveal>
                    </div>

                    <div className="footer">
                        <span>© 2026 Harsh Sunil Suryawanshi</span>
                        <span>Built in Next.js · VJTI Mumbai</span>
                    </div>
                </div>
            </section>
        </>
    );
}
