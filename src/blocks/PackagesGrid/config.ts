import type { Block } from "payload"

export const PackagesGrid: Block = {
  slug: "packagesGrid",
  interfaceName: "PackagesGrid",
  labels: { singular: "Packages Grid", plural: "Packages Grids" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "Customizable Packages Include:",
    },
    {
      name: "topRow",
      type: "array",
      label: "Top Row (3 cards)",
      minRows: 3,
      maxRows: 3,
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        {
          name: "text",
          type: "textarea",
          required: true,
          label: "Text",
          admin: { rows: 2 },
          defaultValue: "Brand visibility across digital and physical channels",
        },
        {
          name: "backgroundColor",
          type: "text",
          label: "Background Color (hex)",
          defaultValue: "#4B6B3C", 
          admin: { description: "e.g. #4B6B3C or rgba(0,0,0,0.05)" },
        },
        {
          name: "textColor",
          type: "text",
          label: "Text Color (hex)",
          defaultValue: "#FFFFFF",
        },
      ],
    },
    {
      name: "bottomRow",
      type: "array",
      label: "Bottom Row (3 cards)",
      minRows: 3,
      maxRows: 3,
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        {
          name: "text",
          type: "textarea",
          required: true,
          label: "Text",
          admin: { rows: 2 },
          defaultValue: "Logo placement in all marketing materials",
        },
        {
          name: "backgroundColor",
          type: "text",
          label: "Background Color (hex)",
          defaultValue: "#EAF3E6",
        },
        {
          name: "textColor",
          type: "text",
          label: "Text Color (hex)",
          defaultValue: "#111111",
        },
      ],
    },
    {
      name: "showBottomDivider",
      type: "checkbox",
      label: "Show final divider line under second row",
      defaultValue: true,
    },
  ],
}

export default PackagesGrid
