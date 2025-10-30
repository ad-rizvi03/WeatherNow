import React from 'react'

// Simple inline SVG logo for Weather Now
export default function Logo({ className = '' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="48"
      height="48"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      {/* round badge */}
      <circle cx="32" cy="32" r="30" fill="url(#g1)" />

      {/* sun/moon + cloud motif */}
      <g transform="translate(8,8)">
        <circle cx="20" cy="8" r="6" fill="#FFE082" opacity="0.95" />
        <path d="M4 28a10 10 0 0 1 10-10h18a8 8 0 0 1 0 16H8a6 6 0 0 1-4-6z" fill="#FFFFFF" opacity="0.92" />
      </g>
    </svg>
  )
}
