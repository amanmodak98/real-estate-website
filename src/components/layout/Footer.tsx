import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

interface PropertyLink {
  label: string
}

interface CompanyLink {
  label: string
  to: string
}

const propertyLinks: PropertyLink[] = [
  { label: 'Residential' },
  { label: 'Commercial' },
  { label: 'Luxury Villas' },
  { label: 'Penthouses' },
  { label: 'Land & Lots' },
]

const companyLinks: CompanyLink[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Team', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/contact' },
  { label: 'Press', to: '/about' },
]

const socialIcons = [
  { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'Instagram', paths: ['M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z', 'M17.5 6.5h.01'] },
  { label: 'LinkedIn', paths: ['M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z', 'M4 4a2 2 0 100 4 2 2 0 000-4z'] },
  { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0f1f3d' }}>
      {/* Gold separator line */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, #c9a84c 20%, #c9a84c 80%, transparent)'
      }} />

      {/* Main footer content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + tagline + badge */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
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
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7, marginBottom: '1rem' }}>
              Find Your Perfect Home with our curated portfolio of premium properties across America's most desirable locations.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(201, 168, 76, 0.3)', padding: '0.5rem 0.75rem' }}>
              <span style={{ width: '8px', height: '8px', background: '#c9a84c', borderRadius: '50%' }} />
              <span style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Licensed Real Estate Professionals
              </span>
            </div>
          </div>

          {/* Column 2: Properties */}
          <div>
            <h4 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc', fontSize: '22px', fontWeight: 600, marginBottom: '1.5rem' }}>
              Properties
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {propertyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to="/properties"
                    style={{
                      color: '#94a3b8',
                      fontSize: '14px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8' }}
                  >
                    <span style={{ width: '4px', height: '4px', background: '#c9a84c', borderRadius: '50%', flexShrink: 0 }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc', fontSize: '22px', fontWeight: 600, marginBottom: '1.5rem' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    style={{
                      color: '#94a3b8',
                      fontSize: '14px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8' }}
                  >
                    <span style={{ width: '4px', height: '4px', background: '#c9a84c', borderRadius: '50%', flexShrink: 0 }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact + Social */}
          <div>
            <h4 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc', fontSize: '22px', fontWeight: 600, marginBottom: '1.5rem' }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <svg style={{ width: '16px', height: '16px', color: '#c9a84c', marginTop: '2px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+15551234567" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c' }}
                   onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8' }}>
                  +1 (555) 123-4567
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <svg style={{ width: '16px', height: '16px', color: '#c9a84c', marginTop: '2px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@prestigerealty.com" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c' }}
                   onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8' }}>
                  info@prestigerealty.com
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <svg style={{ width: '16px', height: '16px', color: '#c9a84c', marginTop: '2px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6 }}>
                  350 Park Avenue, Manhattan, NY 10022
                </span>
              </li>
            </ul>

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid #1e2d45',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#c9a84c';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1e2d45';
                  }}
                >
                  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {Array.isArray(social.paths) ? (
                      <>
                        {social.paths.map((p, i) => (
                          social.label === 'Instagram' && i === 0 ? <rect key={i} x="2" y="2" width="20" height="20" rx="5" ry="5" /> :
                          social.label === 'Instagram' && i === 1 ? (
                            <>
                              <circle cx="12" cy="12" r="4" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </>
                          ) :
                          social.label === 'LinkedIn' && i === 1 ? <circle key={i} cx="4" cy="4" r="2" /> :
                          <path key={i} d={p} />
                        ))}
                      </>
                    ) : (
                      <path d={social.path} />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div style={{ borderTop: '1px solid #1e2d45' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              © {currentYear} Prestige Realty Group. All rights reserved.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Designed &amp; Developed by <a href="https://www.infirexa.tech" target="_blank" rel="noopener noreferrer">Infirexa</a></p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Fair Housing'].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
