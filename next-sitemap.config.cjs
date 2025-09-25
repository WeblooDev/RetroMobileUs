let SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

if (!SITE_URL.startsWith('http://') && !SITE_URL.startsWith('https://')) {
  SITE_URL = `https://${SITE_URL}`
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false, // We have a custom robots.txt
  exclude: ['/admin/*', '/api/*', '/_next/*', '/search', '/?s=*', '/page//?s=*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*', '/_next/', '/search', '/?s=', '/page//?s='],
        allow: '/_next/static/',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/cars-sitemap.xml`,
      `${SITE_URL}/brands-sitemap.xml`,
    ],
  },
}
