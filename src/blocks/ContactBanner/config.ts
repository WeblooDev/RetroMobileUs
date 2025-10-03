import type { Block } from "payload"

export const ContactBanner: Block = {
  slug: "contactBanner",
  labels: {
    singular: "Contact Banner",
    plural: "Contact Banners",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Questions? We’re Here.",
      label: "Banner Title",
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle (optional)",
      defaultValue: "Reach us at support@retromobileusa.com or call (888) 123-4567.",
    },
    {
      name: "backgroundColor",
      type: "text",
      label: "Background Color",
      defaultValue: "#8B9B5C",
    },
  ],
}
