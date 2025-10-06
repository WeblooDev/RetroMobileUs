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
    // Reuse the shared link field(s); allow 1–2 links
    linkGroup({
      appearances: false, // keep visual style in code, not CMS
      overrides: {
        name: "links",      // keep helper's default name for consistency
        label: "CTAs",
        minRows: 1,
        maxRows: 2,
        admin: { initCollapsed: false },
      },
    }),
  ],
}
export default TextWithCTAs
