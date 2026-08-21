import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ────────────────────────────────────────────────────────────────────

type PropertyType = 'Apartment' | 'Villa' | 'House' | 'Commercial' | 'Land'
type BedroomOption = '1' | '2' | '3' | '4' | '5+'
type AmenityOption = 'Pool' | 'Gym' | 'Parking' | 'Garden'
type LocationOption =
  | 'New York'
  | 'Los Angeles'
  | 'Miami'
  | 'Chicago'
  | 'San Francisco'

interface Property {
  id: number
  title: string
  location: string
  city: string
  price: number
  priceLabel: string
  type: PropertyType
  beds: number
  baths: number
  sqft: number
  image: string
  agent: string
  amenities: AmenityOption[]
}

interface Filters {
  types: PropertyType[]
  bedrooms: BedroomOption | null
  amenities: AmenityOption[]
  location: LocationOption | ''
}

// ── Data ─────────────────────────────────────────────────────────────────────

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Meridian Penthouse',
    location: 'Manhattan, NY',
    city: 'New York',
    price: 4250000,
    priceLabel: '$4.25M',
    type: 'Apartment',
    beds: 4,
    baths: 4,
    sqft: 4200,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    agent: 'Alexandra Reid',
    amenities: ['Pool', 'Gym', 'Parking'],
  },
  {
    id: 2,
    title: 'Villa Serenita',
    location: 'Beverly Hills, CA',
    city: 'Los Angeles',
    price: 7800000,
    priceLabel: '$7.8M',
    type: 'Villa',
    beds: 6,
    baths: 7,
    sqft: 8500,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    agent: 'Marcus Chen',
    amenities: ['Pool', 'Gym', 'Parking', 'Garden'],
  },
  {
    id: 3,
    title: 'Harbor View',
    location: 'Miami Beach, FL',
    city: 'Miami',
    price: 2100000,
    priceLabel: '$2.1M',
    type: 'Apartment',
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    agent: 'Sophia Laurent',
    amenities: ['Pool', 'Gym', 'Parking'],
  },
  {
    id: 4,
    title: 'Whitmore Estate',
    location: 'Greenwich, CT',
    city: 'New York',
    price: 5500000,
    priceLabel: '$5.5M',
    type: 'House',
    beds: 5,
    baths: 6,
    sqft: 7200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    agent: 'James Whitfield',
    amenities: ['Pool', 'Garden', 'Parking'],
  },
  {
    id: 5,
    title: 'Skyline Loft 42A',
    location: 'Chicago, IL',
    city: 'Chicago',
    price: 890000,
    priceLabel: '$890K',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: 1900,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
    agent: 'Natalie Brooks',
    amenities: ['Gym', 'Parking'],
  },
  {
    id: 6,
    title: 'Pacific Heights Manor',
    location: 'San Francisco, CA',
    city: 'San Francisco',
    price: 3750000,
    priceLabel: '$3.75M',
    type: 'House',
    beds: 4,
    baths: 5,
    sqft: 5100,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    agent: 'Daniel Osei',
    amenities: ['Garden', 'Parking'],
  },
  {
    id: 7,
    title: 'Brickell Bay Tower 15C',
    location: 'Miami, FL',
    city: 'Miami',
    price: 1450000,
    priceLabel: '$1.45M',
    type: 'Apartment',
    beds: 3,
    baths: 2,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    agent: 'Isabella Moreno',
    amenities: ['Pool', 'Gym', 'Parking'],
  },
  {
    id: 8,
    title: 'Malibu Oceanfront Estate',
    location: 'Malibu, CA',
    city: 'Los Angeles',
    price: 12500000,
    priceLabel: '$12.5M',
    type: 'Villa',
    beds: 7,
    baths: 8,
    sqft: 10200,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
    agent: 'Thomas Hargrove',
    amenities: ['Pool', 'Gym', 'Parking', 'Garden'],
  },
  {
    id: 9,
    title: 'The Kensington',
    location: 'Upper East Side, NY',
    city: 'New York',
    price: 2850000,
    priceLabel: '$2.85M',
    type: 'Apartment',
    beds: 3,
    baths: 3,
    sqft: 2400,
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&q=80',
    agent: 'Victoria Ashford',
    amenities: ['Gym', 'Parking'],
  },
  {
    id: 10,
    title: 'Wilshire Corridor Penthouse',
    location: 'Los Angeles, CA',
    city: 'Los Angeles',
    price: 6200000,
    priceLabel: '$6.2M',
    type: 'Apartment',
    beds: 4,
    baths: 4,
    sqft: 4800,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
    agent: 'Marcus Chen',
    amenities: ['Pool', 'Gym', 'Parking'],
  },
  {
    id: 11,
    title: 'Green Acres Estate',
    location: 'Westchester, NY',
    city: 'New York',
    price: 3100000,
    priceLabel: '$3.1M',
    type: 'House',
    beds: 5,
    baths: 4,
    sqft: 6000,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    agent: 'Eleanor Vance',
    amenities: ['Pool', 'Garden', 'Parking'],
  },
  {
    id: 12,
    title: 'Downtown Loft District',
    location: 'Chicago, IL',
    city: 'Chicago',
    price: 675000,
    priceLabel: '$675K',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: 1600,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&q=80',
    agent: 'Natalie Brooks',
    amenities: ['Gym', 'Parking'],
  },
]

