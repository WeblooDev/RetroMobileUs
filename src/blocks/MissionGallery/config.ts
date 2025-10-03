import type { Block } from "payload"

export const MissionGallery: Block = {
  slug: "missionGallery",
  labels: { singular: "Mission Gallery", plural: "Mission Galleries" },
  fields: [
    { name: "title", type: "text", required: true, label: "Title", defaultValue: "Our Mission" },
    { name: "description", type: "textarea", label: "Description (optional)" },

    // Exactly three fixed images
    {
      name: "image1",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image 1",
    },
    {
      name: "image2",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image 2",
    },
    {
      name: "image3",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image 3",
    },
    { name: "alt1", type: "text", label: "Alt text (Image 1)" },
    { name: "alt2", type: "text", label: "Alt text (Image 2)" },
    { name: "alt3", type: "text", label: "Alt text (Image 3)" },
  ],
}
