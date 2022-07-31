module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_API_ENDOPOINT,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/stocks/candidate',
    '/auth/reset-password',
    '/auth/send-email',
    '/auth/signin',
    '/auth/signup',
    '/member',
  ],
  // outDir: './out',
}
