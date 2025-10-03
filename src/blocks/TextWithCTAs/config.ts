import type { Block } from "payload"

export const TextWithCTAs: Block = {
  slug: "textWithCTAs",
  labels: {
    singular: "Text with CTAs",
    plural: "Text with CTAs",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "Official Auction House of the Rétromobile Show",
    },
    {
      name: "primaryButton",
      type: "group",
      label: "Primary Button",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "CONSIGN NOW" },
        { name: "url", type: "text", required: true, defaultValue: "#" },
      ],
    },
    {
      name: "secondaryButton",
      type: "group",
      label: "Secondary Button (optional)",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "REGISTER TO BID" },
        { name: "url", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
}

export default TextWithCTAs
