import { useState } from 'react'
import App from './App.js'

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-wrap">
        <div className="site-header-inner">
          <a href="/" className="site-logo">30X</a>
          <button
            className="site-menu-btn"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '×' : '☰'}
          </button>
          <nav className={`site-nav${menuOpen ? ' site-nav-open' : ''}`}>
            <a href="#about" className="site-nav-link" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#work" className="site-nav-link" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#contact" className="site-nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section>
      <div className="site-wrap">
        <div className="hero-copy">
          <p className="eyebrow">Product Studio</p>
          <h1>Build products<br />without the noise.</h1>
          <p className="hero-subtitle">
            We turn complex ideas into focused, shipped products.
            Design, engineering, and AI — under one roof.
          </p>
          <div className="hero-actions">
            <a href="#work" className="site-btn site-btn-primary">See our work</a>
            <a href="#contact" className="site-btn site-btn-secondary">Get in touch</a>
          </div>
        </div>
      </div>
      <div className="office-stage">
        <App mode="website" />
      </div>
    </section>
  )
}

function WorkSection() {
  return (
    <section id="work" className="site-section">
      <div className="site-wrap">
        <p className="eyebrow">What we do</p>
        <h2>From idea to production.</h2>
        <p>
          We work with founders and teams to ship products fast.
          No bureaucracy, no bloated timelines — just clear execution.
        </p>
        <div className="feature-grid">
          {[
            { title: 'Strategy', desc: 'Product direction, positioning, and roadmap planning.' },
            { title: 'Design', desc: 'UI/UX, design systems, and interaction design.' },
            { title: 'Engineering', desc: 'Full-stack web and mobile development.' },
            { title: 'AI Integration', desc: 'LLM-powered features and workflow automation.' },
          ].map(item => (
            <div key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="site-section">
      <div className="site-wrap">
        <p className="eyebrow">About</p>
        <h2>Small team. Focused output.</h2>
        <p>
          30X is a lean product studio. We take on a handful of projects at a time
          so every client gets real attention. We believe the best products come
          from clear thinking and relentless execution — not large teams.
        </p>
        <div className="feature-grid" style={{ marginTop: '40px' }}>
          {[
            { title: 'Fast', desc: 'Ship in weeks, not quarters.' },
            { title: 'Direct', desc: 'You talk to the people building it.' },
            { title: 'Focused', desc: 'One project at a time gets our full attention.' },
          ].map(item => (
            <div key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="site-section">
      <div className="site-wrap">
        <p className="eyebrow">Contact</p>
        <h2>Let's talk.</h2>
        <p>
          Have a project in mind? Tell us what you're building.
          We'll get back to you within a day or two.
        </p>
        <div className="contact-grid" style={{ marginTop: '40px' }}>
          <div className="contact-item">
            <h3>Email</h3>
            <p>hello@30x.company</p>
          </div>
          <div className="contact-item">
            <h3>Based in</h3>
            <p>San Francisco, CA</p>
          </div>
          <div className="contact-item">
            <h3>Working with</h3>
            <p>Founders &amp; early-stage teams</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-wrap">
        &copy; {new Date().getFullYear()} 30X.company
      </div>
    </footer>
  )
}

export default function Website() {
  return (
    <div>
      <SiteHeader />
      <main className="site-main">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
