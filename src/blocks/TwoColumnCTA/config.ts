import type { Block } from "payload"

export const TwoColumnCTA: Block = {
  slug: "twoColumnCTA",
  labels: {
    singular: "Two Column CTA",
    plural: "Two Column CTAs",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
    },
    {
      name: "button",
      type: "group",
      label: "Button",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          label: "Button Label",
        },
        {
          name: "url",
          type: "text",
          required: true,
          label: "Button URL",
        },
      ],
    },
    {
      name: "paragraph",
      type: "textarea", // 👈 better than text, supports multi-line but still a string
      label: "Paragraph",
      required: true,
      admin: {
        description: "Enter plain text only (no formatting).",
      },
    },
  ],
}
