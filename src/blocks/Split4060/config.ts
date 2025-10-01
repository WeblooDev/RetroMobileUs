import type { Block } from "payload"

export const Split4060: Block = {
  slug: "split4060",
  labels: {
    singular: "40/60 Split",
    plural: "40/60 Splits",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      defaultValue: "Join the Movement",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description",
    },
    {
      name: "button",
      type: "group",
      label: "CTA Button",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "MAKE A DONATION" },
        { name: "url", type: "text", required: true, defaultValue: "#" },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image (60% column)",
    },
    {
      name: "imageAlt",
      type: "text",
      label: "Image Alt",
    },
    {
      name: "reverse",
      type: "checkbox",
      label: "Reverse layout on desktop (image left, text right)",
      defaultValue: false,
    },
  ],
}
