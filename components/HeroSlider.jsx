import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import Topimage1 from '../public/images/TopAppleChart.png'

import styles from './HeroSlider.module.css'
import HeroSearchBar from './HeroSearchBar';

export default function HeroSlider({codeList}) {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <div className={styles.slideWrapper}>
      <div>
        <Slider {...settings}>
          <div>
            <Image priority src={Topimage1} alt='image' />
          </div>
          <div>
            <Image priority src={Topimage1} alt='image' />
          </div>
          <div>
            <Image priority src={Topimage1} alt='image' />
          </div>
        </Slider>
      </div>
      <div className={styles.slideMessage}>
        <div className='rounded bg-yellow-100 bg-opacity-80 text-center text-gray-800 shadow-xl p-4 mx-auto w-4/5 sm:w-1/2'>
          <h2 className='head-message mb-4 text-xl font-extrabold sm:text-2xl md:mb-8 md:text-4xl'>
            TenQチャート
          </h2>
          <p className='w-70 mx-auto mb-2 font-sans text-lg font-extrabold sm:mb-4 sm:w-full sm:px-2 md:mb-8 md:text-xl'>
            業績と株価一覧確認
          </p>
          <div className='mb-2'>
          {/*<HeroSearchBar placeholder="enter input" data={BookData}/> */}
            <HeroSearchBar placeholder="enter input" data={codeList}/>
          </div>
        </div>
      </div>
    </div>
  )
}
