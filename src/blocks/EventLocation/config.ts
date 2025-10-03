import type { Block } from "payload"

export const EventLocation: Block = {
  slug: "eventLocation",
  labels: { singular: "Event Location", plural: "Event Locations" },
  fields: [
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Background Image",
    },
    {
      name: "ribbonText",
      type: "text",
      required: true,
      defaultValue: "Where it’s happening",
      label: "Ribbon Text (top left)",
    },
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Javits Convention Center, New York City",
      label: "Center Title",
    },
    {
      name: "button",
      type: "group",
      label: "CTA Button",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "View Map" },
        { name: "url", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
}

export default EventLocation
