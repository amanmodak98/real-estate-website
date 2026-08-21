import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string
  role: string
  years: number
  email: string
  image: string
}

interface Award {
  title: string
  year: string
  icon: string
}

interface Partner {
  name: string
  initials: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const teamMembers: TeamMember[] = [
  {
    name: 'James Harrington',
    role: 'CEO & Founder',
    years: 25,
    email: 'james.harrington@prestigerealty.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Victoria Sterling',
    role: 'Senior Partner',
    years: 18,
    email: 'victoria.sterling@prestigerealty.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Commercial Director',
    years: 15,
    email: 'michael.chen@prestigerealty.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Sophia Beaumont',
    role: 'Luxury Specialist',
    years: 12,
    email: 'sophia.beaumont@prestigerealty.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    name: 'Robert Blackwood',
    role: 'Investment Advisor',
    years: 20,
    email: 'robert.blackwood@prestigerealty.com',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },
  {
    name: 'Isabella Moreau',
    role: 'International Properties',
    years: 10,
    email: 'isabella.moreau@prestigerealty.com',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
  },
  {
    name: 'Thomas Harrington',
    role: 'Legal Affairs',
    years: 14,
    email: 'thomas.harrington@prestigerealty.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Aria Patel',
    role: 'Client Relations',
    years: 8,
    email: 'aria.patel@prestigerealty.com',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  },
]

const awards: Award[] = [
  { title: 'Top Real Estate Agency', year: '2023', icon: '🏆' },
  { title: 'Best Luxury Broker Award', year: '2023', icon: '⭐' },
  { title: '5-Star Service Excellence', year: '2022', icon: '✦' },
  { title: 'Community Champion Award', year: '2022', icon: '🤝' },
  { title: 'Innovation in Real Estate', year: '2022', icon: '💡' },
]

const partners: Partner[] = [
  { name: 'JPMorgan Chase', initials: 'JP' },
  { name: 'Wells Fargo', initials: 'WF' },
  { name: 'Chubb Insurance', initials: 'CH' },
  { name: 'First American Title', initials: 'FA' },
  { name: 'Stewart Title', initials: 'ST' },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3"
      style={{ color: '#c9a84c', fontFamily: '"DM Sans", system-ui, sans-serif' }}
    >
      {children}
    </span>
  )
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 max-w-[60px]" style={{ background: '#c9a84c' }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c9a84c' }} />
      <div className="h-px flex-1 max-w-[60px]" style={{ background: '#c9a84c' }} />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div style={{ background: '#0d1829', minHeight: '100vh' }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-20"
        style={{ background: 'linear-gradient(to bottom, #0f1f3d, #0d1829)' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-sm mb-8"
            style={{ color: '#94a3b8' }}
          >
            <Link to="/" className="hover:text-[#c9a84c] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span style={{ color: '#c9a84c' }}>About</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-light leading-tight"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
          >
            About Prestige
            <br />
            <span style={{ color: '#c9a84c' }}>Realty Group</span>
          </motion.h1>
        </div>
      </motion.section>

      {/* Company Story Section */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-24"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp}>
              <SectionLabel>Our Story</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-light mb-6"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
              >
                A Legacy of Luxury <br />
                <span style={{ color: '#c9a84c' }}>Since 1999</span>
              </h2>
              <GoldDivider />
              <div className="space-y-5" style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                <p>
                  Founded in 1999 in the heart of Manhattan, Prestige Realty Group emerged with a singular
                  vision: to redefine the luxury real estate experience. What began as a boutique agency
                  with a handful of dedicated professionals has grown into one of New York's most
                  celebrated real estate firms, with a portfolio spanning penthouses, historic brownstones,
                  and iconic commercial properties across the most coveted neighborhoods in the world.
                </p>
                <p>
                  Over a quarter century, we have cultivated relationships built on trust, discretion, and
                  an unwavering commitment to excellence. Our founders believed that every transaction is
                  more than a financial decision — it is a deeply personal journey. That philosophy
                  continues to guide every interaction we have with our clients, whether they are
                  first-time buyers stepping into the luxury market or seasoned investors managing
                  multi-property portfolios across continents.
                </p>
                <p>
                  Today, Prestige Realty Group stands at the intersection of heritage and innovation.
                  We combine decades of market insight with cutting-edge technology to deliver an
                  experience that is both timeless and forward-thinking. Our curated network of
                  international partners, legal specialists, and financial advisors ensures that every
                  client receives comprehensive guidance from the first viewing to the final signature —
                  and beyond.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="relative">
              <div
                className="absolute inset-0 rounded-2xl opacity-30"
                style={{ background: 'linear-gradient(135deg, #c9a84c20, transparent)' }}
              />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '25+', label: 'Years of Excellence' },
                  { value: '$2.4B', label: 'Transactions Closed' },
                  { value: '3,200+', label: 'Properties Sold' },
                  { value: '98%', label: 'Client Satisfaction' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    variants={fadeUp}
                    className="rounded-xl p-6 text-center"
                    style={{ background: '#1e2d45', border: '1px solid #c9a84c30' }}
                  >
                    <div
                      className="text-3xl font-semibold mb-2"
                      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#c9a84c' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs tracking-wide" style={{ color: '#94a3b8' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission, Vision, Values Section */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-24"
        style={{ background: '#162033' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <SectionLabel>Our Foundation</SectionLabel>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
            >
              Mission, Vision & <span style={{ color: '#c9a84c' }}>Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Our Mission',
                description:
                  'To deliver unparalleled real estate services that exceed expectations through integrity, market expertise, and personalized attention to every client we serve.',
              },
              {
                icon: '👁️',
                title: 'Our Vision',
                description:
                  'To be the most trusted and respected luxury real estate firm globally, setting new standards for excellence, innovation, and client satisfaction in every market we enter.',
              },
              {
                icon: '💎',
                title: 'Our Values',
                description:
                  'Integrity in every transaction. Excellence without compromise. Discretion as a cornerstone. Innovation as a driver. And above all, a genuine commitment to building lasting relationships.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="rounded-xl p-8 group hover:scale-[1.02] transition-transform duration-300"
                style={{
                  background: '#1e2d45',
                  border: '1px solid transparent',
                }}
                whileHover={{ borderColor: '#c9a84c' }}
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3
                  className="text-2xl font-light mb-4"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
                >
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#94a3b8' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-24"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <SectionLabel>The People Behind Prestige</SectionLabel>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
            >
              Meet Our <span style={{ color: '#c9a84c' }}>Expert Team</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                custom={i}
                className="group rounded-xl overflow-hidden"
                style={{ background: '#1e2d45', border: '1px solid #1e2d4500' }}
                whileHover={{ borderColor: '#c9a84c', y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                    style={{ background: 'linear-gradient(to top, #0f1f3dee 40%, transparent)' }}
                  >
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs truncate hover:underline"
                      style={{ color: '#c9a84c' }}
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-xl font-medium"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#c9a84c' }}>
                    {member.role}
                  </p>
                  <p className="text-xs mt-2" style={{ color: '#94a3b8' }}>
                    {member.years} years experience
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Awards Section */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-24"
        style={{ background: '#162033' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <SectionLabel>Recognition</SectionLabel>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
            >
              Awards &amp; <span style={{ color: '#c9a84c' }}>Accolades</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {awards.map((award, i) => (
              <motion.div
                key={award.title}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-center text-center p-8 rounded-xl"
                style={{ background: '#1e2d45', border: '1px solid #c9a84c30', width: '11rem' }}
                whileHover={{ scale: 1.05, borderColor: '#c9a84c' }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">{award.icon}</div>
                <div
                  className="font-medium leading-snug mb-2"
                  style={{ color: '#f8fafc', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1rem' }}
                >
                  {award.title}
                </div>
                <div className="text-xs font-semibold tracking-widest" style={{ color: '#c9a84c' }}>
                  {award.year}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-24"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <SectionLabel>Trusted By</SectionLabel>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
            >
              Our <span style={{ color: '#c9a84c' }}>Partners</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-center justify-center gap-3 rounded-xl p-8"
                style={{
                  background: '#1e2d45',
                  border: '1px solid #1e2d45',
                  width: '11rem',
                  height: '8rem',
                }}
                whileHover={{ borderColor: '#c9a84c', scale: 1.04 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: '#c9a84c20', color: '#c9a84c', border: '1px solid #c9a84c50' }}
                >
                  {partner.initials}
                </div>
                <span className="text-xs text-center leading-tight" style={{ color: '#94a3b8' }}>
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Team CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="py-24"
        style={{ background: 'linear-gradient(135deg, #0f1f3d, #162033)' }}
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div variants={fadeUp}>
            <SectionLabel>Careers</SectionLabel>
            <h2
              className="text-4xl md:text-6xl font-light mb-6"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#f8fafc' }}
            >
              Join Our <span style={{ color: '#c9a84c' }}>Team</span>
            </h2>
            <GoldDivider />
            <p className="text-lg leading-relaxed mb-10 mx-auto max-w-xl" style={{ color: '#94a3b8' }}>
              We are always looking for exceptional talent to join the Prestige Realty Group family.
              If you are driven by excellence, passionate about luxury real estate, and committed to
              delivering extraordinary client experiences, we would love to hear from you.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
                color: '#0f1f3d',
              }}
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300"
              style={{
                border: '1px solid #c9a84c',
                color: '#c9a84c',
              }}
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}