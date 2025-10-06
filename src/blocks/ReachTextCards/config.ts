import type { Block } from "payload"

export const ReachTextCards: Block = {
  slug: "reachTextCards",
  interfaceName: "ReachTextCards",
  labels: { singular: "Reach Text Cards", plural: "Reach Text Cards" },
  fields: [
    { name: "title", type: "text", required: true, label: "Section Title", defaultValue: "Reach Passionate Automotive Enthusiasts" },
    { name: "description", type: "textarea", label: "Short Description", defaultValue: "From lifelong collectors to curious newcomers, our audience spans generations — all united by a love of classic cars, design, and culture." },
    {
      name: "cards",
      label: "Cards",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: "text", type: "text", required: true, label: "Card Text", defaultValue: "50,000+ expected attendees" },
        { name: "backgroundColor", type: "text", label: "Background Color (hex)", defaultValue: "#8B9B5C" },
        { name: "textColor", type: "text", label: "Text Color (hex)", defaultValue: "#FFFFFF" }, 
      ],
    },
  ],
}

export default ReachTextCards
