import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const ImageStepsRight: Block = {
  slug: "imageStepsRight",
  interfaceName: "ImageStepsRight",
  labels: { singular: "Image / Steps Right", plural: "Image / Steps Right" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "Guided Tours",
    },
    {
      name: "steps",
      type: "array",
      label: "Steps (numbers + labels)",
      minRows: 4,
      maxRows: 4, 
      labels: { singular: "Step", plural: "Steps" },
      fields: [
        { name: "heading", type: "text", required: true, label: "Number (e.g., 1)" },
        { name: "text", type: "text", required: true, label: "Label" },
      ],
      admin: {
        initCollapsed: false,
      },
      defaultValue: [
        { heading: "1", text: "Séance" },
        { heading: "2", text: "Panier" },
        { heading: "3", text: "Coordonnées" },
        { heading: "4", text: "Paiement" },
      ],
    },

    linkGroup({
      appearances: false,
      overrides: {
        name: "links",
        label: "CTA (first link is used)",
        minRows: 0,
        maxRows: 1,
        admin: { initCollapsed: true },
      },
    }),

    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Left Image",
    },
  ],
}

export default ImageStepsRight
