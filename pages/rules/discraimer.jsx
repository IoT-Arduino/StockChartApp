// i18n
import en from './../../locales/en/en'
import ja from './../../locales/ja/ja'
import DiscraimerEn from './../../locales/en/Discraimer'
import DiscraimerJa from './../../locales/ja/Discraimer'
import { useRouter } from 'next/router'

const Discraimer = () => {
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
    <div className='mt-8 p-8'>
      {t == ja ? <DiscraimerJa /> : <DiscraimerEn />}
    </div>
  )
}

export default Discraimer
