import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

interface NavLinkItem {
  to: string
  label: string
}

const navLinks: NavLinkItem[] = [
  { to: '/properties', label: 'Properties' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.5s ease',
        background: scrolled ? 'rgba(22, 32, 51, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ width: '42px', height: '42px', background: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#0f1f3d', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em' }}>PRG</span>
            </div>
            <div>
              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc', fontSize: '18px', lineHeight: 1.2, margin: 0 }}>
                Prestige Realty Group
              </p>
              <p style={{ color: '#94a3b8', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
                Luxury Property Specialists
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  fontSize: '14px',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  color: isActive ? '#c9a84c' : '#f8fafc',
                  transition: 'color 0.2s',
                  paddingBottom: '4px',
                  borderBottom: isActive ? '1px solid #c9a84c' : '1px solid transparent',
                })}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  if (!el.getAttribute('aria-current')) {
                    el.style.color = '#c9a84c'
                    el.style.borderBottom = '1px solid #c9a84c'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  if (!el.getAttribute('aria-current')) {
                    el.style.color = '#f8fafc'
                    el.style.borderBottom = '1px solid transparent'
                  }
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+15551234567"
              style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
            >
              +1 (555) 123-4567
            </a>
            <Link
              to="/contact"
              style={{
                background: '#c9a84c',
                color: '#0f1f3d',
                fontSize: '13px',
                fontWeight: 600,
                padding: '10px 20px',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#e6c97e' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#c9a84c' }}
            >
              Schedule a Viewing
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '40px',
              height: '40px',
              padding: 0,
            }}
          >
            <span style={{
              display: 'block', width: '24px', height: '2px', background: '#f8fafc',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '2px', background: '#f8fafc',
              transition: 'all 0.3s',
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '24px', height: '2px', background: '#f8fafc',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden', background: '#162033', borderTop: '1px solid #1e2d45' }}
            className="lg:hidden"
          >
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '14px 0',
                    borderBottom: '1px solid #1e2d45',
                    color: isActive ? '#c9a84c' : '#f8fafc',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href="tel:+15551234567"
                style={{ display: 'block', color: '#c9a84c', fontSize: '16px', fontWeight: 500, padding: '14px 0', textDecoration: 'none' }}
              >
                +1 (555) 123-4567
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  background: '#c9a84c',
                  color: '#0f1f3d',
                  textAlign: 'center',
                  padding: '14px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  marginTop: '8px',
                }}
              >
                Schedule a Viewing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
