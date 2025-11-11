import type { Block } from "payload"

export const Faq: Block = {
  slug: "faq",
  interfaceName: "Faq",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    {
      name: "items",
      type: "array",
      labels: { singular: "Question", plural: "Questions" },
      minRows: 1,
      admin: { initCollapsed: false },
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
          label: "Question",
        },
        {
          name: "answer",
          type: "textarea", 
          required: true,
          label: "Answer",
        },
      ],
      defaultValue: [
        {
          question: "How do I buy tickets?",
          answer:
            "You can purchase tickets directly on our website through the Buy Tickets page. Early access and discounted rates are available for seniors, students, and groups.",
        },
      ],
    },
    {
      name: "accentColor",
      type: "text",
      label: "Accent Color (border on open)",
      defaultValue: "#7A8E57",
    },
  ],
}

export default Faq
