import type { Block } from "payload"
import { link } from "@/fields/link"

export const ImageCardGrid: Block = {
  slug: "imageCardGrid",
  interfaceName: "ImageCardGrid",
  labels: { singular: "Image Card Grid", plural: "Image Card Grids" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
    },
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Image",
        },
        {
          name: "text",
          type: "text",
          required: true,
          label: "Text under image",
        },
        link({
          overrides: {
            name: "link",
            label: "Image Link",
            required: true, 
          },
        }),
      ],
    },
  ],
}

export default ImageCardGrid
