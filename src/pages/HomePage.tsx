import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// ── Types ────────────────────────────────────────────────────────────────────

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  status: "For Sale" | "For Rent";
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
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

const FEATURED_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "The Meridian Penthouse",
    location: "Manhattan, NY",
    price: "$4,250,000",
    beds: 4,
    baths: 4,
    sqft: "4,200",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    status: "For Sale",
  },
  {
    id: 2,
    title: "Villa Serenita",
    location: "Beverly Hills, CA",
    price: "$7,800,000",
    beds: 6,
    baths: 7,
    sqft: "8,500",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    status: "For Sale",
  },
  {
    id: 3,
    title: "Harbor View Residences",
    location: "Miami Beach, FL",
    price: "$2,100,000",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    status: "For Sale",
  },
  {
    id: 4,
    title: "The Whitmore Estate",
    location: "Greenwich, CT",
    price: "$5,500,000",
    beds: 5,
    baths: 6,
    sqft: "7,200",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "For Sale",
  },
  {
    id: 5,
    title: "Skyline Loft 42A",
    location: "Chicago, IL",
    price: "$890,000",
    beds: 2,
    baths: 2,
    sqft: "1,900",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    status: "For Rent",
  },
  {
    id: 6,
    title: "Pacific Heights Manor",
    location: "San Francisco, CA",
    price: "$3,750,000",
    beds: 4,
    baths: 5,
    sqft: "5,100",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    status: "For Sale",
  },
];

const RECENT_LISTINGS: Property[] = [
  {
    id: 7,
    title: "The Rosewood Townhouse",
    location: "Brooklyn, NY",
    price: "$1,850,000",
    beds: 3,
    baths: 3,
    sqft: "2,400",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    status: "For Sale",
  },
  {
    id: 8,
    title: "Sunset Ridge Villa",
    location: "Malibu, CA",
    price: "$6,200,000",
    beds: 5,
    baths: 5,
    sqft: "6,800",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    status: "For Sale",
  },
  {
    id: 9,
    title: "Downtown Apex Suite",
    location: "Austin, TX",
    price: "$720,000",
    beds: 2,
    baths: 2,
    sqft: "1,600",
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80",
    status: "For Rent",
  },
];

const STATS: Stat[] = [
  { id: 1, value: 500, suffix: "+", label: "Properties Listed" },
  { id: 2, value: 1200, suffix: "+", label: "Happy Clients" },
  { id: 3, value: 15, suffix: "", label: "Years Experience" },
  { id: 4, value: 2, suffix: "B+", label: "Total Sales Value" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Alexandra Pemberton",
    role: "Homeowner, Manhattan",
    quote:
      "Working with this team transformed our property search from daunting to delightful. Their expertise and genuine care helped us find our perfect Manhattan penthouse within six weeks.",
    rating: 5,
  },
  {
    id: 2,
    name: "James Whitfield",
    role: "Investor, Beverly Hills",
    quote:
      "The level of professionalism and market knowledge is unmatched. They consistently deliver results that exceed expectations. My portfolio has grown significantly thanks to their strategic guidance.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Marchetti",
    role: "Buyer, Miami Beach",
    quote:
      "From the first consultation to the final closing, every detail was handled with elegance and precision. I felt truly supported throughout the entire process. Exceptional service.",
    rating: 5,
  },
];

// ── SVG Icons ────────────────────────────────────────────────────────────────

const IconPin: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconBed: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 4v16" /><path d="M22 4v16" /><path d="M2 8h20" /><path d="M2 16h20" />
    <rect x="6" y="8" width="4" height="8" /><rect x="14" y="8" width="4" height="8" />
  </svg>
);

const IconBath: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="10" y1="5" x2="8" y2="7" /><line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const IconSquare: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);

const IconStar: React.FC<{ size?: number; filled?: boolean }> = ({ size = 18, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? COLORS.gold : "none"} stroke={COLORS.gold} strokeWidth="2" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconSearch: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconPlay: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const IconPhone: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.7 17z" />
  </svg>
);

const IconShield: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconBriefcase: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconAward: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const IconHeart: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const FEATURES: Feature[] = [
  {
    id: 1,
    icon: <IconBriefcase size={32} />,
    title: "Market Expertise",
    description:
      "With 15 years of deep market knowledge, we provide data-driven insights and strategic advice that consistently positions our clients ahead of the curve.",
  },
  {
    id: 2,
    icon: <IconHeart size={32} />,
    title: "Personalized Service",
    description:
      "Every client receives a dedicated advisor who listens, understands your vision, and crafts a bespoke strategy tailored precisely to your unique needs.",
  },
  {
    id: 3,
    icon: <IconAward size={32} />,
    title: "Premium Portfolio",
    description:
      "Access an exclusive curated selection of the most exceptional properties in the world's most desirable locations, from urban penthouses to coastal estates.",
  },
  {
    id: 4,
    icon: <IconShield size={32} />,
    title: "Legal Assistance",
    description:
      "Our in-house legal team ensures every transaction is handled with meticulous precision, safeguarding your investment at every step of the process.",
  },
];

