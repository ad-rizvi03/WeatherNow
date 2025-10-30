import React from 'react'

export function SunIcon({className=''}){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" fill="#F59E0B" />
      <g stroke="#F59E0B" strokeWidth="1.2">
        <path d="M12 1v2" />
        <path d="M12 21v2" />
        <path d="M4.2 4.2l1.4 1.4" />
        <path d="M18.4 18.4l1.4 1.4" />
        <path d="M1 12h2" />
        <path d="M21 12h2" />
        <path d="M4.2 19.8l1.4-1.4" />
        <path d="M18.4 5.6l1.4-1.4" />
      </g>
    </svg>
  )
}

export function CloudIcon({className=''}){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 18h10a4 4 0 0 0 0-8 5 5 0 0 0-9.9 1A3.5 3.5 0 0 0 7 18z" fill="#94A3B8" />
    </svg>
  )
}

export function RainIcon({className=''}){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 13h10a4 4 0 0 0 0-8 5 5 0 0 0-9.9 1A3.5 3.5 0 0 0 7 13z" fill="#64748B" />
      <g fill="#3B82F6">
        <path d="M9 18c0 1-1 2-1 2s-1-1-1-2 1-2 1-2 1 1 1 2z"/>
        <path d="M13 18c0 1-1 2-1 2s-1-1-1-2 1-2 1-2 1 1 1 2z"/>
        <path d="M17 18c0 1-1 2-1 2s-1-1-1-2 1-2 1-2 1 1 1 2z"/>
      </g>
    </svg>
  )
}

export function SnowIcon({className=''}){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 13h10a4 4 0 0 0 0-8 5 5 0 0 0-9.9 1A3.5 3.5 0 0 0 7 13z" fill="#CBD5E1" />
      <g stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round">
        <path d="M12 15v4" />
        <path d="M10 17h4" />
        <path d="M11 16l2 2" />
        <path d="M13 16l-2 2" />
      </g>
    </svg>
  )
}

export function ThunderIcon({className=''}){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 13h10a4 4 0 0 0 0-8 5 5 0 0 0-9.9 1A3.5 3.5 0 0 0 7 13z" fill="#7C3AED" />
      <path d="M13 11l-2 4h3l-3 6" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FogIcon({className=''}){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 16h18" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 20h14" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 12h10" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconForCode({code, className=''}){
  if (code === 0) return <SunIcon className={className} />
  if ([1,2,3].includes(code)) return <CloudIcon className={className} />
  if ([45,48].includes(code)) return <FogIcon className={className} />
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <RainIcon className={className} />
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <SnowIcon className={className} />
  if (code >= 95) return <ThunderIcon className={className} />
  return <CloudIcon className={className} />
}

export default IconForCode
