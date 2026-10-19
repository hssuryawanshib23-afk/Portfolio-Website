import ThemeToggle from "@/components/ThemeToggle";
import Reveal from "@/components/Reveal";
import Sections from "@/components/StaticSections";

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <a href="#top" className="logo">
            harsh<span>.</span>
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#stack">Stack</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div className="hero-meta">
              <span className="chip fill">Electronics Engineer</span>
              <span className="chip">AI/ML Builder</span>
              <span className="chip">VJTI Mumbai · 19</span>
            </div>

            <h1 className="hero-title">
              <span className="line"><span>Harsh</span></span>
              <span className="line"><span>Suryawanshi</span></span>
            </h1>

            <Reveal delay={500}>
              <p className="lede">
                Transformers from scratch, a gaze tracker, RAG pipelines, voice models, a lie
                detector, portfolio optimization.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">See what I&apos;ve built ↓</a>
                <a className="btn" href="mailto:harshsuryawanshi@icloud.com">Get in touch</a>
              </div>
            </Reveal>
          </div>
        </section>

        <Sections />
      </main>
    </>
  );
}
