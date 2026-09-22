type TechnologyIconProps = {
  name: 'motion' | 'react' | 'tailwind' | 'tanstack' | 'typescript'
}

export function TechnologyIcon({ name }: TechnologyIconProps) {
  if (name === 'react') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#087ea4]">
        <circle cx="12" cy="12" r="1.75" fill="currentColor" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          stroke="currentColor"
          strokeWidth="1.35"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          stroke="currentColor"
          strokeWidth="1.35"
          transform="rotate(120 12 12)"
        />
      </svg>
    )
  }

  if (name === 'typescript') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <rect width="24" height="24" rx="4" fill="#3178c6" />
        <path fill="#fff" d="M4.2 6.2h9.1v2.1H10v9.5H7.5V8.3H4.2V6.2Z" />
        <path
          fill="#fff"
          d="M13.7 16.6 15 15c.7.6 1.5 1 2.5 1 .8 0 1.3-.3 1.3-.8 0-.5-.3-.7-1.7-1.3-2-.7-3-1.6-3-3.2 0-1.8 1.4-3 3.6-3 1.4 0 2.5.4 3.4 1.2L20 10.6c-.7-.5-1.4-.8-2.2-.8-.8 0-1.2.3-1.2.8 0 .5.4.7 1.8 1.3 2.1.8 2.9 1.7 2.9 3.2 0 1.9-1.5 3.1-3.9 3.1-1.5 0-2.9-.5-3.7-1.6Z"
        />
      </svg>
    )
  }

  if (name === 'tanstack') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="m5.2 8.2 3.1-4h7.4l3.1 4-3 2.1-2-2.7h-3.6l-2 2.7-3-2.1Z"
          fill="#ef4444"
        />
        <path
          d="m4.1 11.7 3-3.1 3 2.2h3.8l3-2.2 3 3.1-4.2 3H8.3l-4.2-3Z"
          fill="#f59e0b"
        />
        <path d="M5.2 14h13.6l-2.1 5.8H7.3L5.2 14Z" fill="#111827" />
      </svg>
    )
  }

  if (name === 'tailwind') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#06b6d4]">
        <path
          fill="currentColor"
          d="M12 5.2c-3.1 0-5 1.5-5.8 4.5 1.2-1.5 2.6-2 4.2-1.6.9.2 1.5.9 2.2 1.6 1.1 1.1 2.4 2.4 5.2 2.4 3.1 0 5-1.5 5.8-4.5-1.2 1.5-2.6 2-4.2 1.6-.9-.2-1.5-.9-2.2-1.6C16.1 6.5 14.8 5.2 12 5.2Zm-5.8 6.7c-3.1 0-5 1.5-5.8 4.5 1.2-1.5 2.6-2 4.2-1.6.9.2 1.5.9 2.2 1.6 1.1 1.1 2.4 2.4 5.2 2.4 3.1 0 5-1.5 5.8-4.5-1.2 1.5-2.6 2-4.2 1.6-.9-.2-1.5-.9-2.2-1.6-1.1-1.1-2.4-2.4-5.2-2.4Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect width="24" height="24" rx="4" fill="#f5e90a" />
      <path
        d="M4.5 16.8 9.2 7h4.1l-4.7 9.8H4.5Zm5.8 0L15 7h4.5l-4.7 9.8h-4.5Z"
        fill="#111827"
      />
    </svg>
  )
}
