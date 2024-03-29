// eslint-disable-next-line import/no-anonymous-default-export
export default {
  titleTemplate: '%s | U.S. Stock Quarterly Earnings Chart',
  defaultTitle: 'U.S. Stock Quarterly Earnings Chart',
  description:'U.S. Stock Quarterly Earnings Chart',
  additionalMetaTags: [
    {
      property: 'dc:creator',
      content: 'TenQ.cc',
    },
    {
      name: 'application-name',
      content: 'U.S. Stock Quarterly Earnings Chart',
    },
  ],
  openGraph: {
    url: 'https://TenQ.cc',
    type: 'website',
    locale: 'en_US',
    site_name: 'U.S. Stock Quarterly Earnings Chart',
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
