import type { NextPage } from 'next'
// import { useEffect } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link'
// import EtfCandleChart from './../../components/EtfCandleChart'

// i18n
import EtfHealthCareEn from './../../locales/en/EtfHealthCare'
import EtfHealthCareJa from './../../locales/ja/EtfHealthCare'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  try {
    const p1 = 1420038000 // 2015/01/01
    const p2 = 9999999999
    const range = '5d' // week "5d" , month "1mo"

    const symbols = ['VHT']

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
          vhtData: etfResponseData[0],
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

  return (
    <main className='mx-auto mt-6 mb-20 max-w-5xl'>
      {locale === 'ja-JP' ? (
        <EtfHealthCareJa fundsData={fundsData} />
      ) : (
        <EtfHealthCareEn fundsData={fundsData} />
      )}
    </main>
  )
}

export default Home
