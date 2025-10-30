'use client'

import { useEffect } from 'react'
import { CTAButton } from '@/components/CTAButton'
import { CMSLink } from '@/components/Link'

type TwoColumnCTAProps = {
  title: string
  button?: { label: string; url: string }
  paragraph?: unknown // accept unknown to be safe
}

// minimal Lexical-to-plain-text extractor
function lexicalToPlainText(node: any): string {
  if (!node) return ''
  const root = (node as any).root ?? node
  let out = ''

  const visit = (n: any) => {
    if (!n) return
    if (Array.isArray(n)) {
      n.forEach(visit)
      return
    }
    if (n.type === 'text' && typeof n.text === 'string') {
      out += n.text
    }
    if (n.children) visit(n.children)
    if (n.type === 'paragraph') out += '\n'
  }

  visit(root.children ?? [])
  return out.trim()
}

export default function TwoColumnCTA({ title, button, paragraph }: TwoColumnCTAProps) {
  const paraText =
    typeof paragraph === 'string'
      ? paragraph
      : paragraph &&
          typeof paragraph === 'object' &&
          'root' in (paragraph as Record<string, unknown>)
        ? lexicalToPlainText(paragraph)
        : ''

  useEffect(() => {
    const container = document.getElementById('weblooParagraph')
    if (!container) return

    const p = container.querySelector('h3')
    if (!p) return

    // Split into spans
    const words = (p.textContent ?? '').split(' ')
    p.innerHTML = words.map((w) => `<span style="opacity:0">${w}</span>`).join(' ')

    const spans = container.querySelectorAll('span')

    const revealSpans = () => {
      spans.forEach((span) => {
        const rect = (span as HTMLElement).getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          const { left } = rect // ← const (never reassigned)
          let top = rect.top // ← let (we mutate below)
          top = top - window.innerHeight * 0.7

          let opacityValue =
            1 - (top * 0.01 + left * 0.001) < 0.1 ? 0.1 : 1 - (top * 0.01 + left * 0.001)

          opacityValue = Math.min(1, Math.max(0.1, +opacityValue.toFixed(3)))
          ;(span as HTMLElement).style.opacity = String(opacityValue)
        }
      })
    }

    window.addEventListener('scroll', revealSpans)
    revealSpans()
    return () => window.removeEventListener('scroll', revealSpans)
  }, [paraText])

  return (
    <section className="container relative py-16">
      <div className="flex flex-col lg:flex-row justify-between gap-10 items-stretch h-full">
        <div className="flex w-full lg:w-[22%] justify-between flex-row lg:flex-col h-auto items-start ">
          <h2 className="text-3xl">{title}</h2>
          {button && (
            <CMSLink url={button.url} label={button.label} appearance="black" size="ctaBig">
            </CMSLink>
          )}
        </div>

        {/* Right */}
        <div id="weblooParagraph" className="w-full lg:w-[70%]">
          {paraText && <h3 className="text-2xl md:text-4xl !leading-[2.2rem] lg:!leading-[3.2rem]">{paraText}</h3>}
        </div>
      </div>
    </section>
  )
}
