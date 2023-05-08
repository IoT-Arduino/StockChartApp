import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// Component
import HeroSlider from '../components/HeroSlider'
// Data
import { codeList } from '../data/stockCode/US-StockList'

// Types
import { Company } from '../types/Company'

// 他に使用されている箇所、全体Index,StockIndex,Navbar
const codeListNotUnlist:Company[] = codeList.filter((item) => {
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
      <div>{t == ja ? <TopComponentJ /> : <TopComponentE />}</div>
    </main>
  )
}

export default Home
