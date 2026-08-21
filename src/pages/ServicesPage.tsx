import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceData {
  id: number
  title: string
  image: string
  description: string
  processSteps: string[]
  features: string[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: ServiceData[] = [
  {
    id: 1,
    title: 'Residential Sales',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    description:
      'Our residential sales team brings decades of combined experience in helping clients navigate the complexities of buying and selling luxury homes. We provide comprehensive market analysis, professional staging consultation, and targeted marketing strategies to maximize your property\'s value and minimize time on market.',
    processSteps: [
      'Initial Consultation',
      'Property Valuation',
      'Marketing Strategy',
      'Negotiations',
      'Closing',
    ],
    features: [
      'Comprehensive market analysis & CMA reports',
      'Professional staging & photography consultation',
      'Targeted digital & print marketing campaigns',
      'Expert negotiation on your behalf',
      'Full closing coordination & support',
      'Post-sale follow-up & referral services',
    ],
  },
  {
    id: 2,
    title: 'Property Rentals',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    description:
      'From identifying premium rental properties to handling all aspects of tenant management, our rental division ensures a seamless experience for both landlords and tenants. We maintain an extensive database of pre-qualified tenants seeking luxury accommodations.',
    processSteps: [
      'Property Assessment',
      'Tenant Screening',
      'Lease Preparation',
      'Move-in Inspection',
      'Ongoing Management',
    ],
    features: [
      'Pre-qualified tenant database access',
      'Rigorous background & credit screening',
      'Attorney-reviewed lease agreements',
      'Detailed move-in/move-out inspections',
      'Rent collection & disbursement services',
      '24/7 tenant communication management',
    ],
  },
  {
    id: 3,
    title: 'Commercial Real Estate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    description:
      'Our commercial division specializes in office spaces, retail locations, industrial properties, and mixed-use developments. With in-depth market intelligence and an extensive network of commercial investors and developers, we deliver exceptional results for our commercial clients.',
    processSteps: [
      'Market Analysis',
      'Site Selection',
      'Due Diligence',
      'Lease/Purchase Negotiation',
      'Closing',
    ],
    features: [
      'Office, retail, industrial & mixed-use expertise',
      'In-depth commercial market intelligence',
      'Extensive investor & developer network',
      'Zoning & regulatory guidance',
      'Financial modeling & ROI analysis',
      'Long-term asset strategy planning',
    ],
  },
  {
    id: 4,
    title: 'Property Management',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description:
      'Take the stress out of property ownership with our comprehensive management services. Our dedicated team handles everything from tenant relations and maintenance coordination to financial reporting and legal compliance, ensuring your investment performs at its maximum potential.',
    processSteps: [
      'Onboarding',
      'Tenant Relations',
      'Maintenance Coordination',
      'Financial Reporting',
      'Annual Review',
    ],
    features: [
      'Full-service tenant relations management',
      'Vetted contractor maintenance network',
      'Monthly itemized financial statements',
      'Legal compliance & regulatory updates',
      'Vacancy marketing & rapid re-tenanting',
      'Annual portfolio performance review',
    ],
  },
  {
    id: 5,
    title: 'Investment Advisory',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80',
    description:
      'Our investment advisory team provides sophisticated market analysis and strategic guidance to help you build and optimize your real estate portfolio. Whether you\'re a first-time investor or managing a complex portfolio, we offer the insights and expertise to maximize your returns.',
    processSteps: [
      'Portfolio Assessment',
      'Market Research',
      'Investment Strategy',
      'Acquisition',
      'Asset Management',
    ],
    features: [
      'Personalized portfolio assessment & benchmarking',
      'Proprietary market research & trend analysis',
      'Risk-adjusted investment strategy planning',
      'Off-market acquisition opportunities',
      'Tax-efficient structuring guidance',
      'Ongoing performance monitoring & rebalancing',
    ],
  },
  {
    id: 6,
    title: 'Legal & Documentation',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    description:
      'Navigate the complexities of real estate law with confidence. Our legal affairs team ensures all documentation is thorough, accurate, and protective of your interests. From contract review to title searches and closing coordination, we handle every legal aspect of your transaction.',
    processSteps: [
      'Document Review',
      'Due Diligence',
      'Title Search',
      'Contract Drafting',
      'Closing',
    ],
    features: [
      'Comprehensive contract review & redlining',
      'Full title search & insurance coordination',
      'Lien, encumbrance & easement analysis',
      'Custom contract drafting & negotiation',
      'Escrow management & fund disbursement',
      'Post-closing document recording & filing',
    ],
  },
]



// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#c9a84c',
        fontFamily: '"DM Sans", system-ui, sans-serif',
        marginBottom: '0.75rem',
      }}
    >
      {children}
    </span>
  )
}

