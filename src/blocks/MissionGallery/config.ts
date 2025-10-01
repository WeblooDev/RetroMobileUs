import type { Block } from "payload"

export const MissionGallery: Block = {
  slug: "missionGallery",
  labels: {
    singular: "Mission Gallery",
    plural: "Mission Galleries",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      defaultValue: "Our Mission",
    },
    {
      name: "description",
      type: "textarea",
      required: false,
      label: "Description (optional)",
    },
    {
      name: "images",
      type: "array",
      minRows: 3,
      maxRows: 3, // exactly three like the design
      labels: { singular: "Image", plural: "Images" },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Image",
        },
        {
          name: "alt",
          type: "text",
          label: "Alt text",
        },
      ],
    },
  ],
}

