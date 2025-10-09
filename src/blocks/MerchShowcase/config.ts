import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const MerchShowcase: Block = {
  slug: "merchShowcase",
  interfaceName: "MerchShowcase",
  labels: { singular: "Merch Showcase", plural: "Merch Showcases" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "Event Exclusives & Limited Runs",
    },
    {
      name: "description",
      type: "textarea",
      label: "Subheading",
      admin: { rows: 2 },
      defaultValue: "Available on-site and online while supplies last.",
    },
    {
      name: "items",
      type: "array",
      label: "Cards",
      minRows: 1,
      maxRows: 12,
      labels: { singular: "Card", plural: "Cards" },
      admin: { initCollapsed: false },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Card Title",
          defaultValue: "Official Show T-Shirt",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Background Image",
        },
        linkGroup({
          appearances: false,
          overrides: {
            name: "links",
            label: "CTA",
            minRows: 0,
            maxRows: 1,
            admin: { initCollapsed: true },
          },
        }),
      ],
    },
  ],
}

export default MerchShowcase
