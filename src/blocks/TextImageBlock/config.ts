import type { Block } from "payload"

export const TextImageBlock: Block = {
  slug: "textImageBlock",
  labels: {
    singular: "Text & Image Block",
    plural: "Text & Image Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
    {
      name: "reverse",
      type: "checkbox",
      label: "Reverse Layout (image left, text right)",
      defaultValue: false,
    },
  ],
}
