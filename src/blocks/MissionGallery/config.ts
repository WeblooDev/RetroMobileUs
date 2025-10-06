// src/payload/blocks/MissionGallery.ts
import type { Block } from "payload"

export const MissionGallery: Block = {
  slug: "missionGallery",
  interfaceName: "MissionGallery",
  labels: { singular: "Mission Gallery", plural: "Mission Galleries" },
  fields: [
    { name: "title", type: "text", required: true, defaultValue: "Our Mission" },
    { name: "description", type: "textarea" },

    { name: "image1", type: "upload", relationTo: "media", required: true, label: "Image 1" },
    { name: "image2", type: "upload", relationTo: "media", required: true, label: "Image 2" },
    { name: "image3", type: "upload", relationTo: "media", required: true, label: "Image 3" },
  ],
}
export default MissionGallery
