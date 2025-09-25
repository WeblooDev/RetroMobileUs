import type { Block } from 'payload'

const TestimonialCarouselBlock: Block = {
  slug: 'testimonialCarousel',
  labels: {
    singular: 'Testimonial Carousel',
    plural: 'Testimonial Carousels',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
  ],
}

export default TestimonialCarouselBlock
