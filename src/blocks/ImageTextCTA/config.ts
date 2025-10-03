import type { Block } from "payload"

export const ImageTextCTA: Block = {
  slug: "imageTextCTA",
  labels: {
    singular: "Image + Text CTA",
    plural: "Image + Text CTAs",
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
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
      name: "button",
      type: "group",
      label: "CTA Button",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Buy Tickets" },
        { name: "url", type: "text", required: true, defaultValue: "#" },
      ],
    },
    {
      name: "reverse",
      type: "checkbox",
      label: "Reverse Layout (image right, text left)",
      defaultValue: false,
    },
  ],
}