function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
      <div style={{ height: '1px', width: '60px', background: '#c9a84c' }} />
      <div
        style={{
          width: '6px',
          height: '6px',
          background: '#c9a84c',
          transform: 'rotate(45deg)',
        }}
      />
      <div style={{ height: '1px', width: '60px', background: '#c9a84c' }} />
    </div>
  )
}

function ProcessSteps({ steps }: { steps: string[] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0',
        marginTop: '1.5rem',
        marginBottom: '2rem',
      }}
    >
      {steps.map((step, index) => (
        <div
          key={step}
          style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: '1px solid #c9a84c',
              background: 'rgba(201,168,76,0.08)',
              color: '#e6c97e',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                color: '#c9a84c',
                fontSize: '1rem',
                margin: '0 0.35rem',
                opacity: 0.7,
                lineHeight: 1,
              }}
            >
              →
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
      {features.map((feat) => (
        <li
          key={feat}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            color: '#94a3b8',
            fontSize: '0.85rem',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#c9a84c', fontSize: '0.8rem', marginTop: '0.15rem', flexShrink: 0 }}>✓</span>
          {feat}
        </li>
      ))}
    </ul>
  )
}

interface ServiceSectionProps {
  service: ServiceData
  index: number
}

function ServiceSection({ service, index }: ServiceSectionProps) {
  const isOdd = index % 2 === 0 // 0-indexed: 0,2,4 → image left; 1,3,5 → text left

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, x: isOdd ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ flex: '0 0 48%', position: 'relative' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '4px',
          zIndex: 1,
          pointerEvents: 'none',
          transform: isOdd ? 'translate(-10px, 10px)' : 'translate(10px, 10px)',
        }}
      />
      <img
        src={service.image}
        alt={service.title}
        style={{
          width: '100%',
          height: '480px',
          objectFit: 'cover',
          borderRadius: '4px',
          display: 'block',
          position: 'relative',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(15,31,61,0.3) 0%, transparent 60%)',
          borderRadius: '4px',
          zIndex: 3,
        }}
      />
    </motion.div>
  )

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: isOdd ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
      style={{ flex: '0 0 48%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <SectionLabel>Our Services</SectionLabel>
      <h2
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(2rem, 3vw, 2.75rem)',
          fontWeight: 400,
          color: '#f8fafc',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {service.title}
      </h2>
      <GoldDivider />
      <p
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: '0.95rem',
          color: '#94a3b8',
          lineHeight: 1.8,
          margin: '0 0 1.5rem 0',
        }}
      >
        {service.description}
      </p>
      <div>
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginBottom: '0.5rem',
          }}
        >
          Our Process
        </p>
        <ProcessSteps steps={service.processSteps} />
      </div>
      <FeatureList features={service.features} />
      <div>
        <Link
          to="/contact"
          style={{
            display: 'inline-block',
            padding: '0.85rem 2.25rem',
            background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
            color: '#0f1f3d',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '2px',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
          }}
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        padding: '6rem 0',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          gap: '4rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {isOdd ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </motion.section>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div style={{ background: '#0d1829', minHeight: '100vh' }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          paddingTop: '8rem',
          paddingBottom: '5rem',
          background: 'linear-gradient(to bottom, #0f1f3d, #0d1829)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              marginBottom: '2rem',
              color: '#94a3b8',
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }}
          >
            <Link
              to="/"
              style={{
                color: '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'
              }}
            >
              Home
            </Link>
            <span>/</span>
            <span style={{ color: '#c9a84c' }}>Services</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#f8fafc',
              margin: 0,
            }}
          >
            Our <span style={{ color: '#c9a84c' }}>Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '1.05rem',
              color: '#94a3b8',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginTop: '1.5rem',
            }}
          >
            Comprehensive real estate solutions designed to meet every aspect of your property
            needs. From sales and rentals to investment advisory and legal support, our expert
            team delivers exceptional service at every step.
          </motion.p>
        </div>
      </motion.section>

      {/* Service Sections */}
      {SERVICES.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 20% 50%, rgba(15,31,61,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(15,31,61,0.15) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 400,
              color: '#0f1f3d',
              lineHeight: 1.3,
              marginBottom: '1.25rem',
            }}
          >
            Ready to Experience Excellence?
          </h2>
          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '1.05rem',
              color: '#0f1f3d',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              opacity: 0.85,
            }}
          >
            Schedule a consultation with our expert team and discover how we can help you achieve
            your real estate goals. Whether you're buying, selling, investing, or managing
            properties, we're here to guide you every step of the way.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              padding: '1rem 3rem',
              background: '#0f1f3d',
              color: '#c9a84c',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              border: '2px solid #0f1f3d',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#0f1f3d'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = '#0f1f3d'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'
            }}
          >
            Schedule Consultation
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

