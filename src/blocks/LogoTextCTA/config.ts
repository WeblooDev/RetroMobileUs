// src/payload/blocks/LogoTextCTA.ts
import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const LogoTextCTA: Block = {
  slug: "logoTextCTA",
  interfaceName: "LogoTextCTA", // <- so you can import the TS type
  labels: { singular: "Logo + Text CTA", plural: "Logo + Text CTAs" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Left Image / Logo" },
    { name: "imageAlt", type: "text", label: "Image Alt" },
    { name: "title", type: "text", required: true, label: "Title", defaultValue: "About Gooding Christie's" },
    { name: "description", type: "textarea", label: "Description" },

    // standardized CTA (1 row)
    linkGroup({
      appearances: false,
      overrides: {
        name: "ctas",
        label: "CTA",
        minRows: 0,
        maxRows: 1,
        admin: { initCollapsed: false },
      },
    }),

    { name: "reverse", type: "checkbox", label: "Reverse layout (image right, text left)", defaultValue: false },
  ],
}
export default LogoTextCTA