// ── Components ───────────────────────────────────────────────────────────────

const AnimatedCounter: React.FC<{ end: number; suffix: string; duration?: number }> = ({ end, suffix, duration = 2000 }) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-5xl font-bold" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.gold }}>
      {count}
      {suffix}
    </div>
  );
};

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer overflow-hidden rounded-lg"
      style={{ backgroundColor: COLORS.card }}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute left-4 top-4 rounded px-3 py-1.5 text-sm font-semibold"
          style={{ backgroundColor: COLORS.gold, color: COLORS.slate, fontFamily: '"DM Sans", system-ui, sans-serif' }}
        >
          {property.price}
        </div>
        <div
          className="absolute right-4 top-4 rounded px-3 py-1.5 text-xs font-medium"
          style={{ backgroundColor: COLORS.slate, color: COLORS.white, fontFamily: '"DM Sans", system-ui, sans-serif' }}
        >
          {property.status}
        </div>
      </div>

      <div className="p-6">
        <h3
          className="mb-2 text-2xl font-semibold transition-colors group-hover:text-[#c9a84c]"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
        >
          {property.title}
        </h3>
        <div className="mb-4 flex items-center gap-2" style={{ color: COLORS.muted }}>
          <IconPin size={14} />
          <span className="text-sm" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
            {property.location}
          </span>
        </div>

        <div className="mb-6 flex items-center gap-6 border-t pt-4" style={{ borderColor: COLORS.surface, color: COLORS.muted }}>
          <div className="flex items-center gap-2">
            <IconBed size={16} />
            <span className="text-sm" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
              {property.beds} Beds
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconBath size={16} />
            <span className="text-sm" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
              {property.baths} Baths
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconSquare size={16} />
            <span className="text-sm" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
              {property.sqft} sqft
            </span>
          </div>
        </div>

        <button
          className="w-full rounded-lg border py-3 text-sm font-medium transition-all hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d1829]"
          style={{
            borderColor: COLORS.gold,
            color: COLORS.gold,
            fontFamily: '"DM Sans", system-ui, sans-serif',
          }}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const HorizontalPropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex cursor-pointer overflow-hidden rounded-lg"
      style={{ backgroundColor: COLORS.card }}
    >
      <div className="relative w-2/5 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute left-4 top-4 rounded px-3 py-1.5 text-xs font-medium"
          style={{ backgroundColor: COLORS.slate, color: COLORS.white, fontFamily: '"DM Sans", system-ui, sans-serif' }}
        >
          {property.status}
        </div>
      </div>

      <div className="flex w-3/5 flex-col justify-between p-6">
        <div>
          <div
            className="mb-2 text-3xl font-bold"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.gold }}
          >
            {property.price}
          </div>
          <h3
            className="mb-2 text-xl font-semibold transition-colors group-hover:text-[#c9a84c]"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
          >
            {property.title}
          </h3>
          <div className="mb-4 flex items-center gap-2" style={{ color: COLORS.muted }}>
            <IconPin size={14} />
            <span className="text-sm" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
              {property.location}
            </span>
          </div>

          <div className="flex items-center gap-6" style={{ color: COLORS.muted }}>
            <div className="flex items-center gap-2">
              <IconBed size={16} />
              <span className="text-sm" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
                {property.beds} Beds
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IconBath size={16} />
              <span className="text-sm" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
                {property.baths} Baths
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IconSquare size={16} />
              <span className="text-sm" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
                {property.sqft} sqft
              </span>
            </div>
          </div>
        </div>

        <button
          className="mt-4 rounded-lg border px-6 py-2.5 text-sm font-medium transition-all hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d1829]"
          style={{
            borderColor: COLORS.gold,
            color: COLORS.gold,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            alignSelf: "flex-start",
          }}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