const PROPERTY_TYPES: PropertyType[] = ['Apartment', 'Villa', 'House', 'Commercial', 'Land']
const BEDROOM_OPTIONS: BedroomOption[] = ['1', '2', '3', '4', '5+']
const AMENITY_OPTIONS: AmenityOption[] = ['Pool', 'Gym', 'Parking', 'Garden']
const LOCATION_OPTIONS: LocationOption[] = [
  'New York',
  'Los Angeles',
  'Miami',
  'Chicago',
  'San Francisco',
]

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
}

const heroVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const sidebarVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
  },
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
    </svg>
  )
}

function BathIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="10" y1="5" x2="8" y2="7" /><line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  )
}

function AreaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function AgentIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}

// ── Property Card ─────────────────────────────────────────────────────────────

interface PropertyCardProps {
  property: Property
}

function PropertyCard({ property }: PropertyCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      variants={cardVariants}
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: '#1e2d45',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(201,168,76,0.12)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.3)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <motion.img
          src={property.image}
          alt={property.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading="lazy"
        />
        {/* Price badge */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
            color: '#0f1f3d',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '15px',
            fontWeight: 700,
            padding: '5px 12px',
            borderRadius: '6px',
            letterSpacing: '0.02em',
          }}
        >
          {property.priceLabel}
        </div>
        {/* Type badge */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(13,24,41,0.85)',
            backdropFilter: 'blur(8px)',
            color: '#e6c97e',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            padding: '4px 10px',
            borderRadius: '100px',
            border: '1px solid rgba(201,168,76,0.3)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {property.type}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
        {/* Title */}
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '20px',
            fontWeight: 600,
            color: '#f8fafc',
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {property.title}
        </h3>

        {/* Location */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#94a3b8',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
          }}
        >
          <LocationPinIcon />
          <span>{property.location}</span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />

        {/* Specs */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            color: '#94a3b8',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BedIcon />
            <span style={{ color: '#f8fafc', fontWeight: 500 }}>{property.beds}</span> Beds
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BathIcon />
            <span style={{ color: '#f8fafc', fontWeight: 500 }}>{property.baths}</span> Baths
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <AreaIcon />
            <span style={{ color: '#f8fafc', fontWeight: 500 }}>{property.sqft.toLocaleString()}</span> sqft
          </span>
        </div>

        {/* Agent */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#94a3b8',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '12px',
            marginTop: 'auto',
          }}
        >
          <AgentIcon />
          <span>Agent: <span style={{ color: '#c9a84c' }}>{property.agent}</span></span>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '11px',
            background: 'transparent',
            border: '1px solid rgba(201,168,76,0.5)',
            borderRadius: '8px',
            color: '#c9a84c',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 0.2s, border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget
            btn.style.background = 'linear-gradient(135deg, #c9a84c, #e6c97e)'
            btn.style.borderColor = '#c9a84c'
            btn.style.color = '#0f1f3d'
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget
            btn.style.background = 'transparent'
            btn.style.borderColor = 'rgba(201,168,76,0.5)'
            btn.style.color = '#c9a84c'
          }}
          aria-label={`View details for ${property.title}`}
        >
          View Details
        </motion.button>
      </div>
    </motion.article>
  )
}

