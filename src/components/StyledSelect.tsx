'use client'

import { useEffect, useRef, useState } from 'react'

type Option = { value: string; label: string }

export default function StyledSelect({
  value,
  onChange,
  options,
  className = '',
}: {
  value: string
  onChange: (v: string) => void
  options: Option[]
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  const current = options.find((o) => o.value === value) ?? options[0]!

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return
      const t = e.target as Node
      if (!btnRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const select = (v: string) => {
    onChange(v)
    setOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full rounded-full border border-[#8B9B5C] bg-white px-4 md:px-5 py-2 md:py-3 pr-12
                   text-left text-xl md:text-2xl text-black shadow transition-colors duration-200 !font-ivar
                   hover:bg-[#8B9B5C] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#8B9B5C]/40"
      >
        {current.label}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <svg width="20" height="20" viewBox="0 0 20 20" className="block">
            <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border  border-[#8B9B5C] bg-white shadow-lg"
        >
          {options.map((opt) => {
            const active = opt.value === value
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(opt.value)}
                  className={`block w-full px-4 py-3 text-left text-base md:text-lg !font-ivar
                              ${active ? 'bg-[#8B9B5C] text-white' : 'text-black'}
                              hover:bg-[#8B9B5C] hover:text-white transition-colors`}
                >
                  {opt.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
