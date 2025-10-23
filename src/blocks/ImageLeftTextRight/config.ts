import type { Block } from "payload"

export const ImageLeftTextRight: Block = {
  slug: "imageLeftTextRight",
  interfaceName: "ImageLeftTextRight",
  labels: { singular: "Image Left / Text Right", plural: "Image Left / Text Right" },
  fields: [
    { name: "title", type: "text", required: true, label: "Heading", defaultValue: "We’re Accessible to All" },
    {
      name: "description",
      type: "textarea",
      label: "Body",
      admin: { rows: 3 },
      defaultValue:
        "The venue is fully ADA-compliant. Wheelchair rental, accessible restrooms, and assisted entry lanes are available. For specific assistance, contact our team in advance.",
    },
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Left Image" },
  ],
}

export default ImageLeftTextRight
