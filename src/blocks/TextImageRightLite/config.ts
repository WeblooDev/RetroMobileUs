import type { Block } from "payload"

export const TextImageRightLite: Block = {
  slug: "textImageRightLite",
  interfaceName: "TextImageRightLite",
  labels: { singular: "Text + Image (Right, Lite)", plural: "Text + Image (Right, Lite)" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "For Serious Collectors",
    },
    {
      name: "description",
      type: "textarea",
      label: "Body",
      admin: { rows: 3 },
      defaultValue:
        "Many items are produced in limited quantities. We recommend pre-ordering or visiting the boutique early to ensure availability.",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Right Image",
    },
  ],
}

export default TextImageRightLite
