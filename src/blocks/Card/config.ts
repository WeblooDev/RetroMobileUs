import type { Block } from "payload"

export const Card: Block = {
  slug: "card",
  labels: { singular: "Card", plural: "Cards" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Image" },
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "button",
      type: "group",
      label: "Button",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "READ MORE" },
        { name: "url", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
}
