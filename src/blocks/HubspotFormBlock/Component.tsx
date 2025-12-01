'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { HubspotFormBlock as HubspotFormBlockType } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

export default function HubspotFormBlock(props: HubspotFormBlockType) {
  const { title, text } = props

  useEffect(() => {
    const scriptSrc = 'https://js.hsforms.net/forms/v2.js'
    const targetSelector = '#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434'

    function createForm() {
      if (typeof window === 'undefined') return

      const targetEl = document.querySelector(targetSelector)
      if (!targetEl) return

      // avoid duplicate forms on re-renders
      targetEl.innerHTML = ''

      const w = window
      if (!w.hbspt || !w.hbspt.forms) return

      w.hbspt.forms.create({
        portalId: '50177497',
        formId: 'ed24bcc0-2a50-4bd0-bacf-fc4fd4338434',
        region: 'na1',
        target: targetSelector,
        css: `
         
                /* === BLOCK BACKGROUND === */
        #hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 {


        border-radius: 0 !important;
        }

/* === FORM LAYOUT === */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .hs-form {
  display: flex !important;
  flex-direction: column !important;
  gap: 2rem !important;
}



/* === LABELS === */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .hs-form-field label {
  display: none !important; /* screenshot shows placeholders only */
}

#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .hs-custom-style fieldset {
  display: flex !important;
  gap: 2rem !important;
}

/* === INPUT FIELDS === */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 input,
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 textarea {
  width: 100% !important;
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #D6D6D6 !important;
  border-radius: 0 !important;
  padding: 14px 4px !important;
  font-size: 16px !important;
  font-family: 'Inter', sans-serif !important;
  color: #222 !important;
}

/* PLACEHOLDER COLOR */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 input::placeholder,
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 textarea::placeholder {
  color: black !important;
}

/* === TWO-COLUMN FIELDS === */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .field.hs-firstname,
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .field.hs-lastname,
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .field.hs-email,
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .field.hs-phone {
  display: inline-block !important;
  width: 50% !important;
}



/* Full width fields */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .field.hs-message {
  width: 100% !important;
}

/* Fix HubSpot's dumb UL wrapper spacing */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .hs-form-field ul {
  padding: 0 !important;
}

/* === SUBMIT BUTTON === */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .hs-button {
  background-color: #8B9B5C !important;
  color: white !important;
  padding: 14px 40px !important;
  font-family: 'Ivar', serif !important;
  text-transform: uppercase !important;
  font-size: 20px !important;
  letter-spacing: 1px !important;
  border-radius: 50px !important;
  border: none !important;
  display: block !important;
  margin: 40px auto 0 auto !important;
  cursor: pointer;
  transition: all 0.2s ease-out;
  width: fit-content !important;
}

#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 .hs-button:hover {
  opacity: 0.85 !important;
  transform: translateY(-2px);
}


#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 input,
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 textarea,
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 select {
  width: 100% !important;
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #D6D6D6 !important;
  border-radius: 0 !important;
  padding: 14px 4px !important;
  font-size: 16px !important;
  font-family: 'Inter', sans-serif !important;
  color: #222 !important;
}

/* dropdown: remove native chrome + add subtle arrow */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 select {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  padding-right: 32px !important; /* space for arrow */
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 10px 6px;
}

/* hover / focus state like inputs */
#hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434 select:focus {
  outline: none !important;
  border-bottom-color: #8B9B5C !important;
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
    <section id="contact-form" className=" my-16 px-4 py-12 bg-[#F1F1F1]">
      <motion.div
        className="container mx-auto flex flex-col gap-2 items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl " variants={staggerItem}>
          {title}
        </motion.h2>

        {text && (
          <motion.p className="mb-8  text-base lg:text-lg" variants={staggerItem}>
            {text}
          </motion.p>
        )}

        <motion.div className="hero-hubspot-form-wrapper w-full  " variants={staggerItem}>
          <div id="hubspot-form-ed24bcc0-2a50-4bd0-bacf-fc4fd4338434" />
        </motion.div>
      </motion.div>
    </section>
  )
}
