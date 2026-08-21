import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ── Types ────────────────────────────────────────────────────────────────────

interface ContactMethod {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}

interface Agent {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

interface OfficeHour {
  day: string;
  hours: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const COLORS = {
  navy: "#0f1f3d",
  gold: "#c9a84c",
  goldLight: "#e6c97e",
  slate: "#0d1829",
  surface: "#162033",
  card: "#1e2d45",
  white: "#f8fafc",
  muted: "#94a3b8",
} as const;

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const SERVICE_OPTIONS: string[] = [
  "Property Purchase",
  "Property Sale",
  "Property Rental",
  "Investment Consultation",
  "Property Management",
  "Legal Services",
  "Other",
];

const AGENTS: Agent[] = [
  {
    id: 1,
    name: "James Harrington",
    role: "CEO & Founder",
    phone: "+1 (555) 123-4501",
    email: "james@prestigerealty.com",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
  },
  {
    id: 2,
    name: "Victoria Sterling",
    role: "Senior Partner",
    phone: "+1 (555) 123-4502",
    email: "victoria@prestigerealty.com",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
  },
  {
    id: 3,
    name: "Sophia Beaumont",
    role: "Luxury Specialist",
    phone: "+1 (555) 123-4503",
    email: "sophia@prestigerealty.com",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
  },
];

const OFFICE_HOURS: OfficeHour[] = [
  { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
  { day: "Sunday", hours: "By Appointment Only" },
];

// ── SVG Icons ────────────────────────────────────────────────────────────────

function PhoneIcon({ color = COLORS.gold, size = 28 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ color = COLORS.gold, size = 28 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon({ color = COLORS.gold, size = 28 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ color = COLORS.gold, size = 20 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon({ color = COLORS.gold, size = 48 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${COLORS.slate} 0%, ${COLORS.surface} 100%)`,
        padding: "100px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gold}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
        {/* Breadcrumb */}
        <motion.nav
          {...FADE_UP}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "32px",
            fontSize: "13px",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <Link
            to="/"
            style={{
              color: COLORS.muted,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = COLORS.gold;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = COLORS.muted;
            }}
          >
            Home
          </Link>
          <span style={{ color: COLORS.gold }}>›</span>
          <span style={{ color: COLORS.gold }}>Contact</span>
        </motion.nav>

        {/* Heading */}
        <motion.h1
          {...FADE_UP}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 600,
            color: COLORS.white,
            lineHeight: 1.1,
            marginBottom: "24px",
            letterSpacing: "-0.01em",
          }}
        >
          Get In{" "}
          <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Touch</span>
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          {...FADE_UP}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            width: "60px",
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
            margin: "0 auto 28px",
          }}
        />

        {/* Subtitle */}
        <motion.p
          {...FADE_UP}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "18px",
            color: COLORS.muted,
            lineHeight: 1.75,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Ready to find your perfect property? Our team of luxury real estate
          specialists is here to guide you every step of the way.
        </motion.p>
      </div>
    </section>
  );
}

// ── Contact Method Cards ──────────────────────────────────────────────────────

function ContactMethodCard({
  icon,
  label,
  value,
  sub,
  delay,
}: ContactMethod & { delay: number }) {
  return (
    <motion.div
      {...FADE_UP}
      transition={{ duration: 0.6, delay }}
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.gold}33`,
        borderRadius: "16px",
        padding: "40px 32px",
        textAlign: "center",
        transition: "border-color 0.3s, transform 0.3s",
        cursor: "default",
      }}
      whileHover={{ y: -4, borderColor: COLORS.gold }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: `${COLORS.gold}18`,
          border: `1px solid ${COLORS.gold}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}
      >
        {icon}
      </div>
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: COLORS.gold,
          marginBottom: "8px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "22px",
          fontWeight: 600,
          color: COLORS.white,
          marginBottom: "8px",
          letterSpacing: "0.01em",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "14px",
          color: COLORS.muted,
        }}
      >
        {sub}
      </p>
    </motion.div>
  );
}

function ContactMethodsSection() {
  const methods: (ContactMethod & { delay: number })[] = [
    {
      icon: <PhoneIcon />,
      label: "Call Us",
      value: "+1 (555) 123-4567",
      sub: "Mon-Fri: 9AM - 7PM",
      delay: 0.1,
    },
    {
      icon: <MailIcon />,
      label: "Email Us",
      value: "info@prestigerealty.com",
      sub: "We respond within 24 hours",
      delay: 0.2,
    },
    {
      icon: <MapPinIcon />,
      label: "Visit Our Office",
      value: "350 Park Avenue",
      sub: "Manhattan, NY 10022",
      delay: 0.3,
    },
  ];

  return (
    <section
      style={{
        background: COLORS.slate,
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {methods.map((method) => (
          <ContactMethodCard key={method.label} {...method} />
        ))}
      </div>
    </section>
  );
}

// ── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          serviceInterest: "",
          message: "",
        });
      }, 5000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyles: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: COLORS.surface,
    border: `1px solid ${COLORS.gold}33`,
    borderRadius: "8px",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: "15px",
    color: COLORS.white,
    outline: "none",
    transition: "border-color 0.3s, background 0.3s",
  };

  const labelStyles: React.CSSProperties = {
    display: "block",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: COLORS.white,
    marginBottom: "8px",
    letterSpacing: "0.02em",
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.gold}44`,
          borderRadius: "16px",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <CheckCircleIcon size={64} />
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "32px",
            fontWeight: 600,
            color: COLORS.white,
            marginTop: "24px",
            marginBottom: "12px",
          }}
        >
          Message Sent Successfully!
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "16px",
            color: COLORS.muted,
            lineHeight: 1.6,
          }}
        >
          Thank you for reaching out. Our team will get back to you within 24
          hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...FADE_UP}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.gold}33`,
        borderRadius: "16px",
        padding: "40px",
      }}
    >
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "36px",
          fontWeight: 600,
          color: COLORS.white,
          marginBottom: "32px",
          letterSpacing: "0.01em",
        }}
      >
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="fullName" style={labelStyles}>
            Full Name <span style={{ color: COLORS.gold }}>*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyles}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.gold;
              e.currentTarget.style.background = COLORS.slate;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.gold}33`;
              e.currentTarget.style.background = COLORS.surface;
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="email" style={labelStyles}>
            Email Address <span style={{ color: COLORS.gold }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyles}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.gold;
              e.currentTarget.style.background = COLORS.slate;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.gold}33`;
              e.currentTarget.style.background = COLORS.surface;
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="phone" style={labelStyles}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyles}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.gold;
              e.currentTarget.style.background = COLORS.slate;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.gold}33`;
              e.currentTarget.style.background = COLORS.surface;
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="serviceInterest" style={labelStyles}>
            Service Interest
          </label>
          <select
            id="serviceInterest"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            style={{ ...inputStyles, cursor: "pointer" }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.gold;
              e.currentTarget.style.background = COLORS.slate;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.gold}33`;
              e.currentTarget.style.background = COLORS.surface;
            }}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((service) => (
              <option
                key={service}
                value={service}
                style={{ background: COLORS.slate, color: COLORS.white }}
              >
                {service}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label htmlFor="message" style={labelStyles}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            style={{ ...inputStyles, resize: "vertical", minHeight: "120px" }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.gold;
              e.currentTarget.style.background = COLORS.slate;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.gold}33`;
              e.currentTarget.style.background = COLORS.surface;
            }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          style={{
            width: "100%",
            padding: "16px",
            background: isSubmitting ? COLORS.muted : COLORS.gold,
            color: COLORS.slate,
            border: "none",
            borderRadius: "8px",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              (e.currentTarget as HTMLButtonElement).style.background =
                COLORS.goldLight;
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              (e.currentTarget as HTMLButtonElement).style.background =
                COLORS.gold;
            }
          }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </motion.div>
  );
}

