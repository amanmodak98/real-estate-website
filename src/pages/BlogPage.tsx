import { useState } from 'react'
import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: number
  title: string
  author: string
  date: string
  category: string
  readTime: string
  image: string
  excerpt: string
  slug: string
}

interface RecentPost {
  id: number
  title: string
  slug: string
}

interface Category {
  name: string
  count: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const featuredPost: BlogPost = {
  id: 0,
  title: 'The Manhattan Luxury Market: 2026 Forecast and Investment Opportunities',
  author: 'James Harrington',
  date: 'March 15, 2026',
  category: 'Market Trends',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
  excerpt:
    "As we move deeper into 2026, Manhattan's luxury real estate market continues to demonstrate remarkable resilience and strategic growth. From the historic brownstones of the Upper West Side to the gleaming glass towers of Hudson Yards, discerning investors are discovering unprecedented opportunities in one of the world's most coveted property markets. Our comprehensive analysis reveals the key trends shaping the landscape and where the smartest money is moving.",
  slug: 'manhattan-luxury-market-2026',
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Tips for First-Time Luxury Home Buyers',
    author: 'Victoria Sterling',
    date: 'February 28, 2026',
    category: 'Buying Tips',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&q=80',
    excerpt:
      'Entering the luxury real estate market for the first time can be both exhilarating and overwhelming. Our expert guide walks you through essential strategies to secure the perfect property.',
    slug: 'first-time-luxury-home-buyers-tips',
  },
  {
    id: 2,
    title: 'Why Beverly Hills Remains the Gold Standard for Luxury Real Estate',
    author: 'Sophia Beaumont',
    date: 'February 14, 2026',
    category: 'Luxury Living',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1597598425618-5a4b973e7a65?w=600&q=80',
    excerpt:
      'Decade after decade, Beverly Hills maintains its unrivaled prestige in the global luxury property market. Discover what sets this iconic enclave apart from the competition.',
    slug: 'beverly-hills-gold-standard-luxury',
  },
  {
    id: 3,
    title: 'Understanding Cap Rates: A Guide for Real Estate Investors',
    author: 'Robert Blackwood',
    date: 'January 30, 2026',
    category: 'Investment',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    excerpt:
      'Capitalization rates are a fundamental tool for evaluating investment properties. Master this key metric to make smarter, more profitable real estate decisions.',
    slug: 'understanding-cap-rates-investors',
  },
  {
    id: 4,
    title: 'Navigating Property Purchase Agreements: What You Need to Know',
    author: 'Thomas Harrington',
    date: 'January 15, 2026',
    category: 'Legal',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    excerpt:
      'Property purchase agreements are complex legal documents that can make or break a transaction. Our legal insights help you navigate every clause with confidence.',
    slug: 'navigating-property-purchase-agreements',
  },
  {
    id: 5,
    title: 'Miami Beach Real Estate: Sun, Luxury and Appreciation',
    author: 'Isabella Moreau',
    date: 'December 20, 2025',
    category: 'Market Trends',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    excerpt:
      'Miami Beach has evolved from a seasonal destination to a year-round luxury haven attracting global elites and delivering outstanding property appreciation.',
    slug: 'miami-beach-real-estate-luxury',
  },
  {
    id: 6,
    title: 'Smart Home Technology: The New Standard in Luxury Properties',
    author: 'Aria Patel',
    date: 'December 5, 2025',
    category: 'Luxury Living',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80',
    excerpt:
      "Today's luxury buyers expect seamlessly integrated smart technology as standard. From AI-powered security to automated climate control, explore what modern luxury demands.",
    slug: 'smart-home-technology-luxury-properties',
  },
]

const recentPosts: RecentPost[] = [
  {
    id: 1,
    title: 'The Manhattan Luxury Market: 2026 Forecast and Investment Opportunities',
    slug: 'manhattan-luxury-market-2026',
  },
  {
    id: 2,
    title: '10 Tips for First-Time Luxury Home Buyers',
    slug: 'first-time-luxury-home-buyers-tips',
  },
  {
    id: 3,
    title: 'Why Beverly Hills Remains the Gold Standard for Luxury Real Estate',
    slug: 'beverly-hills-gold-standard-luxury',
  },
]

