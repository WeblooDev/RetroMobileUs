import type { Block } from "payload"

export const TextImageRight: Block = {
  slug: "textImageRight",
  interfaceName: "TextImageRight",
  labels: { singular: "Text + Image (Right)", plural: "Text + Image (Right)" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "More Than Visibility — It’s Connection",
    },
    {
      name: "description",
      type: "textarea",
      label: "Body",
      admin: { description: "Short paragraph under the heading." },
      defaultValue:
        "Our sponsors don’t just get logos on banners. They gain access to a community that values craftsmanship, design, and heritage.",
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

export default TextImageRight
