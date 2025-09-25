import type { Block } from 'payload'

const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Contact Form Section',
    plural: 'Contact Form Sections',
  },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Get in Touch' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'cardTitle', type: 'text', defaultValue: 'Connect with us' },
    { name: 'cardPhone', type: 'text' },
    { name: 'cardEmail', type: 'email' },
    { name: 'cardAddress1', type: 'textarea' },
    { name: 'cardAddress2', type: 'textarea' },
  ],
}

export default ContactFormBlock
