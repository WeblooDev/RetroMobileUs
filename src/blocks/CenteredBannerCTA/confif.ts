import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const CenteredBannerCTA: Block = {
  slug: "centeredBannerCta",
  interfaceName: "CenteredBannerCTA",
  labels: { singular: "Centered Banner CTA", plural: "Centered Banner CTAs" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "Any questions about ticketing or any other subject",
    },
    {
      name: "description",
      type: "textarea",
      label: "Small Text",
      admin: { rows: 2 },
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
    { name: "showTopLine", type: "checkbox", label: "Show Top Line", defaultValue: true },
    { name: "showBottomLine", type: "checkbox", label: "Show Bottom Line", defaultValue: true },
  ],
}

export default CenteredBannerCTA
