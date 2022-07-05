import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
// import Link from 'next/link'
// import EtfCandleChart from './../../components/EtfCandleChart'
// import EtfCompareLineChart from './../../components/EtfCompareLineChart'

// i18n
import { useRouter } from 'next/router'
import en from './../../locales/en/en'
import ja from './../../locales/ja/ja'
import EtfIndexEn from './../../locales/en/EtfIndex'
import EtfIndexJa from './../../locales/ja/EtfIndex'

export async function getServerSideProps() {
  try {
    const p1 = 1420038000 // 2015/01/01
    const p2 = 9999999999
    const range = '5d' // week "5d" , month "1mo"

    const symbols = ['VOO', 'VTI', 'VT', 'VWO']

    const etfResponse = symbols.map(async (symbol) => {
      let reqList = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/?symbol=${symbol}&period1=${p1}&period2=${p2}&interval=${range}`
      )
      const etfPriceList = await reqList.json()
      return etfPriceList.chart.result[0]
    })
    const etfResponseData = await Promise.all(etfResponse)

    return {
      props: {
        fundsData: {
          vooData: etfResponseData[0],
          vtiData: etfResponseData[1],
          vtData: etfResponseData[2],
          vwoData: etfResponseData[3],
        },
      },
    }
  } catch (err) {
    console.log(err)
  }
}

const Home: NextPage = ({ fundsData }: any) => {
  // i18n 対応用
  const router = useRouter()
  const { locale } = router
  let t
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

  return (
    <>
      <NextSeo title={t.pageTitleEtfIndex} description={t.pageDescEtfIndex} />
      <main className='mx-auto mt-6 mb-20 max-w-5xl'>
        {locale === 'ja-JP' ? (
          <EtfIndexJa fundsData={fundsData} />
        ) : (
          <EtfIndexEn fundsData={fundsData} />
        )}
      </main>
    </>
  )
}

export default Home
