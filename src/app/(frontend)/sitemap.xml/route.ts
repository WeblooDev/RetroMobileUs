import { NextResponse } from 'next/server'

export async function GET() {
  let SITE_URL = 'https://leasing.dupontregistry.com'

  if (!SITE_URL.startsWith('http://') && !SITE_URL.startsWith('https://')) {
    SITE_URL = `https://${SITE_URL}`
  }

  const currentDate = new Date().toISOString()

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/pages-sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/cars-sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/brands-sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`

  return new NextResponse(sitemapIndex, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
