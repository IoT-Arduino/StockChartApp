module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_API_ENDOPOINT,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/auth' },
      { userAgent: '*', disallow: '/stocks/candidate' },
      { userAgent: '*', disallow: '/member' },
      { useAgent: '*', allow: '/' },
    ],
  },
  sitemapSize: 7000,
  exclude: ['/stocks/candidate', '/auth', '/member'],
  // outDir: './out',
}
