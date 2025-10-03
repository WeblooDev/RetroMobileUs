import type { Block } from "payload"

export const LogoTextCTA: Block = {
  slug: "logoTextCTA",
  labels: { singular: "Logo + Text CTA", plural: "Logo + Text CTAs" },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Left Image / Logo",
    },
    { name: "imageAlt", type: "text", label: "Image Alt" },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      defaultValue: "About Gooding Christie's",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "button",
      type: "group",
      label: "CTA Button",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "LEARN MORE" },
        { name: "url", type: "text", required: true, defaultValue: "#" },
      ],
    },
    {
      name: "reverse",
      type: "checkbox",
      label: "Reverse layout (image right, text left)",
      defaultValue: false,
    },
  ],
}

export default LogoTextCTA
