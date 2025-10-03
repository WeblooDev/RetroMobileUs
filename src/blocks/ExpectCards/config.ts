import type { Block } from "payload"

export const ExpectCards: Block = {
  slug: "expectCards",
  labels: {
    singular: "Expect Cards",
    plural: "Expect Cards Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "What to Expect",
      label: "Section Title",
    },
    {
      name: "cards",
      type: "array",
      minRows: 1,
      maxRows: 6,
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Background Image",
        },
        {
          name: "title",
          type: "text",
          required: true,
          label: "Card Title",
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Card Description",
        },
        {
          name: "url",
          type: "text",
          required: false,
          label: "Optional Link (wrap card)",
        },
      ],
    },
  ],
}

export default ExpectCards
