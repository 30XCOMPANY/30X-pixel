import { useState, useEffect } from 'react'
import App from './App.js'

/* ─── Header ─────────────────────────────────────────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-6)',
      background: scrolled ? 'rgba(250,250,248,0.9)' : 'rgba(250,250,248,0)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
      transition: `all var(--duration-base) var(--ease-out)`,
      zIndex: 100,
    }}>
      <span style={{
        fontSize: 'var(--font-size-sm)',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text)',
      }}>
        30X
      </span>
      <nav style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}>
        {['About', 'Services', 'Contact'].map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-muted)',
              transition: `color var(--duration-fast) ease`,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

function HeroOffice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: `opacity 600ms var(--ease-out), transform 600ms var(--ease-out)`,
    }}>
      {/* Grayscale pixel office container */}
      <div style={{
        width: '100%',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: '#1a1a1a',
        filter: 'grayscale(1) contrast(1.05)',
        boxShadow: '0 2px 40px rgba(0,0,0,0.06)',
      }}>
        {/* Traffic lights */}
        <div style={{
          height: '32px',
          background: '#1a1a1a',
          borderBottom: '1px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--space-4)',
          gap: 'var(--space-2)',
        }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
            <div key={i} style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: c,
              opacity: 0.7,
            }} />
          ))}
        </div>
        <App mode="website" />
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: 'var(--header-height)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="container" style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-16)',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-light)',
          opacity: 0,
          animation: 'fadeUp 500ms 100ms var(--ease-out) forwards',
        }}>
          Pixel-native product studio
        </p>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.035em',
          textAlign: 'center',
          color: 'var(--text)',
          maxWidth: '820px',
          opacity: 0,
          animation: 'fadeUp 600ms 200ms var(--ease-out) forwards',
        }}>
          We build products<br />that feel right.
        </h1>

        {/* Subline */}
        <p style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--text-muted)',
          textAlign: 'center',
          maxWidth: '480px',
          lineHeight: 1.6,
          fontWeight: 400,
          opacity: 0,
          animation: 'fadeUp 600ms 300ms var(--ease-out) forwards',
        }}>
          Design, engineering, and AI automation — delivered at the speed of thought.
        </p>

        {/* CTA */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          opacity: 0,
          animation: 'fadeUp 600ms 400ms var(--ease-out) forwards',
        }}>
          <a
            href="#contact"
            style={{
              padding: '12px 24px',
              background: 'var(--text)',
              color: 'var(--white)',
              borderRadius: '4px',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              letterSpacing: '0.01em',
              transition: `all var(--duration-base) var(--ease-out)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#333'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--text)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Start a project
          </a>
          <a
            href="#services"
            style={{
              padding: '12px 24px',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: '4px',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              background: 'transparent',
              transition: `all var(--duration-base) var(--ease-out)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            Our work
          </a>
        </div>

        {/* Office preview */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          opacity: 0,
          animation: 'fadeUp 700ms 500ms var(--ease-out) forwards',
        }}>
          <HeroOffice />
        </div>
      </div>
    </section>
  )
}

/* ─── Divider ─────────────────────────────────────────────────────────────── */

function SectionDivider() {
  return (
    <div style={{
      height: '1px',
      background: 'var(--border-light)',
      margin: '0 auto',
      maxWidth: '120px',
    }} />
  )
}

/* ─── About ───────────────────────────────────────────────────────────────── */

const aboutItems = [
  {
    number: '01',
    title: 'Pixel-native thinking',
    body: 'We start every project with pixel-level attention to detail. The small decisions compound into products that feel unmistakably crafted.',
  },
  {
    number: '02',
    title: 'Speed without sacrifice',
    body: 'Modern tooling and AI acceleration means we ship in days, not quarters — without trading quality for velocity.',
  },
  {
    number: '03',
    title: 'Human-centered systems',
    body: 'We build for real people. Complex workflows become invisible, friction dissolves, and the result is software people actually enjoy using.',
  },
]

