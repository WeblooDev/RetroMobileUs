import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { validateImageWithWarnings } from '../utilities/imageValidation'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    description:
      '📁 Upload media. Raster images (PNG/JPEG/WebP/GIF) must be at least 300×300 px. SVGs and videos are exempt.',
  },
  
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'imageValidation',
      type: 'text',
      admin: {
        readOnly: true,
        description:
          'This field validates that uploaded images meet the minimum size requirements.',
      },
      defaultValue: 'Validating...',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // inside fields[].validate for `imageValidation`
      validate: async (value: any, { req }: { req: any }) => {
        const file = req?.file
        if (!file) return true

        const mime = String(file.mimetype || '')
        // ✅ Skip pixel-size validation for SVGs and videos
        if (mime === 'image/svg+xml' || mime.startsWith('video/')) return true

        // Run your raster validation as-is
        const validation = await validateImageWithWarnings({
          file: {
            buffer: file.data,
            mimetype: file.mimetype,
            size: file.size,
            filename: file.name,
          },
        })

        if (!validation.isValid || validation.warnings.length > 0) {
          const errorMessage =
            validation.warnings.length > 1
              ? `Image too small: ${validation.details.dimensions?.width}×${validation.details.dimensions?.height}px. Minimum required: 300×300px.`
              : (validation.warnings[0] || 'Image validation failed')
                  .replace('Image width', 'Width')
                  .replace('Image height', 'Height')
          return errorMessage
        }
        return true
      },

    },
  ],
  upload: {
    mimeTypes: [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/*',
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