// ── Featured Agents ───────────────────────────────────────────────────────────

function AgentCard({ agent, delay }: { agent: Agent; delay: number }) {
  return (
    <motion.div
      {...FADE_UP}
      transition={{ duration: 0.6, delay }}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.gold}28`,
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        transition: "border-color 0.3s",
      }}
      whileHover={{ borderColor: `${COLORS.gold}88` }}
    >
      <img
        src={agent.image}
        alt={agent.name}
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          objectFit: "cover",
          border: `2px solid ${COLORS.gold}55`,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "20px",
            fontWeight: 600,
            color: COLORS.white,
            marginBottom: "2px",
          }}
        >
          {agent.name}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: COLORS.gold,
            marginBottom: "12px",
          }}
        >
          {agent.role}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <a
            href={`tel:${agent.phone}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "13px",
              color: COLORS.muted,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = COLORS.gold;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = COLORS.muted;
            }}
          >
            <PhoneIcon size={14} color={COLORS.gold} />
            {agent.phone}
          </a>
          <a
            href={`mailto:${agent.email}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "13px",
              color: COLORS.muted,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = COLORS.gold;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = COLORS.muted;
            }}
          >
            <MailIcon size={14} color={COLORS.gold} />
            {agent.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedAgentsPanel() {
  return (
    <motion.div {...FADE_UP} transition={{ duration: 0.6, delay: 0.2 }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "36px",
          fontWeight: 600,
          color: COLORS.white,
          marginBottom: "8px",
          letterSpacing: "0.01em",
        }}
      >
        Connect with Our Agents
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "15px",
          color: COLORS.muted,
          marginBottom: "32px",
          lineHeight: 1.6,
        }}
      >
        Our specialists are ready to help you find your dream property.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {AGENTS.map((agent, i) => (
          <AgentCard key={agent.id} agent={agent} delay={0.3 + i * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Form + Agents Two-Column Section ─────────────────────────────────────────

function FormAndAgentsSection() {
  return (
    <section style={{ background: COLORS.slate, padding: "80px 24px" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "48px",
          alignItems: "start",
        }}
      >
        <ContactForm />
        <FeaturedAgentsPanel />
      </div>
    </section>
  );
}

// ── Map Placeholder ───────────────────────────────────────────────────────────

function MapPlaceholder() {
  return (
    <motion.div
      {...FADE_UP}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{
        height: "400px",
        background: COLORS.surface,
        border: `2px solid ${COLORS.gold}`,
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
        padding: "32px",
      }}
    >
      <MapPinIcon size={40} />
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "26px",
          fontWeight: 600,
          color: COLORS.white,
          letterSpacing: "0.01em",
        }}
      >
        Interactive Map
      </p>
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "15px",
          color: COLORS.muted,
          lineHeight: 1.5,
        }}
      >
        350 Park Avenue, Manhattan, NY 10022
      </p>
      <motion.a
        href="https://maps.google.com/?q=350+Park+Avenue+Manhattan+NY+10022"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "inline-block",
          marginTop: "8px",
          padding: "12px 28px",
          background: "transparent",
          border: `1px solid ${COLORS.gold}`,
          borderRadius: "6px",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: COLORS.gold,
          textDecoration: "none",
          transition: "background 0.3s, color 0.3s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = COLORS.gold;
          el.style.color = COLORS.slate;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "transparent";
          el.style.color = COLORS.gold;
        }}
      >
        View on Google Maps
      </motion.a>
    </motion.div>
  );
}

// ── Office Hours Panel ────────────────────────────────────────────────────────

function OfficeHoursPanel() {
  return (
    <motion.div {...FADE_UP} transition={{ duration: 0.6, delay: 0.2 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <ClockIcon size={26} />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "34px",
            fontWeight: 600,
            color: COLORS.white,
            letterSpacing: "0.01em",
          }}
        >
          Office Hours
        </h2>
      </div>

      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.gold}28`,
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "28px",
        }}
      >
        {OFFICE_HOURS.map((row, i) => (
          <div
            key={row.day}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 24px",
              borderBottom:
                i < OFFICE_HOURS.length - 1
                  ? `1px solid ${COLORS.gold}18`
                  : "none",
              background: i % 2 === 0 ? "transparent" : `${COLORS.gold}06`,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                color: COLORS.white,
              }}
            >
              {row.day}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "14px",
                color:
                  row.hours === "By Appointment Only"
                    ? COLORS.gold
                    : COLORS.muted,
                fontStyle:
                  row.hours === "By Appointment Only" ? "italic" : "normal",
              }}
            >
              {row.hours}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.gold}28`,
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <div style={{ paddingTop: "2px", flexShrink: 0 }}>
            <MapPinIcon size={20} />
          </div>
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: COLORS.gold,
                marginBottom: "6px",
              }}
            >
              Our Address
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "16px",
                color: COLORS.white,
                lineHeight: 1.7,
              }}
            >
              350 Park Avenue
              <br />
              Manhattan, NY 10022
              <br />
              United States
            </p>
          </div>
        </div>
      </div>

      <motion.a
        href="mailto:info@prestigerealty.com?subject=Schedule a Visit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "block",
          width: "100%",
          padding: "16px",
          background: COLORS.gold,
          borderRadius: "8px",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: COLORS.slate,
          textDecoration: "none",
          textAlign: "center",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background =
            COLORS.goldLight;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = COLORS.gold;
        }}
      >
        Schedule a Visit
      </motion.a>
    </motion.div>
  );
}

// ── Map + Hours Section ───────────────────────────────────────────────────────

function MapAndHoursSection() {
  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${COLORS.slate} 0%, ${COLORS.navy} 100%)`,
        padding: "80px 24px 100px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          {...FADE_UP}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 600,
              color: COLORS.white,
              marginBottom: "16px",
              letterSpacing: "-0.01em",
            }}
          >
            Find{" "}
            <span style={{ color: COLORS.gold, fontStyle: "italic" }}>
              Our Office
            </span>
          </h2>
          <div
            style={{
              width: "50px",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
              margin: "0 auto",
            }}
          />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <MapPlaceholder />
          <OfficeHoursPanel />
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: COLORS.slate,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <HeroSection />
      <ContactMethodsSection />
      <FormAndAgentsSection />
      <MapAndHoursSection />
    </main>
  );
}
