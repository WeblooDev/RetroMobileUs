// src/payload/blocks/TextWithCTAs.ts
import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const TextWithCTAs: Block = {
  slug: "textWithCTAs",
  interfaceName: "TextWithCTAs", // <-- generates a named TS interface
  labels: { singular: "Text with CTAs", plural: "Text with CTAs" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "Official Auction House of the Rétromobile Show",
    },
    linkGroup({
      appearances: false, 
      overrides: {
        name: "links",   
        label: "CTAs",
        minRows: 1,
        maxRows: 2,
        admin: { initCollapsed: false },
      },
    }),
  ],
}
export default TextWithCTAs
