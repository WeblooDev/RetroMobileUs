import type { Block } from "payload"

export const LineBlock: Block = {
  slug: "lineBlock",
  labels: {
    singular: "Line Block",
    plural: "Line Blocks",
  },
  fields: [
    {
      name: "color",
      type: "text",
      label: "Line Color",
      defaultValue: "#8B9B5C",
    },
    {
      name: "duration",
      type: "number",
      label: "Animation Duration (seconds)",
      defaultValue: 1,
    },
  ],
}
