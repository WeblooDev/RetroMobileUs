'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { ImageHero as ImageHeroBlock, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { heroTitle, heroSubtitle, fadeIn } from '@/utilities/animations'

export default function ImageHero(props: ImageHeroBlock) {
  const { backgroundImage, title, description } = props

  const bg = backgroundImage as MediaType | null

  useEffect(() => {
    const scriptSrc = 'https://js.hsforms.net/forms/v2.js'
    const targetSelector = '#hubspot-newsletter-form'

    function createForm() {
      if (typeof window === 'undefined') return

      const targetEl = document.querySelector(targetSelector)
      if (!targetEl) return

      targetEl.innerHTML = ''

      const w = window as any
      if (!w.hbspt || !w.hbspt.forms) return

      w.hbspt.forms.create({
        portalId: '50177497',
        formId: 'f19f8670-6cbe-41a8-bcc4-8e35f1d74379',
        region: 'na1',
        target: targetSelector,
        css: `
          /* layout */
          .hs-form {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          /* label "Email*" */
          .hs-form .hs-form-field label {
            color: #ffffff !important;
            font-size: 18px !important;
            margin-bottom: 0.5rem;
          }

          /* full-width email field */
          .hs-form .hs_email {
            width: 100%;
          }

          /* input: transparent bg + single white line */
          .hs-form .hs_email .hs-input {
            width: 100%;
            background: transparent !important;
            border: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.7) !important;
            border-radius: 0 !important;
            padding: 12px 0 !important;
            color: #ffffff !important;
            font-size: 16px !important;
            font-family: 'Inter', sans-serif !important;
          }

#hubspot-newsletter-form .hs_newsletter_consent .hs-form-booleancheckbox label,
#hubspot-newsletter-form .hs_newsletter_consent .hs-form-booleancheckbox label span {
  font-family: "Inter", sans-serif !important;
  font-size: 14px;
  color: #ffffff !important;
}

/* Put checkbox + text on one line and center vertically */
#hubspot-newsletter-form .hs_newsletter_consent .hs-form-booleancheckbox label {
  display: flex;
  align-items: center;
}

/* Space between the box and the text */
#hubspot-newsletter-form .hs_newsletter_consent .hs-form-booleancheckbox input[type="checkbox"] {
  margin: 0; /* reset default margin */
}

#hubspot-newsletter-form .hs_newsletter_consent .hs-form-booleancheckbox label span {
  margin-left: 0.5rem; /* gap between box and text */
}

/* Hide the required * for the newsletter consent checkbox only */
#hubspot-newsletter-form .hs_newsletter_consent .hs-form-required {
  display: none !important;
}

/* Remove the line breaks HubSpot injects under the label */
#hubspot-newsletter-form .hs_newsletter_consent .hs-form-booleancheckbox label span br {
  display: none !important;
}


        

          #hubspot-newsletter-form .hs-form-field label {
            font-size: 22px !important;
            margin-bottom: 1rem !important;
          }

         #hubspot-newsletter-form .hs-form-field  li  label {
            font-size: 13px !important;
            margin-bottom: 0.5rem !important;
            text-decoration: underline !important;
         
          }


          #hubspot-newsletter-form .hs_email{
          display: flex !important;
          flex-direction: column !important;
          gap: 0.5rem !important;
          }

          /* submit button: olive, same as site */
          .hs-form .hs_submit .hs-button {
            margin-top: 2rem;
           
            background-color: #7b8d53 !important;
            color: #ffffff !important;
            border-radius: 99px !important;
      
            border: none !important;
            font-size: 18px !important;
            font-weight: 600 !important;
            cursor: pointer;
            transition: opacity 150ms ease, transform 150ms ease;
          }

          #hubspot-newsletter-form .hs_submit .hs-button{
               border-radius: 99px !important;
              font-family: 'Ivar', serif !important;
              font-size: 18px !important;
              font-weight: 400 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.5px !important;
              padding: 8px 24px !important;
          }

             #hubspot-newsletter-form .hs_submit .hs-button:hover {
            background-color: white !important;
            color: black !important;
          }
        `,
      })
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`)

    if (existingScript) {
      createForm()
      return
    }

    const script = document.createElement('script')
    script.src = scriptSrc
    script.type = 'text/javascript'
    script.async = true
    script.charset = 'utf-8'
    script.onload = createForm
    document.body.appendChild(script)
  }, [])

  return (
    <section className="container relative my-12 flex min-h-auto items-center px-4 py-20 md:min-h-[60vh] lg:min-h-[80vh]">
      {bg && (
        <motion.div
          className="absolute inset-0"
          aria-hidden
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Media resource={bg} fill imgClassName="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      )}

      <div className="relative z-10 w-[90%] px-6 lg:w-[60%]">
        <motion.h1
          className="mb-6 text-3xl text-white md:text-4xl lg:text-5xl"
          variants={heroTitle}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>
        <motion.p
          className="mb-8 w-[90%] text-base text-white lg:w-[70%] lg:text-lg"
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
        >
          {description}
        </motion.p>

        <motion.div
          className="hero-hubspot-form-wrapper max-w-[350px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div id="hubspot-newsletter-form" />
        </motion.div>
      </div>
    </section>
  )
}
