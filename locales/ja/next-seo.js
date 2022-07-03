// eslint-disable-next-line import/no-anonymous-default-export
export default {
  titleTemplate: '%s | 米国株四半期業績チャート',
  defaultTitle: '米国株四半期業績チャート',
  additionalMetaTags: [
    {
      property: 'dc:creator',
      content: 'TenQ.cc',
    },
    {
      name: 'application-name',
      content: '米国株四半期業績チャート',
    },
  ],
  openGraph: {
    url: 'https://TenQ.cc',
    type: 'website',
    locale: 'ja_JP',
    site_name: '米国株四半期業績チャート',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/images/TopAppleChart.png`,
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
        type: 'image/jpeg',
      },
     ],
  },
  twitter: {
    handle: '@Sa10shitoushi',
    site: '@Sa10shitoushi',
    cardType: 'summary_large_image',
  },
}
