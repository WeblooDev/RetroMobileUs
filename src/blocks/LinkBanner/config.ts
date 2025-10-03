import type { Block } from "payload"

export const LinkBanner: Block = {
  slug: "linkBanner",
  labels: {
    singular: "Link Banner",
    plural: "Link Banners",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Left Heading (H3)",
      defaultValue: "Retromobile Paris",
    },
    {
      name: "link",
      type: "group",
      label: "Right Link",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "retromobile.com" },
        { name: "url", type: "text", required: true, defaultValue: "https://retromobile.com" },
        {
          name: "bgColor",
          type: "text",
          label: "Link Background Color",
          defaultValue: "#8B9B5C", // olive
        },
      ],
    },
    {
      name: "rightImage",
      type: "upload",
      relationTo: "media",
      label: "Optional Right Image / Logo",
      required: false,
    },
    {
      name: "rightImageAlt",
      type: "text",
      label: "Right Image Alt",
      required: false,
    },
  ],
}
