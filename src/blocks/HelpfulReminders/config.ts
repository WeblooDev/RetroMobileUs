import type { Block } from "payload"
import { linkGroup } from "@/fields/linkGroup"

export const HelpfulReminders: Block = {
  slug: "helpfulReminders",
  interfaceName: "HelpfulReminders",
  labels: { singular: "Helpful Reminders", plural: "Helpful Reminders" },
  fields: [
    { name: "title", type: "text", required: true, label: "Heading", defaultValue: "Helpful Reminders" },

    // NEW: optional text under the title
    { name: "intro", type: "text", label: "Intro text (optional)" },

    {
      name: "items",
      type: "array",
      label: "Reminders",
      minRows: 1,
      maxRows: 10,
      labels: { singular: "Reminder", plural: "Reminders" },
      admin: { initCollapsed: false },
      fields: [{ name: "subtitle", type: "text", required: true, label: "Text" }],
    },
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Right Image" },

    // CTA remains optional (minRows: 0)
    linkGroup({
      appearances: false,
      overrides: {
        name: "links",
        label: "CTA",
        minRows: 0,
        maxRows: 1,
        admin: { initCollapsed: true },
      },
    }),

    { name: "backgroundColor", type: "text", label: "Background Color", defaultValue: "#7A8E57" },
  ],
}

export default HelpfulReminders