const categories: Category[] = [
  { name: 'Market Trends', count: 12 },
  { name: 'Buying Tips', count: 8 },
  { name: 'Luxury Living', count: 15 },
  { name: 'Investment', count: 10 },
  { name: 'Legal', count: 6 },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Category colour map ──────────────────────────────────────────────────────

const categoryColors: Record<string, string> = {
  'Market Trends': '#c9a84c',
  'Buying Tips':   '#60a5fa',
  'Luxury Living': '#a78bfa',
  'Investment':    '#34d399',
  'Legal':         '#f87171',
}

// ─── BlogCard ─────────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1e2d45',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.3)' : 'none',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
        <motion.img
          src={post.image}
          alt={post.title}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13,24,41,0.6) 0%, transparent 60%)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: categoryColors[post.category] ?? '#c9a84c',
            color: '#0f1f3d',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            padding: '4px 10px',
            borderRadius: '4px',
          }}
        >
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            fontSize: '12px',
            color: '#94a3b8',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            flexWrap: 'wrap' as const,
          }}
        >
          <span>{post.author}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#94a3b8', flexShrink: 0 }} />
          <span>{post.date}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#94a3b8', flexShrink: 0 }} />
          <span>{post.readTime}</span>
        </div>

        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '18px',
            fontWeight: 600,
            color: hovered ? '#c9a84c' : '#f8fafc',
            lineHeight: 1.4,
            marginBottom: '10px',
            transition: 'color 0.2s',
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
            color: '#94a3b8',
            lineHeight: 1.7,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        <motion.button
          whileHover={{ x: 4 }}
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#c9a84c',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            letterSpacing: '0.04em',
          }}
        >
          Read More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.article>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'sticky', top: '24px' }}
    >
      {/* Recent Posts */}
      <div
        style={{
          background: '#1e2d45',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '22px',
            fontWeight: 600,
            color: '#f8fafc',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          Recent Posts
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {recentPosts.map((post, i) => (
            <li key={post.id}>
              <motion.a
                href="#"
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px 0',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  transition: 'color 0.2s',
                  borderBottom: i < recentPosts.length - 1 ? '1px solid rgba(148,163,184,0.1)' : 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a84c' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#c9a84c',
                    marginTop: '7px',
                  }}
                />
                {post.title}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div
        style={{
          background: '#1e2d45',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '22px',
            fontWeight: 600,
            color: '#f8fafc',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          Categories
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {categories.map((cat) => (
            <li key={cat.name}>
              <motion.a
                href="#"
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '14px',
                  borderBottom: '1px solid rgba(148,163,184,0.08)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a84c' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
              >
                <span>{cat.name}</span>
                <span
                  style={{
                    background: 'rgba(201,168,76,0.15)',
                    color: '#c9a84c',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '2px 9px',
                    borderRadius: '12px',
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                  }}
                >
                  {cat.count}
                </span>
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e2d45 0%, rgba(201,168,76,0.06) 100%)',
          borderRadius: '12px',
          padding: '28px',
          border: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '22px',
            fontWeight: 600,
            color: '#f8fafc',
            marginBottom: '8px',
          }}
        >
          Stay Informed
        </h3>
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
            color: '#94a3b8',
            lineHeight: 1.7,
            marginBottom: '20px',
          }}
        >
          Subscribe to our newsletter for the latest luxury real estate insights delivered to your inbox.
        </p>
        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              textAlign: 'center',
              padding: '16px',
              background: 'rgba(52,211,153,0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(52,211,153,0.3)',
            }}
          >
            <p style={{ color: '#34d399', fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '14px', fontWeight: 600 }}>
              You're subscribed!
            </p>
            <p style={{ color: '#94a3b8', fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', marginTop: '4px' }}>
              Thank you for joining our community.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(13,24,41,0.6)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '8px',
                color: '#f8fafc',
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)' }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
                color: '#0f1f3d',
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Subscribe
            </motion.button>
          </form>
        )}
      </div>
    </motion.aside>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0d1829 0%, #162033 100%)',
        padding: '80px 0 60px',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gold lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '40px',
          background: 'linear-gradient(180deg, transparent, #c9a84c)',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
            color: '#94a3b8',
          }}
        >
          <a
            href="/"
            style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a84c' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
          >
            Home
          </a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span style={{ color: '#c9a84c' }}>Blog</span>
        </motion.nav>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: '#c9a84c',
              marginBottom: '16px',
            }}
          >
            Our Journal
          </p>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 600,
              color: '#f8fafc',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Real Estate{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Insights
            </span>
          </h1>
          <p
            style={{
              marginTop: '20px',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '17px',
              color: '#94a3b8',
              maxWidth: '520px',
              margin: '20px auto 0',
              lineHeight: 1.7,
            }}
          >
            Expert perspectives on luxury markets, investment strategies, and the art of fine living.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FeaturedPost ─────────────────────────────────────────────────────────────

function FeaturedPost() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '48px',
        cursor: 'pointer',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.15)'}`,
        boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.4)' : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <motion.img
          src={featuredPost.image}
          alt={featuredPost.title}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13,24,41,0.95) 0%, rgba(13,24,41,0.4) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Content overlay */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' as const }}>
          <span
            style={{
              background: '#c9a84c',
              color: '#0f1f3d',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: '"DM Sans", system-ui, sans-serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              padding: '4px 12px',
              borderRadius: '4px',
            }}
          >
            Featured
          </span>
          <span
            style={{
              background: 'rgba(201,168,76,0.15)',
              color: '#c9a84c',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: '"DM Sans", system-ui, sans-serif',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              padding: '4px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
          >
            {featuredPost.category}
          </span>
        </div>

        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(22px, 3vw, 34px)',
            fontWeight: 600,
            color: hovered ? '#e6c97e' : '#f8fafc',
            lineHeight: 1.25,
            marginBottom: '14px',
            transition: 'color 0.2s',
          }}
        >
          {featuredPost.title}
        </h2>

        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '15px',
            color: 'rgba(248,250,252,0.75)',
            lineHeight: 1.7,
            marginBottom: '20px',
            maxWidth: '700px',
          }}
        >
          {featuredPost.excerpt}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap' as const,
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '13px',
              color: 'rgba(248,250,252,0.6)',
              flexWrap: 'wrap' as const,
            }}
          >
            <span style={{ color: '#c9a84c', fontWeight: 600 }}>{featuredPost.author}</span>
            <span>{featuredPost.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {featuredPost.readTime}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
              color: '#0f1f3d',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Read Article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

// ─── BlogPage ─────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <div style={{ background: '#0d1829', minHeight: '100vh' }}>
      <Hero />

      {/* Main layout */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '7fr 3fr',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Main Content */}
          <div>
            {/* Featured Post */}
            <FeaturedPost />

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ marginBottom: '32px' }}
            >
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '32px',
                  fontWeight: 600,
                  color: '#f8fafc',
                  marginBottom: '4px',
                }}
              >
                Latest Articles
              </h2>
              <div style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
            </motion.div>

            {/* Blog cards grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
              }}
            >
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </section>
    </div>
  )
}
