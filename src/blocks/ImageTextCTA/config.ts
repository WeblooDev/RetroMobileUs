// src/payload/blocks/ImageTextCTA.ts
import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const ImageTextCTA: Block = {
  slug: "imageTextCTA",
  interfaceName: "ImageTextCTA", // <-- generates a named TS interface
  labels: { singular: "Image + Text CTA", plural: "Image + Text CTAs" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Image" },
    { name: "title", type: "text", required: true, label: "Title" },
    { name: "description", type: "textarea", label: "Description" },

    // Standardized CTA(s)
    linkGroup({
      appearances: false,
      overrides: {
        name: "ctas",
        label: "CTA(s)",
        minRows: 0,
        maxRows: 1, // one button
        admin: { initCollapsed: false },
      },
    }),

    {
      name: "reverse",
      type: "checkbox",
      label: "Reverse Layout (image right, text left)",
      defaultValue: false,
    },
  ],
}
export default ImageTextCTA
