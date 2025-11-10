import React from 'react'
import type { ContactBanner as ContactBannerBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'

const toTelHref = (phone?: string | null) =>
  phone ? `tel:${phone.trim().replace(/(?!^\+)[^\d]/g, '')}` : ''

const ContactBanner: React.FC<ContactBannerBlock> = ({
  title,
  subtitle,
  phone,
  backgroundColor,
  button,
}) => {
  const bg = backgroundColor && backgroundColor.trim() ? backgroundColor : '#8B9B5C'
  const telHref = toTelHref(phone)
  const cta = button as any

  return (
    <section className="w-full">
      <div
        className="w-full py-10 flex justify-center items-center"
        style={{ backgroundColor: bg }}
      >
        <h3 className="text-white text-2xl md:text-6xl text-center">{title}</h3>
      </div>

      <div className="py-10 text-center text-sm space-y-2">
        {subtitle?.trim() && <p>{subtitle}</p>}

        {phone?.trim() && (
          <p>
            Email or call{' '}
            <a href={telHref} className="underline hover:opacity-80">
              {phone}
            </a>
          </p>
        )}

           <CMSLink
                {...cta}
                appearance="black"
                size="ctaBig"
                className="inline-flex"
              />
      </div>
    </section>
  )
}

export default ContactBanner
