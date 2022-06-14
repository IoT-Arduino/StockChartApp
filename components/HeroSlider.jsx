import React,{useState} from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

import Topimage1 from '../public/images/TopImage1.png'
import Topimage2 from '../public/images/TopImage2.png'
import Topimage3 from '../public/images/TopImage3.png'

import styles from './HeroSlider.module.css'
import HeroSearchBar from './HeroSearchBar';

export default function HeroSlider({codeList}) {

  // NavbarのModalの開閉に関するもの、バグ防止用
  const [opened, setOpened] = useState(false)

  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows:false
  }
  return (
    <div className={styles.slideWrapper}>
      <div className="max-w-3xl mx-auto">
        <Slider {...settings}>
          <div>
            <Image priority src={Topimage1}  alt='image' />
          </div>
          <div>
            <Image priority src={Topimage2} alt='image' />
          </div>
          <div>
            <Image priority src={Topimage3} alt='image' />
          </div>
        </Slider>
      </div>
      <div className={styles.slideMessage}>
        <div className='rounded bg-yellow-100 bg-opacity-80 text-center text-gray-800 shadow-xl p-2 sm:p-4 mx-auto w-4/5 sm:w-1/2'>
          <h2 className='my-2 sm:mb-4 text-xl font-extrabold sm:text-2xl md:text-4xl'>
            TenQチャート
          </h2>
          <p className='mx-auto my-1 sm:mb-2 font-sans text-lg font-extrabold sm:w-full sm:px-2 md:text-xl'>
            業績と株価一覧確認
          </p>
          <div className='mb-2'>
            <HeroSearchBar placeholder="Ticker or Company" data={codeList} setOpened={setOpened} />
          </div>
        </div>
      </div>
    </div>
  )
}