function AboutSection() {
  return (
    <section id="about" style={{
      padding: 'var(--space-24) 0',
      background: 'var(--bg)',
    }}>
      <div className="container">
        {/* Section label */}
        <p style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-light)',
          marginBottom: 'var(--space-12)',
        }}>
          How we work
        </p>

        {/* Section headline */}
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 600,
          letterSpacing: '-0.025em',
          color: 'var(--text)',
          marginBottom: 'var(--space-16)',
          maxWidth: '560px',
          lineHeight: 1.15,
        }}>
          Products that respect your time
        </h2>

        <SectionDivider />

        {/* Three columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-10)',
          marginTop: 'var(--space-12)',
        }}>
          {aboutItems.map(item => (
            <div key={item.number}>
              <p style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--text-light)',
                fontWeight: 500,
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-3)',
              }}>
                {item.number}
              </p>
              <h3 style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: 'var(--space-2)',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Services ────────────────────────────────────────────────────────────── */

const services = [
  {
    title: 'Product Strategy',
    desc: 'From zero to product-market fit. We help you define what to build and why.',
    tags: ['Positioning', 'Roadmapping', 'User Research'],
  },
  {
    title: 'Design Systems',
    desc: 'Cohesive, scalable design languages that keep your product consistent as it grows.',
    tags: ['Component Libraries', 'Tokens', 'Documentation'],
  },
  {
    title: 'Full-Stack Engineering',
    desc: 'React, Node, AI integrations — we ship production-ready code, fast.',
    tags: ['Frontend', 'Backend', 'AI/ML'],
  },
  {
    title: 'Growth & Analytics',
    desc: 'Instrument everything. Understand what works and double down.',
    tags: ['Analytics', 'A/B Testing', 'Optimization'],
  },
]

function ServicesSection() {
  return (
    <section id="services" style={{
      padding: 'var(--space-24) 0',
      background: 'var(--bg-alt)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div className="container">
        <p style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-light)',
          marginBottom: 'var(--space-12)',
        }}>
          What we do
        </p>

        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 600,
          letterSpacing: '-0.025em',
          color: 'var(--text)',
          marginBottom: 'var(--space-16)',
          maxWidth: '560px',
          lineHeight: 1.15,
        }}>
          End-to-end product development
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}>
          {services.map((s, i) => (
            <div
              key={i}
              style={{
                padding: 'var(--space-8)',
                background: 'var(--bg-alt)',
                transition: `background var(--duration-fast) ease`,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-alt)')}
            >
              <h3 style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: 'var(--space-2)',
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginBottom: 'var(--space-4)',
              }}>
                {s.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--text-light)',
                    padding: '2px 8px',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact ─────────────────────────────────────────────────────────────── */

function ContactSection() {
  return (
    <section id="contact" style={{
      padding: 'var(--space-24) 0',
      background: 'var(--bg)',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-light)',
          marginBottom: 'var(--space-6)',
        }}>
          Get in touch
        </p>

        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: 'var(--space-4)',
          lineHeight: 1.1,
        }}>
          Have a project in mind?
        </h2>

        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--text-muted)',
          marginBottom: 'var(--space-10)',
          maxWidth: '400px',
          margin: '0 auto var(--space-10)',
        }}>
          Tell us what you're building. We'll get back to you within 24 hours.
        </p>

        <a
          href="mailto:hello@30x.company"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'var(--text)',
            color: 'var(--white)',
            borderRadius: '4px',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 500,
            letterSpacing: '0.01em',
            transition: `all var(--duration-base) var(--ease-out)`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#333'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--text)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          hello@30x.company
        </a>

        {/* Footer */}
        <footer style={{
          marginTop: 'var(--space-20)',
          paddingTop: 'var(--space-8)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-light)',
        }}>
          <span>© {new Date().getFullYear()} 30X.company</span>
          <span>Pixel-native product studio</span>
        </footer>
      </div>
    </section>
  )
}

/* ─── Root ────────────────────────────────────────────────────────────────── */

export default function Website() {
  return (
    <div style={{
      background: 'var(--bg)',
      minHeight: '100vh',
      fontFamily: 'var(--font)',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  )
}
