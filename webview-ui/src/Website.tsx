import { useState, useEffect } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import App from './App.js'

function SiteHeader() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <Link to="/" style={{
        fontSize: '18px',
        fontWeight: 700,
        color: '#fff',
        textDecoration: 'none',
        letterSpacing: '-0.02em'
      }}>
        30X
      </Link>
      <nav style={{ display: 'flex', gap: '24px' }}>
        <a href="#about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>About</a>
        <a href="#contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
      </nav>
    </header>
  )
}

function HeroOffice() {
  const [status, setStatus] = useState({ state: 'idle', detail: 'Welcome to 30X' })
  
  useEffect(() => {
    // Simulate different states for demo
    const states = [
      { state: 'idle', detail: 'Ready for your project' },
      { state: 'building', detail: 'Building something cool' },
      { state: 'researching', detail: 'Finding the best solution' },
      { state: 'idle', detail: 'Waiting for ideas' }
    ]
    let i = 0
    const interval = setInterval(() => {
      setStatus(states[i % states.length])
      i++
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      width: '100%',
      height: 'calc(100vh - 56px)',
      marginTop: '56px',
      position: 'relative',
      background: '#0a0a0f'
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '500px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 0 60px rgba(100,200,255,0.15), 0 0 120px rgba(100,200,255,0.05)'
      }}>
        <App mode="website" />
      </div>
      
      {/* Status overlay */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        padding: '12px 24px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: status.state === 'idle' ? '#4ade80' : '#60a5fa',
          animation: 'pulse 2s infinite'
        }} />
        <span style={{ color: '#fff', fontSize: '14px' }}>{status.detail}</span>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about" style={{
      padding: '80px 24px',
      background: '#0a0a0f',
      minHeight: '400px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#fff', 
          marginBottom: '24px',
          fontWeight: 600
        }}>
          We build AI-powered products
        </h2>
        <p style={{ 
          color: 'rgba(255,255,255,0.6)', 
          fontSize: '16px',
          lineHeight: 1.7
        }}>
          30X is a pixel-native product studio. We transform complex systems 
          into clear, runnable, and scalable products. Our team combines 
          design, engineering, and AI automation to ship fast.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '24px',
          marginTop: '48px'
        }}>
          {[
            { title: 'Fast', desc: 'Ship in days, not months' },
            { title: 'Smart', desc: 'AI-first architecture' },
            { title: 'Focused', desc: 'Product-led growth' }
          ].map(item => (
            <div key={item.title} style={{
              padding: '24px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" style={{
      padding: '80px 24px',
      background: '#050508',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#fff', 
          marginBottom: '16px',
          fontWeight: 600
        }}>
          Let's build something
        </h2>
        <p style={{ 
          color: 'rgba(255,255,255,0.6)', 
          fontSize: '16px',
          marginBottom: '32px'
        }}>
          Tell us about your project. We'll get back to you soon.
        </p>
        <a href="mailto:hello@30x.company" style={{
          display: 'inline-block',
          padding: '14px 32px',
          background: '#fff',
          color: '#000',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '16px'
        }}>
          hello@30x.company
        </a>
      </div>
      
      <footer style={{
        marginTop: '80px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '14px'
      }}>
        © {new Date().getFullYear()} 30X.company
      </footer>
    </section>
  )
}

export default function Website() {
  return (
    <BrowserRouter>
      <div style={{ 
        background: '#0a0a0f', 
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}>
        <SiteHeader />
        <HeroOffice />
        <AboutSection />
        <ContactSection />
      </div>
    </BrowserRouter>
  )
}
