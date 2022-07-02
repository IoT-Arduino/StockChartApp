import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// images
import DummyImage from './../../public/images/TopAppleChart.png'
import UNHChart from './../../public/images/UNHChart.png'
import TSLAChart from './../../public/images/TSLAChart.png'
import AAPLCandleChart from './../../public/images/AAPLCandleChart.png'
import AAPLCashFlow from './../../public/images/AAPLCashFlow.png'

export const TopComponentJ = () => {
  return (
    <div>
      <section className='body-font text-gray-600'>
        <div className='mx-auto w-full px-3 pt-10 md:max-w-5xl'>
          <div className='mb-8'>
            <h2 className='title-font mb-4 text-center text-xl font-medium text-gray-900 sm:text-3xl md:text-left'>
              米国代表500社の株価、四半期業績を直感的に俯瞰できる！
              <br />
              TenQチャートとは
            </h2>
            <div className='px-2 text-xl lg:px-10'>
              <p className='mb-4'>株式投資の為の分析には二つの方法があります。</p>
              <p>一つはチャート分析、移動平均線、RSI、MACD等のテクニカル指標を使うもの。</p>
              <p>もう一つは、ファンダメンタル分析といい、財務諸表分析等を行うもの。</p>
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
            </div>

            <div className='mt-8 flex justify-center'>
              <div className='inline-flex h-1 w-16 rounded-full bg-green-500'></div>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-3 py-8 md:flex-row'>
            <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image
                className='rounded object-cover object-center'
                alt='hero'
                src={AAPLCandleChart}
              />
            </div>
            <div className='mt-8 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <h2 className='title-font mb-4 text-xl font-medium text-gray-900 sm:text-2xl'>
                BPS,EPSと株価の相関を時系列で確認。
                <br className='hidden lg:inline-block' />
                最適な投資タイミングを見極める。
              </h2>
              <p className='mb-8 leading-relaxed'>
                企業の業績を確認する上で、重要視される、
                BPS,PBR,EPS,PERと株価の関係を時系列でわかりやすく一覧できるようになっています。BPSとEPSの15倍（PER15倍）の合算値の水準「TenQチャートライン」と株価を比較することにより、現在の株価と企業の事業価値、資産価値との乖離を直感的に把握することができます。さらに、コロナショック等重要な社会事象を株価チャート上に吹き出し表示を追加しています。これにより、企業の業績と社会事象との関係を踏まえた株価トレンドについて正確に把握することができ、最適な投資判断の為の良質な情報をわかりやすく提供します。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-3 py-8 md:flex-row'>
            <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image className='rounded object-cover object-center' alt='hero' src={AAPLCashFlow} />
            </div>
            <div className='mt-8 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <h2 className='title-font mb-4 text-xl font-medium text-gray-900 sm:text-2xl'>
                営業ＣＦマージン、営業ＣＦと純利益を時系列で確認。
                <br className='hidden lg:inline-block' />
                企業の本業での稼ぐ力を時系列で見極める。
              </h2>
              <p className='mb-8 leading-relaxed'>
                企業の業績を確認する上で、重要視される、
                営業CF、営業CFマージン（営業CF/売上高）、そして営業ＣＦと純利益比較について、わかりやすく一覧できるようになっています。これにより、企業の四半期毎の純利益またそれに伴うEPSが本業から生み出されたものか、あるいは一時的な事象によるものなのかが一目で把握することができます。また株価と同じ画面に時系列でデータを確認できるので、株式の投資価値について直感的に判断することができます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='mb-2'>
          <div className='mx-auto w-full rounded-xl bg-yellow-100 bg-opacity-80 p-4 text-center text-gray-800 shadow-xl sm:w-2/3 md:w-1/2 '>
            <h2 className='mb-4 text-xl font-extrabold sm:text-2xl md:text-4xl'>TenQチャート</h2>
            <p className='mx-auto mb-2 font-sans font-extrabold sm:mb-4 sm:w-full sm:px-2 md:text-xl'>
              米国企業の四半期業績と株価を一発確認
            </p>
            <div className='mb-2'>
              <Link href='/stocks'>
                <a className='text-lg font-extrabold text-green-500 hover:text-green-200'>
                  米国代表500社株式一覧をチェック!
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-2 py-8 md:flex-row'>
            <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image className='rounded object-cover object-center' alt='hero' src={TSLAChart} />
            </div>
            <div className='mt-8 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <h2 className='title-font mb-4 text-xl font-medium text-gray-900 sm:text-2xl'>
                銘柄分析：グロース株
                <br className='hidden lg:inline-block' />
                テスラ[TSLA]
              </h2>
              <p className='mb-8 leading-relaxed'>
                2020年から、株価の上昇に遅れる形で、業績（売上高,営業活動CF,純利益）がすさまじい勢いで上昇していることが見て取れます。現在は、TenQチャートライン（BPS+PER*15）からはかなり乖離しており、買われすぎという見方もできますが、このままの勢いで業績が上昇することで、株価に業績が追いついてくると、さらに株価が先行して上昇することも考えられますね。典型的なグロース株のチャートです。
              </p>
              <Link href='/stocks/TSLA'>
                <a className='text-green-500 hover:text-green-200'>TSLA:テスラのチャートページへ</a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-2 py-8 md:flex-row'>
            <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image className='rounded object-cover object-center' alt='hero' src={UNHChart} />
            </div>
            <div className='mt-8 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <h2 className='title-font mb-4 text-xl font-medium text-gray-900 sm:text-2xl'>
                銘柄分析：高配当バリュー株
                <br className='hidden lg:inline-block' />
                ユナイテッドヘルス[UNH]
              </h2>
              <p className='mb-8 leading-relaxed'>
                好不況の影響に大きく左右されず、順調に利益（緑色の領域）と純資産（青色の領域）を積み上げていく、非常に堅実なヘルスセクターの代表的企業になります。また、営業活動CF（棒グラフ緑色）については、CFマージンが若干低いことが気になりますが、純利益（棒グラフ黄色）との関係は非常に良好で、本業での稼ぐ力が非常に安定した優良企業であるといえます。
              </p>
              <Link href='/stocks/UNH'>
                <a className='text-green-500 hover:text-green-200'>
                  UNH:ユナイテッドヘルスのチャートページへ
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto w-full px-2 py-8 md:max-w-5xl'>
          <div className='mb-12 text-center'>
            <h2 className='title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl'>
              インデックスファンド（ETF）、セクター別ファンド（ETF）比較と分析
            </h2>
            <p className='text-gray-500s mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4'>
              インデックスファンド、高配当ファンドに投資される方はこちらのページで、ファンドの比較分析チャートをご覧ください。ファンド毎に上位構成銘柄のリストを掲載しています。また、上位構成銘柄のリストをクリックすることで、個別銘柄のTenQチャートを確認することができます。
            </p>
            <div className='mt-6 flex justify-center'>
              <div className='inline-flex h-1 w-16 rounded-full bg-green-500'></div>
            </div>
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
                <h2 className='title-font mb-3 text-lg font-medium text-gray-900'>
                  インデックスファンド（米国株・世界株）
                </h2>
                <p className='text-base leading-relaxed'>
                  VOO,VTI,VTの2014年末を起点とした成長率を比較分析します。上位構成銘柄のリストアップも行います。
                </p>
                <Link href={`/etfs/etf-index`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Read More
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
                <h2 className='title-font mb-3 text-lg font-medium text-gray-900'>
                  高配当株ファンド
                </h2>
                <p className='text-base leading-relaxed'>
                  VYG,VYMの2014年末を起点とした成長率を比較分析します。上位構成銘柄のリストアップも行います。
                </p>
                <Link href={`/etfs/etf-highDividend`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Read More
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
                <h2 className='title-font mb-3 text-lg font-medium text-gray-900'>
                  ヘルスケアセクター比較と分析
                </h2>
                <p className='text-base leading-relaxed'>
                  ヘルスケアセクターファンドと市場インデックスの比較を行います。上位構成銘柄のリストアップも行います。
                </p>
                <Link href={`/etfs/etf-healthCare`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Read More
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
