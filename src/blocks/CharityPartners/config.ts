import type { Block } from "payload"

export const CharityPartners: Block = {
  slug: "charityPartners",
  labels: {
    singular: "Charity Partners",
    plural: "Charity Partners Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      required: true,
      defaultValue: "Charity Partners",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
      required: true,
    },
    {
      name: "partners",
      type: "array",
      label: "Partner Cards",
      minRows: 3,
      maxRows: 3, // exactly three like the design
      fields: [
        {
          name: "heading",
          type: "text",
          required: true,
          label: "Heading",
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Description",
        },
      ],
    },
  ],
}
