import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// images
// import DummyImage from './../../public/images/TopAppleChart.png'
import UNHChart from './../../public/images/UNHChart.png'
import TSLAChart from './../../public/images/TSLAChart.png'
import AAPLCandleChart from './../../public/images/AAPLCandleChart.png'
import AAPLCashFlow from './../../public/images/AAPLCashFlow.png'

export const TopComponentJ = () => {
  return (
    <div className='leading-relaxed tracking-wider'>
      <section className='mx-auto mb-8 w-full px-3 pt-2 text-gray-600 sm:pt-10 md:max-w-3xl lg:px-10'>
        <p>
          <span className='font-bold'>
            TenQチャートは、株価ローソク足と財務データ時系列チャートを組み合わせて、直感的に、企業の業績と株価を俯瞰してビッグピクチャを得るものです。
          </span>
          株式銘柄のスクリーニングや、株式投資判断材料の一つとしてお役立てください。
        </p>
        <p>
          複雑で詳細な分析に入る前に、企業の事業価値と株価の関係を時系列で俯瞰することができます。
        </p>
        <p className='font-bold'>
          TenQチャートを使うことで、あなたの投資力は数倍アップすることでしょう。
        </p>
      </section>

      <div className='my-8 flex justify-center md:my-16'>
        <div className='inline-flex h-1 w-16 rounded-full bg-green-500'></div>
      </div>

      <section className='body-font mx-auto max-w-5xl text-gray-600'>
        <h2 className='mx-auto mt-0 mb-4 w-4/5 text-gray-600 md:mt-4 md:mb-0'>
          BPS,EPSと株価の相関を時系列で確認。最適な投資タイミングを見極める。
        </h2>
        <div className='mx-auto flex max-w-5xl flex-col items-center px-3 py-4 md:flex-row'>
          <div className='md:w-1/2 lg:w-full lg:max-w-lg'>
            <Image
              className='rounded object-cover object-center'
              alt='hero'
              src={AAPLCandleChart}
              width={512}
              height={192}
            />
          </div>
          <div className='mt-4 flex flex-col items-center md:mt-0 md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
            <p className='m-0'>
              企業の業績を確認する上で、重要視される、
              BPS,PBR,EPS,PERと株価の関係を時系列でわかりやすく一覧できるようになっています。BPSとEPSの15倍（PER15倍）の合算値の水準「TenQチャートライン」と株価を比較することにより、現在の株価と企業の事業価値、資産価値との乖離を直感的に把握することができます。さらに、コロナショック等重要な社会事象を株価チャート上に吹き出し表示を追加しています。これにより、企業の業績と社会事象との関係を踏まえた株価トレンドについて正確に把握することができ、最適な投資判断の為の良質な情報をわかりやすく提供します。
            </p>
          </div>
        </div>
      </section>

      <section className=' text-gray-600 mt-8 md:mt-12'>
        <div className='mx-auto max-w-5xl'>
          <h2 className='mx-auto mt-0 mb-4 w-4/5 text-gray-600 md:mt-4 md:mb-0'>
            営業キャッシュフローと純利益を時系列で確認。企業の本業での稼ぐ力を時系列で見極める。
          </h2>

          <div className='mx-auto flex max-w-5xl flex-col items-center px-3 py-4 md:flex-row'>
            <div className='md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image
                className='rounded object-cover object-center'
                alt='hero'
                src={AAPLCashFlow}
                width={512}
                height={144}
              />
            </div>
            <div className='mt-4 flex flex-col items-center md:mt-0 md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <p className='m-0'>
                企業の業績を確認する上で、重要視される、
                営業CF、営業CFマージン（営業CF/売上高）、そして営業ＣＦと純利益比較について、わかりやすく一覧できるようになっています。これにより、企業の四半期毎の純利益またそれに伴うEPSが本業から生み出されたものか、あるいは一時的な事象によるものなのかが一目で把握することができます。また株価と同じ画面に時系列でデータを確認できるので、株式の投資価値について直感的に判断することができます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='my-8 flex justify-center md:my-16'>
        <div className='inline-flex h-1 w-16 rounded-full bg-green-500'></div>
      </div>

      <section className='mx-auto mb-12 max-w-5xl text-gray-600'>
        <div className='mx-auto flex max-w-5xl flex-col items-center px-2 py-2 md:flex-row'>
          <div className='flex flex-col items-center text-left md:mb-0 md:w-1/2 md:items-start md:pr-8 lg:flex-grow'>
            <h3 className='mt-0 mb-4 text-xl font-medium text-gray-900 sm:text-2xl'>
              銘柄分析：グロース株
              <br className='hidden lg:inline-block' />
              テスラ[TSLA]
            </h3>
            <p className='mt-0 mb-8'>
              2020年から、株価の上昇に遅れる形で、業績（売上高,営業活動CF,純利益）がすさまじい勢いで上昇していることが見て取れます。現在は、TenQチャートライン（BPS+PER*15）からはかなり乖離しており、買われすぎという見方もできますが、このままの勢いで業績が上昇することで、株価に業績が追いついてくると、さらに株価が先行して上昇することも考えられますね。典型的なグロース株のチャートです。
            </p>
          </div>

          <div className='mt-8 w-5/6 md:mt-0 md:w-1/2 lg:w-full lg:max-w-lg'>
            <Image
              className='rounded object-cover object-center'
              alt='hero'
              src={TSLAChart}
              width={512}
              height={367}
            />
          </div>
        </div>
        <div className='mr-12 text-center'>
          <Link href='/stocks/TSLA'>
            <a className='pl-4 text-green-500 hover:text-green-200'>
              TSLA:テスラのチャートページへ
            </a>
          </Link>
        </div>
      </section>

      <section className='body-font mx-auto mb-12 max-w-5xl text-gray-600'>
        <div className='mx-auto flex max-w-5xl flex-col items-center px-2 py-2 md:flex-row'>
          <div className='flex flex-col items-center md:mb-0 md:w-1/2 md:items-start md:pr-8 md:text-left lg:flex-grow'>
            <h3 className='mt-0 mb-4 text-xl font-medium text-gray-900 sm:text-2xl text-center md:text-left'>
              銘柄分析：高配当バリュー株
              <br className='hidden lg:inline-block' />
              ユナイテッドヘルス[UNH]
            </h3>
            <p className='mt-0 mb-8'>
              好不況の影響に大きく左右されず、順調に利益（緑色の領域）と純資産（青色の領域）を積み上げていく、非常に堅実なヘルスセクターの代表的企業になります。また、営業活動CF（棒グラフ緑色）については、CFマージンが若干低いことが気になりますが、純利益（棒グラフ黄色）との関係は非常に良好で、本業での稼ぐ力が非常に安定した優良企業であるといえます。
            </p>
          </div>
          <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
            <Image
              className='rounded object-cover object-center'
              alt='hero'
              src={UNHChart}
              width={512}
              height={274}
            />
          </div>
        </div>
        <div className='mr-12 text-center'>
          <Link href='/stocks/UNH'>
            <a className='pl-4 text-green-500 hover:text-green-200'>
              UNH:ユナイテッドヘルスのチャートページへ
            </a>
          </Link>
        </div>
      </section>

      <div className='my-8 flex justify-center md:my-16'>
        <div className='inline-flex h-1 w-16 rounded-full bg-green-500'></div>
      </div>

      <section className='body-font text-gray-600'>
        <div className='mx-auto w-full px-2 py-4 md:max-w-5xl'>
          <div className='mb-12 '>
            <h2 className='mt-0 mb-4 text-center text-2xl font-medium text-gray-900'>
              インデックスファンド（ETF）、セクター別ファンド（ETF）比較と分析
            </h2>
            <p className='m-4 md:px-12'>
              インデックスファンド、高配当ファンドに投資される方はこちらのページで、ファンドの比較分析チャートをご覧ください。ファンド毎に上位構成銘柄のリストを掲載しています。また、上位構成銘柄のリストをクリックすることで、個別銘柄のTenQチャートを確認することができます。
            </p>
          </div>
          <div className='mb-10 mt-4 flex flex-wrap space-y-6 sm:m-4 md:space-y-0'>
            <div className='flex flex-col items-center p-2 text-center md:w-1/3'>
              <div className='mb-5 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-10 w-10'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                </svg>
              </div>
              <div className='flex-grow'>
                <h3 className='title-font mb-3 text-center text-lg font-medium text-gray-900'>
                  インデックスファンド<br/>（米国株・世界株）
                </h3>
                <p className='m-4 text-left'>
                  VOO,VTI,VTの2014年末を起点とした成長率を比較分析します。上位構成銘柄のリストアップも行います。
                </p>
                <Link href={`/etfs/etf-index`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Go to Index ETF
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='ml-2 h-4 w-4'
                      viewBox='0 0 24 24'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            <div className='flex flex-col items-center p-2 text-center md:w-1/3'>
              <div className='mb-5 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-10 w-10'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                </svg>
              </div>
              <div className='flex-grow'>
                <h3 className='title-font mb-3 text-lg font-medium text-gray-900'>
                  高配当株<br/>ファンド
                </h3>
                <p className='m-4 text-left'>
                  VYG,VYMの2014年末を起点とした成長率を比較分析します。上位構成銘柄のリストアップも行います。
                </p>
                <Link href={`/etfs/etf-highDividend`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Go to Highdividend ETF
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='ml-2 h-4 w-4'
                      viewBox='0 0 24 24'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            <div className='flex flex-col items-center p-2 text-center md:w-1/3'>
              <div className='mb-5 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-10 w-10'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                </svg>
              </div>
              <div className='flex-grow'>
                <h3 className='title-font mb-3 text-lg font-medium text-gray-900'>
                  ヘルスケアセクター<br/>比較と分析
                </h3>
                <p className='m-4 text-left'>
                  ヘルスケアセクターETFと市場インデックスの比較を行います。上位構成銘柄のリストアップも行います。
                </p>
                <Link href={`/etfs/etf-healthCare`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Go to Health Care ETF
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='ml-2 h-4 w-4'
                      viewBox='0 0 24 24'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
