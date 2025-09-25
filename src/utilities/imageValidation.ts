import sharp from 'sharp'

interface FileData {
  buffer: Buffer
  mimetype: string
  size: number
  filename: string
}

interface ValidationResult {
  warnings: string[]
  isValid: boolean
  details: {
    format: string | null
    size: number
    dimensions: { width: number; height: number } | null
    aspectRatio: number | null
  }
}

export const validateImageWithWarnings = async ({
  file,
}: {
  file: FileData
}): Promise<ValidationResult> => {
  const warnings: string[] = []

  const minWidth = 300
  const minHeight = 300

  const result: ValidationResult = {
    warnings,
    isValid: true,
    details: {
      format: file.mimetype,
      size: file.size,
      dimensions: null,
      aspectRatio: null,
    },
  }

  if (!file.mimetype?.startsWith('image/')) {
    return result
  }

  try {
    const metadata = await sharp(file.buffer).metadata()

    if (!metadata.width || !metadata.height) {
      warnings.push(`Could not determine image dimensions. Please ensure the image file is valid.`)
      result.isValid = false
      return result
    }

    result.details.dimensions = { width: metadata.width, height: metadata.height }
    result.details.aspectRatio = metadata.width / metadata.height

    if (metadata.width < minWidth) {
      warnings.push(`Image width (${metadata.width}px) is below required ${minWidth}px minimum.`)
    }

    if (metadata.height < minHeight) {
      warnings.push(`Image height (${metadata.height}px) is below required ${minHeight}px minimum.`)
    }
  } catch (error) {
    warnings.push(
      `Error processing image: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
    )
    result.isValid = false
  }

  result.isValid = warnings.length === 0
  return result
}
