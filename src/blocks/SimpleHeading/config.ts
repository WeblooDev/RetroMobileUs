import type { Block } from "payload"

export const SimpleHeading: Block = {
  slug: "simpleHeading",
  labels: {
    singular: "Simple Heading",
    plural: "Simple Headings",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "History of Retromobile",
      label: "Heading Title",
    },
    {
      name: "backgroundColor",
      type: "text",
      label: "Background Color",
      defaultValue: "#8B9B5C",
    },
  ],
}
