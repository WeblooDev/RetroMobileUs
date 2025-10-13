import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const HelpfulLinksGrid: Block = {
  slug: "helpfulLinksGrid",
  interfaceName: "HelpfulLinksGrid",
  labels: { singular: "Helpful Links Grid", plural: "Helpful Links Grids" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "Helpful Links",
    },
    {
      name: "items",
      type: "array",
      label: "Cards",
      required: true,          
      minRows: 2,
      maxRows: 4,
      labels: { singular: "Card", plural: "Cards" },
      admin: { initCollapsed: false },
      fields: [
        { name: "title", type: "text", required: true, label: "Card Title" },
        { name: "description", type: "textarea", label: "Card Description", admin: { rows: 2 } },
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
            required: true,     
            minRows: 0,
            maxRows: 1,
            admin: { initCollapsed: true },
          },
        }),
      ],
      defaultValue: [
        { title: "Buy Tickets to Rétromobile", description: "Secure your spot at the show..." },
        { title: "Apply to Exhibit Your Vehicle", description: "Join a world-class lineup..." },
        { title: "Plan Your Visit to the Show", description: "Everything you need to know..." },
        { title: "Contact Our Support Team", description: "Need help with booking or visit?" },
      ],
    },
  ],
}

export default HelpfulLinksGrid
