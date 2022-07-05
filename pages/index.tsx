// import { useEffect } from 'react'
import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link'
import { useRouter } from 'next/router'

// Component
import HeroSlider from '../components/HeroSlider'
// Data
import { codeList } from '../data/stockCode/US-StockList'

// images
// import DummyImage from '../public/images/TopAppleChart.png'
// import UNHChart from '../public/images/UNHChart.png'
// import TSLAChart from '../public/images/TSLAChart.png'
// import AAPLCandleChart from '../public/images/AAPLCandleChart.png'
// import AAPLCashFlow from '../public/images/AAPLCashFlow.png'

// 他に使用されている箇所、全体Index,StockIndex,Navbar
const codeListNotUnlist = codeList.filter((item) => {
  return item.Unlist != 'unlist'
})

// i18n
import en from '../locales/en/en'
import ja from '../locales/ja/ja'
import { TopComponentE } from '../locales/en/TopComponent'
import { TopComponentJ } from '../locales/ja/TopComponent'

const Home: NextPage = () => {
  // i18n
  const router = useRouter()
  const { locale } = router

  let t
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

  return (
    <main>
      <HeroSlider codeList={codeListNotUnlist} />
      <div className='m-8'>{t == ja ? <TopComponentJ /> : <TopComponentE />}</div>
    </main>
  )
}

export default Home