// ── Filter Sidebar ────────────────────────────────────────────────────────────

interface FilterSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  onReset: () => void
}

function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  function toggleType(type: PropertyType) {
    const next = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type]
    onChange({ ...filters, types: next })
  }

  function toggleAmenity(amenity: AmenityOption) {
    const next = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    onChange({ ...filters, amenities: next })
  }

  function setBedrooms(bed: BedroomOption) {
    onChange({ ...filters, bedrooms: filters.bedrooms === bed ? null : bed })
  }

  function setLocation(loc: LocationOption | '') {
    onChange({ ...filters, location: loc })
  }

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: '16px',
    fontWeight: 600,
    color: '#f8fafc',
    marginBottom: '12px',
    letterSpacing: '0.02em',
  }

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontFamily: '"DM Sans", system-ui, sans-serif',
    fontSize: '13px',
    color: '#94a3b8',
    padding: '4px 0',
    transition: 'color 0.2s',
  }

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      style={{
        width: '280px',
        flexShrink: 0,
        background: '#1e2d45',
        border: '1px solid rgba(201,168,76,0.12)',
        borderRadius: '16px',
        padding: '28px 24px',
        height: 'fit-content',
        position: 'sticky',
        top: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '20px',
            fontWeight: 700,
            color: '#f8fafc',
            margin: 0,
          }}
        >
          Filter
        </h2>
        <button
          onClick={onReset}
          style={{
            background: 'none',
            border: 'none',
            color: '#c9a84c',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '12px',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            padding: 0,
          }}
        >
          Reset all
        </button>
      </div>

      {/* Price Range */}
      <div>
        <p style={sectionHeadingStyle}>Price Range</p>
        <div
          style={{
            background: 'rgba(13,24,41,0.5)',
            borderRadius: '10px',
            padding: '14px 16px',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '13px', color: '#94a3b8' }}>$0</span>
            <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '13px', color: '#94a3b8' }}>$10,000,000</span>
          </div>
          <div
            style={{
              height: '4px',
              background: 'linear-gradient(90deg, #c9a84c, #e6c97e)',
              borderRadius: '2px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '12px',
                height: '12px',
                background: '#c9a84c',
                borderRadius: '50%',
                border: '2px solid #1e2d45',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translate(50%, -50%)',
                width: '12px',
                height: '12px',
                background: '#e6c97e',
                borderRadius: '50%',
                border: '2px solid #1e2d45',
              }}
            />
          </div>
          <p
            style={{
              textAlign: 'center',
              marginTop: '12px',
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '15px',
              fontWeight: 600,
              color: '#c9a84c',
            }}
          >
            $0 – $10,000,000
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />

      {/* Property Type */}
      <div>
        <p style={sectionHeadingStyle}>Property Type</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PROPERTY_TYPES.map((type) => {
            const checked = filters.types.includes(type)
            return (
              <label
                key={type}
                style={{ ...labelStyle, color: checked ? '#f8fafc' : '#94a3b8' }}
              >
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    border: checked ? '2px solid #c9a84c' : '2px solid rgba(148,163,184,0.4)',
                    background: checked ? '#c9a84c' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                >
                  {checked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#0f1f3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleType(type)}
                  style={{ display: 'none' }}
                  aria-label={`Filter by ${type}`}
                />
                {type}
              </label>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />

      {/* Bedrooms */}
      <div>
        <p style={sectionHeadingStyle}>Bedrooms</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {BEDROOM_OPTIONS.map((bed) => {
            const active = filters.bedrooms === bed
            return (
              <button
                key={bed}
                onClick={() => setBedrooms(bed)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: active ? '2px solid #c9a84c' : '1px solid rgba(148,163,184,0.25)',
                  background: active ? 'rgba(201,168,76,0.15)' : 'transparent',
                  color: active ? '#c9a84c' : '#94a3b8',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                aria-pressed={active}
                aria-label={`${bed} bedrooms`}
              >
                {bed}
              </button>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />

      {/* Amenities */}
      <div>
        <p style={sectionHeadingStyle}>Amenities</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {AMENITY_OPTIONS.map((amenity) => {
            const checked = filters.amenities.includes(amenity)
            return (
              <label
                key={amenity}
                style={{ ...labelStyle, color: checked ? '#f8fafc' : '#94a3b8' }}
              >
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    border: checked ? '2px solid #c9a84c' : '2px solid rgba(148,163,184,0.4)',
                    background: checked ? '#c9a84c' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                >
                  {checked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#0f1f3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAmenity(amenity)}
                  style={{ display: 'none' }}
                  aria-label={`Filter by ${amenity}`}
                />
                {amenity}
              </label>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />

      {/* Location */}
      <div>
        <p style={sectionHeadingStyle}>Location</p>
        <select
          value={filters.location}
          onChange={(e) => setLocation(e.target.value as LocationOption | '')}
          style={{
            width: '100%',
            padding: '10px 14px',
            background: 'rgba(13,24,41,0.6)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '8px',
            color: filters.location ? '#f8fafc' : '#94a3b8',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: '13px',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
          }}
          aria-label="Filter by location"
        >
          <option value="">All Locations</option>
          {LOCATION_OPTIONS.map((loc) => (
            <option key={loc} value={loc} style={{ background: '#1e2d45', color: '#f8fafc' }}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </motion.aside>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const DEFAULT_FILTERS: Filters = {
  types: [],
  bedrooms: null,
  amenities: [],
  location: '',
}

export default function PropertiesPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (filters.types.length > 0 && !filters.types.includes(p.type)) return false

      if (filters.bedrooms !== null) {
        if (filters.bedrooms === '5+') {
          if (p.beds < 5) return false
        } else {
          if (p.beds !== parseInt(filters.bedrooms, 10)) return false
        }
      }

      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((a) => p.amenities.includes(a))
      )
        return false

      if (filters.location !== '' && p.city !== filters.location) return false

      return true
    })
  }, [filters])

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0d1829',
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      {/* ── Hero Banner ── */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #0d1829 0%, #162033 50%, #0f1f3d 100%)',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Decorative grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '72px 40px 64px',
          }}
        >
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: 0,
                  padding: 0,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '13px',
                }}
              >
                <li>
                  <Link
                    to="/"
                    style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a84c')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </li>
                <li>
                  <span
                    style={{ color: '#c9a84c', fontWeight: 500 }}
                    aria-current="page"
                  >
                    Properties
                  </span>
                </li>
              </ol>
            </nav>

            {/* Heading */}
            <h1
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                color: '#f8fafc',
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              All{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Properties
              </span>
            </h1>

            <p
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: '16px',
                color: '#94a3b8',
                maxWidth: '480px',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Explore our curated portfolio of exceptional residences and estates across the nation's most prestigious addresses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '48px 40px 80px',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
        }}
      >
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Results bar */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '28px',
            }}
          >
            <p
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: '14px',
                color: '#94a3b8',
                margin: 0,
              }}
            >
              Showing{' '}
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'property' : 'properties'}
              {filtered.length < PROPERTIES.length && (
                <span> of {PROPERTIES.length}</span>
              )}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '13px',
                  color: '#94a3b8',
                }}
              >
                Sort:
              </span>
              <select
                style={{
                  background: '#1e2d45',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '6px',
                  color: '#f8fafc',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '13px',
                  padding: '6px 28px 6px 10px',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px center',
                }}
                aria-label="Sort properties"
                defaultValue="featured"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="sqft-desc">Largest First</option>
              </select>
            </div>
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                }}
              >
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '320px',
                  gap: '16px',
                  background: '#1e2d45',
                  borderRadius: '16px',
                  border: '1px dashed rgba(201,168,76,0.2)',
                  padding: '48px',
                  textAlign: 'center',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(201,168,76,0.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  <path d="M8 11h6M11 8v6" />
                </svg>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#f8fafc',
                    margin: 0,
                  }}
                >
                  No properties found
                </h3>
                <p
                  style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#94a3b8',
                    maxWidth: '320px',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Try adjusting your filters to discover more available properties.
                </p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  style={{
                    marginTop: '8px',
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #c9a84c, #e6c97e)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#0f1f3d',
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
