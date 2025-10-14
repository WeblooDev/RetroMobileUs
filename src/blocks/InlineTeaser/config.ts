import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const InlineTeaser: Block = {
  slug: "inlineTeaser",
  interfaceName: "InlineTeaser",
  labels: { singular: "Inline Teaser", plural: "Inline Teasers" },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Left Image",
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      defaultValue: "Legends in Motion",
    },
    {
      name: "description",
      type: "text",
      label: "Short description (optional)",
      defaultValue:
        "A main showcase of rare and historically significant American classics, each with a story that shaped the automotive world.",
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: "links",
        label: "Right Link",
        minRows: 0,
        maxRows: 1,
        admin: { initCollapsed: true },
      },
    }),
  ],
}

export default InlineTeaser