// ── Section: Hero ────────────────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${COLORS.slate} 0%, ${COLORS.navy} 50%, ${COLORS.surface} 100%)` }}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 75% 75%, #c9a84c 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-5">
          {/* Left column — 60% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div
              className="mb-6 inline-flex items-center gap-3 rounded-full px-4 py-2"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", border: `1px solid ${COLORS.gold}` }}
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.gold }} />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: COLORS.gold, fontFamily: '"DM Sans", system-ui, sans-serif' }}
              >
                Premier Real Estate Agency
              </span>
            </div>

            <h1
              className="mb-4 text-6xl font-semibold leading-tight lg:text-7xl"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
            >
              Discover Your
              <br />
              <span style={{ color: COLORS.gold }}>Dream Property</span>
            </h1>

            <div className="mb-8 h-1 w-24 rounded-full" style={{ backgroundColor: COLORS.gold }} />

            <p
              className="mb-10 max-w-xl text-lg leading-relaxed"
              style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              Explore an exclusive collection of the world's finest properties. From iconic urban penthouses to serene coastal estates, we connect discerning buyers with exceptional homes.
            </p>

            <div
              className="mb-10 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row"
              style={{ backgroundColor: "rgba(30,45,69,0.8)", border: `1px solid rgba(201,168,76,0.2)` }}
            >
              <div className="flex-1">
                <label
                  className="mb-2 block text-xs font-medium uppercase tracking-widest"
                  style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
                  htmlFor="hero-location"
                >
                  Location
                </label>
                <input
                  id="hero-location"
                  type="text"
                  placeholder="Enter city or ZIP..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg bg-transparent px-4 py-3 text-sm outline-none placeholder:opacity-50 focus:ring-1"
                  style={{
                    color: COLORS.white,
                    border: `1px solid rgba(148,163,184,0.2)`,
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                  }}
                />
              </div>
              <div className="w-full sm:w-48">
                <label
                  className="mb-2 block text-xs font-medium uppercase tracking-widest"
                  style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
                  htmlFor="hero-type"
                >
                  Property Type
                </label>
                <select
                  id="hero-type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-1"
                  style={{
                    backgroundColor: COLORS.card,
                    color: COLORS.white,
                    border: `1px solid rgba(148,163,184,0.2)`,
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                  }}
                >
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:brightness-110"
                  style={{
                    backgroundColor: COLORS.gold,
                    color: COLORS.slate,
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                  }}
                >
                  <IconSearch size={18} />
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-sm font-semibold transition-all hover:brightness-110"
                style={{
                  backgroundColor: COLORS.gold,
                  color: COLORS.slate,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              >
                Explore Properties
              </Link>
              <button
                className="inline-flex items-center justify-center gap-3 rounded-lg border px-8 py-4 text-sm font-semibold transition-all hover:bg-white/5"
                style={{
                  borderColor: COLORS.gold,
                  color: COLORS.white,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: COLORS.gold }}
                >
                  <IconPlay size={14} />
                </span>
                Watch Our Story
              </button>
            </div>
          </motion.div>

          {/* Right column — 40% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:col-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80"
                alt="Luxury property"
                className="h-[600px] w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(13,24,41,0.6) 100%)" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 rounded-xl px-6 py-5 shadow-2xl"
              style={{ backgroundColor: COLORS.card, border: `1px solid rgba(201,168,76,0.3)` }}
            >
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.gold }}
                  >
                    500+
                  </div>
                  <div className="text-xs" style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}>
                    Properties
                  </div>
                </div>
                <div className="h-10 w-px" style={{ backgroundColor: "rgba(148,163,184,0.2)" }} />
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.gold }}
                  >
                    15 Yrs
                  </div>
                  <div className="text-xs" style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}>
                    Experience
                  </div>
                </div>
                <div className="h-10 w-px" style={{ backgroundColor: "rgba(148,163,184,0.2)" }} />
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.gold }}
                  >
                    $2B
                  </div>
                  <div className="text-xs" style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}>
                    Sales
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Section: Quick Search Tabs ────────────────────────────────────────────────

const QuickSearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Buy" | "Rent" | "Commercial">("Buy");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");

  const tabs: Array<"Buy" | "Rent" | "Commercial"> = ["Buy", "Rent", "Commercial"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20"
      style={{ backgroundColor: COLORS.surface }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl p-1" style={{ backgroundColor: COLORS.card }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="rounded-lg px-8 py-3 text-sm font-semibold transition-all"
                style={{
                  backgroundColor: activeTab === tab ? COLORS.gold : "transparent",
                  color: activeTab === tab ? COLORS.slate : COLORS.muted,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: COLORS.card, border: `1px solid rgba(201,168,76,0.15)` }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                className="mb-2 block text-xs font-medium uppercase tracking-widest"
                style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
                htmlFor="qs-location"
              >
                Location
              </label>
              <input
                id="qs-location"
                type="text"
                placeholder="City, neighborhood..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#c9a84c]"
                style={{
                  backgroundColor: COLORS.surface,
                  color: COLORS.white,
                  border: `1px solid rgba(148,163,184,0.15)`,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              />
            </div>
            <div>
              <label
                className="mb-2 block text-xs font-medium uppercase tracking-widest"
                style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
                htmlFor="qs-price"
              >
                Price Range
              </label>
              <select
                id="qs-price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#c9a84c]"
                style={{
                  backgroundColor: COLORS.surface,
                  color: COLORS.white,
                  border: `1px solid rgba(148,163,184,0.15)`,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              >
                <option value="">Any Price</option>
                <option value="0-500k">Up to $500,000</option>
                <option value="500k-1m">$500K – $1M</option>
                <option value="1m-3m">$1M – $3M</option>
                <option value="3m-5m">$3M – $5M</option>
                <option value="5m+">$5M+</option>
              </select>
            </div>
            <div>
              <label
                className="mb-2 block text-xs font-medium uppercase tracking-widest"
                style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
                htmlFor="qs-beds"
              >
                Bedrooms
              </label>
              <select
                id="qs-beds"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#c9a84c]"
                style={{
                  backgroundColor: COLORS.surface,
                  color: COLORS.white,
                  border: `1px solid rgba(148,163,184,0.15)`,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div>
              <label
                className="mb-2 block text-xs font-medium uppercase tracking-widest"
                style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
                htmlFor="qs-type"
              >
                Type
              </label>
              <select
                id="qs-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#c9a84c]"
                style={{
                  backgroundColor: COLORS.surface,
                  color: COLORS.white,
                  border: `1px solid rgba(148,163,184,0.15)`,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              >
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="flex items-center gap-3 rounded-xl px-10 py-4 text-sm font-semibold transition-all hover:brightness-110"
              style={{
                backgroundColor: COLORS.gold,
                color: COLORS.slate,
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}
            >
              <IconSearch size={18} />
              Search Properties
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// ── Section: Featured Properties ─────────────────────────────────────────────

const FeaturedPropertiesSection: React.FC = () => {
  return (
    <section className="py-24" style={{ backgroundColor: COLORS.slate }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: COLORS.gold, fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            Handpicked for You
          </p>
          <h2
            className="mb-4 text-5xl font-semibold"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
          >
            Premium Listings
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full" style={{ backgroundColor: COLORS.gold }} />
          <p
            className="mx-auto max-w-2xl text-base leading-relaxed"
            style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            Each property in our portfolio is personally vetted and represents the pinnacle of architectural excellence and lifestyle luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 rounded-xl border px-10 py-4 text-sm font-semibold transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-[#0d1829]"
            style={{
              borderColor: COLORS.gold,
              color: COLORS.gold,
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }}
          >
            View All Properties
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ── Section: Stats Counter ────────────────────────────────────────────────────

const StatsSection: React.FC = () => {
  return (
    <section
      className="py-24"
      style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.surface} 100%)` }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="text-4xl font-semibold"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
          >
            Our Track Record Speaks for Itself
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: COLORS.card, border: `1px solid rgba(201,168,76,0.15)` }}
            >
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p
                className="mt-3 text-sm font-medium"
                style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Section: Why Choose Us ────────────────────────────────────────────────────

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-24" style={{ backgroundColor: COLORS.surface }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: COLORS.gold, fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            Excellence in Service
          </p>
          <h2
            className="mb-4 text-5xl font-semibold"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
          >
            Why Choose Us
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full" style={{ backgroundColor: COLORS.gold }} />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl p-8 text-center transition-all hover:scale-105"
              style={{ backgroundColor: COLORS.card, border: `1px solid rgba(201,168,76,0.15)` }}
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3
                className="mb-3 text-xl font-semibold"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Section: Recent Listings ──────────────────────────────────────────────────

const RecentListingsSection: React.FC = () => {
  return (
    <section className="py-24" style={{ backgroundColor: COLORS.slate }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: COLORS.gold, fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              Just Added
            </p>
            <h2
              className="text-5xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
            >
              Recent Listings
            </h2>
          </div>
          <Link
            to="/properties"
            className="hidden rounded-lg border px-6 py-3 text-sm font-semibold transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-[#0d1829] md:block"
            style={{
              borderColor: COLORS.gold,
              color: COLORS.gold,
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }}
          >
            View All
          </Link>
        </motion.div>

        <div className="space-y-8">
          {RECENT_LISTINGS.map((property) => (
            <HorizontalPropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Section: Testimonials ─────────────────────────────────────────────────────

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24" style={{ backgroundColor: COLORS.surface }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: COLORS.gold, fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            Client Stories
          </p>
          <h2
            className="mb-4 text-5xl font-semibold"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.white }}
          >
            What Our Clients Say
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full" style={{ backgroundColor: COLORS.gold }} />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col justify-between rounded-2xl p-8"
              style={{ backgroundColor: COLORS.card, border: `1px solid rgba(201,168,76,0.15)` }}
            >
              <div>
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <IconStar key={i} size={18} filled={true} />
                  ))}
                </div>
                <p
                  className="mb-8 text-base italic leading-relaxed"
                  style={{ color: COLORS.white, fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "1.1rem" }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                  style={{ backgroundColor: COLORS.gold, color: COLORS.slate, fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div
                    className="font-semibold"
                    style={{ color: COLORS.white, fontFamily: '"DM Sans", system-ui, sans-serif' }}
                  >
                    {testimonial.name}
                  </div>
                  <div className="text-xs" style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Section: CTA ──────────────────────────────────────────────────────────────

const CTASection: React.FC = () => {
  const [formName, setFormName] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formInterest, setFormInterest] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formName.trim() && formPhone.trim() && formInterest) {
      setSubmitted(true);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-28"
      style={{ background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldLight} 50%, ${COLORS.gold} 100%)` }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2
          className="mb-4 text-5xl font-semibold"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.slate }}
        >
          Ready to Find Your Dream Home?
        </h2>
        <p
          className="mb-12 text-lg"
          style={{ color: "rgba(13,24,41,0.75)", fontFamily: '"DM Sans", system-ui, sans-serif' }}
        >
          Let our expert advisors guide you to the perfect property. Fill in your details and we will be in touch within 24 hours.
        </p>

        {submitted ? (
          <div
            className="mx-auto max-w-md rounded-2xl p-10"
            style={{ backgroundColor: COLORS.slate }}
          >
            <div
              className="mb-4 text-3xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: COLORS.gold }}
            >
              Thank You, {formName}!
            </div>
            <p className="text-sm" style={{ color: COLORS.muted, fontFamily: '"DM Sans", system-ui, sans-serif' }}>
              One of our advisors will contact you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row"
            noValidate
          >
            <input
              type="text"
              placeholder="Your Full Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
              className="flex-1 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]"
              style={{
                backgroundColor: COLORS.slate,
                color: COLORS.white,
                border: "none",
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}
              aria-label="Full name"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
              required
              className="flex-1 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]"
              style={{
                backgroundColor: COLORS.slate,
                color: COLORS.white,
                border: "none",
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}
              aria-label="Phone number"
            />
            <select
              value={formInterest}
              onChange={(e) => setFormInterest(e.target.value)}
              required
              className="flex-1 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]"
              style={{
                backgroundColor: COLORS.slate,
                color: formInterest ? COLORS.white : COLORS.muted,
                border: "none",
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}
              aria-label="Interest"
            >
              <option value="" disabled>
                I am interested in...
              </option>
              <option value="buying">Buying a Property</option>
              <option value="renting">Renting a Property</option>
              <option value="selling">Selling a Property</option>
              <option value="investing">Property Investment</option>
              <option value="valuation">Free Valuation</option>
            </select>
            <button
              type="submit"
              className="rounded-xl px-8 py-4 text-sm font-bold transition-all hover:brightness-90"
              style={{
                backgroundColor: COLORS.navy,
                color: COLORS.white,
                fontFamily: '"DM Sans", system-ui, sans-serif',
                whiteSpace: "nowrap",
              }}
            >
              Get in Touch
            </button>
          </form>
        )}

        <div className="mt-10 flex items-center justify-center gap-3">
          <span style={{ color: "rgba(13,24,41,0.6)", fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: "0.875rem" }}>
            Prefer to speak directly?
          </span>
          <a
            href="tel:+18005551234"
            className="inline-flex items-center gap-2 font-bold underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-75"
            style={{ color: COLORS.slate, fontFamily: '"DM Sans", system-ui, sans-serif' }}
            aria-label="Call us now"
          >
            <IconPhone size={16} />
            Call Us Now: +1 (800) 555-1234
          </a>
        </div>
      </div>
    </motion.section>
  );
};

// ── Page: HomePage ────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  return (
    <main style={{ backgroundColor: COLORS.slate, minHeight: "100vh" }}>
      <HeroSection />
      <QuickSearchSection />
      <FeaturedPropertiesSection />
      <StatsSection />
      <WhyChooseUsSection />
      <RecentListingsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
