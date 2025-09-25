import { getServerSideURL } from './getURL'

export function generateCanonical(pathname: string): string {
  const baseURL = getServerSideURL()

  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`

  const normalizedPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '')

  return `${baseURL}${normalizedPath}`
}

export function generateCanonicalMetadata(pathname: string) {
  return {
    alternates: {
      canonical: generateCanonical(pathname),
    },
  }
}

export function constructPathname(segments: string[]): string {
  return '/' + segments.filter(Boolean).join('/')
}
