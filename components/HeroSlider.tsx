import { useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

import Topimage1 from '../public/images/TopImage1.png'
import Topimage2 from '../public/images/TopImage2.png'
import Topimage3 from '../public/images/TopImage3.png'

import styles from './HeroSlider.module.css'
import HeroSearchBar from './HeroSearchBar'

// i18n
import en from '../locales/en/en'
import ja from '../locales/ja/ja'
import { useRouter } from 'next/router'
// Types
import { Company } from '../types/Company'

export default function HeroSlider({ codeList }: { codeList: Company[] }) {
  // i18n 対応用
  const router = useRouter()
  const { locale } = router

  let t
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

  // Navbarからの検索Modalの開閉に関するもの、バグ防止用
  const [opened, setOpened] = useState(false)

  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  }
  return (
    <div className={styles.slideWrapper}>
      <div className='mx-auto max-w-3xl'>
        <Slider {...settings}>
          <div>
            <Image priority src={Topimage1} alt='image' width={768} height={545}/>
          </div>
          <div>
            <Image priority src={Topimage2} alt='image'  width={768} height={545}/>
          </div>
          <div>
            <Image priority src={Topimage3} alt='image'  width={768} height={545}/>
          </div>
        </Slider>
      </div>
      <div className={styles.slideMessage}>
        <div className='mx-auto w-4/5 rounded bg-yellow-100 bg-opacity-80 p-2 text-center text-gray-800 shadow-xl sm:w-1/2 sm:p-4'>
          <p className='mx-auto my-1 font-sans text-lg font-extrabold sm:mb-2 sm:w-full sm:px-2 md:text-xl'>
            {t.heroSearch1}
            <br />
            {t.heroSearch2}
          </p>
          <div className='mb-2'>
            <HeroSearchBar placeholder='Ticker or Company' data={codeList} setOpened={setOpened} />
          </div>
        </div>
      </div>
    </div>
  )
}
