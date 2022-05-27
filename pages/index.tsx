import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import HeroSlider from '../components/HeroSlider'


export async function getServerSideProps() {
  try {
    const reqList = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/stockCode/US-StockList.json`
    )
    const codeList = await reqList.json()

    const codeListSorted = codeList.sort(function (a, b) {
      if (a.Ticker > b.Ticker) {
        return 1
      } else {
        return -1
      }
    })

    return {
      props: {
        codeList: codeListSorted,
      },
    }
  } catch (err) {
    console.log(err)
  }
}


const Home: NextPage = ({codeList}) => {

  return (
    <main>
      <HeroSlider codeList={codeList} />
      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-5 py-16 md:flex-row'>
            <div className='mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24'>
              <h1 className='title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl'>
                Webフォームから
                <br className='hidden lg:inline-block' />
                クラウドデータベースへの
                <br className='hidden lg:inline-block' />
                Saas連携ご提案します。
              </h1>
              <p className='mb-8 leading-relaxed'>
                「Webフォームと連動するお問合せ見込み顧客管理システム」を
                最新の汎用Saas(Airtableとzapier)を組み合わせ、低コスト構築する方法をご提案します。
                低コストで手軽に始められるので、本格的なシステム、サービスを導入する前の小規模チームでの運営、新規事業立ち上げ時に最適です。お客様へのご提案材料としてご検討ください。
              </p>
              <div className='flex justify-center'>
                <Link href='/'>
                  <button className='inline-flex rounded border-0 bg-blue-500 py-2 px-6 text-lg text-white hover:bg-blue-600 focus:outline-none'>
                    <a>資料請求</a>
                  </button>
                </Link>
                <Link href='/'>
                  <button className='ml-4 inline-flex rounded border-0 bg-gray-100 py-2 px-6 text-lg text-gray-700 hover:bg-gray-200 focus:outline-none'>
                    お問合せ
                  </button>
                </Link>
              </div>
            </div>
            <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image
                className='rounded object-cover object-center'
                alt='hero'
                src='/images/content_team.png'
                width="200"
                height="200"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
    <div className="px-5 pt-10 mx-auto w-full md:max-w-5xl">
      <div className="mb-20">
        <h2
          className="text-center sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4"
        >
          WebフォームからAirtable&zapierへの連携メリット
        </h2>
        <div className="px-2 lg:px-10 text-xl">
          <p className="mb-4">
            海外で普及している汎用Saas製品、Airtableとzapierそしてyoucanbook.meを組み合わせて構築することにより<br />
            以下３つのメリットがあります。
          </p>
          <ol className="list-decimal px-6">
            <li>手軽に、低コストで始められる</li>
            <li>
              汎用性が高いので、項目の追加、自動処理の追加等のカスタマイズ、拡張が容易
            </li>
            <li>
              すべて汎用Saasの組み合わせで実現しているので、ベンダーロックインのリスクが少ない
            </li>
          </ol>
        </div>

        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
        </div>
        <div className="mt-10">
          <Image src="/images/ConceptImage.png" width="100" height="100" alt="image" />
          <p
            className="text-center text-base leading-relaxed sm:w-3/4 lg:w-1/2 mx-auto text-gray-500s mt-4"
          >
            Web制作事業者様における新規サービス企画検証の為の、モックアップ構築サービス（ソースコード、設定ファイル付き）も提供しております。<br />
            <br />
            まずは
            <Link href="/" >
              <a className="text-blue-400 hover:text-blue-600">こちらのリンクから資料請求お申込みください。</a>
              
            </Link>
          </p>
        </div>
      </div>
    </div>
  </section>


  <section className="text-gray-600 body-font">
    <div className="px-5 py-20 mx-auto w-full md:max-w-5xl">
      <div className="text-center mb-20">
        <h2
          className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4"
        >
          Saas連携Webフォーム作成と適応事例
        </h2>
        <p
          className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s"
        >
          コーポレートサイト、ランディングページ等様々なフォームから、見込み顧客管理システムへ自動連携できます。
        </p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
        </div>
        <div className="flex mt-6 justify-center">
          <Image
            className="object-cover object-center rounded w-2/3"
            alt="hero"
            src="/images/MaAutomation.png"
            width="300"
            height="300"
          />
        </div>
      </div>
      <div
        className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6"
      >
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div
            className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0"
          >
            {/* <font-awesome-icon icon="cogs" className="fa-2x" /> */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path
                d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
              ></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              新規ランディングページへの対応
            </h2>
            <p className="leading-relaxed text-base">
              既存企業サイトにランディングページを追加する場合はドメイン設定でサブドメインを設定いただきます。サブドメインのDNS設定をnetlifyに設定することで対応可能です。
            </p>
            <a className="mt-3 text-blue-500 inline-flex items-center"
              >Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div
            className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0"
          >
            {/* <font-awesome-icon icon="share-square" className="fa-2x" /> */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              ワードプレスサイトへの対応
            </h2>
            <p className="leading-relaxed text-base">
              WPFormやContactForm7等のプラグインから、データ連携用のプラグイン等を経由して、Airtableにデータを自動連携します。複雑な開発業務は一切不要、すべてツールの設定で実現します。
            </p>
            <a className="mt-3 text-blue-500 inline-flex items-center"
              >Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div
            className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              新規構築サイトへの対応
            </h2>
            <p className="leading-relaxed text-base">
              JAMStack構成のサイトの場合、Netlifyにホスティングすることで、フォームの確認画面、自動返信、そして、フォーム入力データのAirtable自動登録が行えます。
            </p>
            <a className="mt-3 text-blue-500 inline-flex items-center"
              >Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <Link href="/">
        <button
          className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
        >
          資料請求
        </button>
      </Link>
    </div>
  </section>

  <section className="text-gray-600 body-font">
    <div className="px-5 py-20 mx-auto w-full md:max-w-5xl">
      <div className="text-center mb-20">
        <h2
          className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4"
        >
          その他サービス
        </h2>
        <p
          className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s"
        >
          WebサイトのバックエンドをSaasツールを組み合わせて開発、Webサイトの付加価値向上を実現するサービスを提供します。Web制作会社、Web広告代理店様をSaasで業務支援いたします。JAMStackサイト構築も承ります。
        </p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
        </div>
      </div>
      <div
        className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6"
      >
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div
            className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0"
          >
            {/* <font-awesome-icon icon="calculator" className="fa-2x" /> */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              Webオンライン自動見積書作成機能
            </h2>
            <p className="leading-relaxed text-base">
              Webサイト上で、お客様が自動的に見積書を作製できる画面を構築します。（詳細はお問合せください）
            </p>
            <a className="mt-3 text-blue-500 inline-flex items-center"
              >Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div
            className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0"
          >
            {/* <font-awesome-icon icon="calendar-alt" className="fa-2x" /> */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path
                d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
              ></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              オンラインブッキング設定支援
            </h2>
            <p className="leading-relaxed text-base">
              youcanbook.meを使用した、Web予約システムの設定支援をおこないます。ユーザー向け画面の日本語化対応、管理者向け日本語マニュアルを納品いたします。
              <a
                href="https://d-station-specialist.youcanbook.me/"
                className="text-blue-500"
                target="_blank"
                rel="noreferrer"
                >(サンプル)</a
              >
            </p>
            <a className="mt-3 text-blue-500 inline-flex items-center"
              >Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div
            className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0"
          >
            {/* <font-awesome-icon icon="calendar-alt" className="fa-2x" /> */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              JAMStackサイト(NuxtJS)構築
            </h2>
            <p className="leading-relaxed text-base">
              静的サイト構築による、LigntHouseスコアの高得点獲得を実現します。また、
              OGP、pagination、ブログカテゴリ、パンくずりすと、jsonlDなど対応します。
            </p>
            <a className="mt-3 text-blue-500 inline-flex items-center"
              >Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <Link href="/">
        <button
          className="flex mx-auto mt-16 text-gray-700 bg-gray-300 border-0 py-2 px-8 focus:outline-none hover:bg-gray-200 rounded text-lg"
        >
          お問合せ
        </button>
      </Link>
    </div>
  </section>

  <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <h1
        className="text-2xl font-medium title-font text-gray-900 text-center mb-8"
      >
        資料請求はこちら
      </h1>
      <div className="lg:w-2/3 block sm:flex mx-auto mb-8">
        <div className="w-full sm:w-1/3 mr-8 mb-8">
          <Image
            src="/images/slide-view.png"
            className="block w-full border-gray-200"
            width="200"
            height="200"
            alt="slide"
          />
        </div>
        <div className="w-full sm:w-2/3">
          Airtable,zapier等のSaas製品を組み合わせて実現する、お問合せ見込み顧客管理システムのデータ連携の詳細や、画面のスクリーンショットを盛り込んだ詳細な説明資料をご用意しております(全40ページ）。Web制作会社、Web広告代理店様がSaas製品を組み合わせてお客様にご提案する際に参考となる資料となっております。資料請求ボタンよりお申込みいただければ幸いです。
        </div>
      </div>
      <div className="block mx-auto text-center">
        <Link href="/" >
          <button
            className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg mt-10 sm:mt-0"
          >
            資料請求
          </button>
        </Link>
      </div>
    </div>
  </section>

      <h2>米国主要ETF比較</h2>
      <div>米国主要ETF（Vanguard系の比較、2014年末を起点とした成長率）</div>

      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>VOO,VTI,VT</p>
        <div className='mx-auto md:w-4/5'>
          <p>VOOの説明（赤線）：S&P500インデックス指数に連動したETF</p>
          <p>
            VTIの説明（緑線）：中小型株を含めた米国市場の約4,000銘柄をカバーしているETF。厚切りジェイソンさんが著書「ジェイソン流お金の増やし方」でおすすめしている。
          </p>
          <p>
            VTの説明（青線）：先進国と新興国市場の両方を対象とし、米国内外の株式で構成されるETF。「ほったらかし投資術」で推奨されている。
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄（VOO,VTI,VT共通）</p>
          <ul>
            <li>
              <Link href='/stocks/AAPL'>
                <a>AAPL:アップル</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/MSFT'>
                <a>MSFT:マイクロソフト</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/AMZN'>
                <a>AMZN:アマゾン</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/GOOGL'>
                <a>GOOGL:アルファベット</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/TSLA'>
                <a>TSLA:テスラ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/FB'>
                <a>FB:メタ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/NVDA'>
                <a>NVDA:エヌビディア</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/BRK-B'>
                <a>BRKB:バークシャーハサウェイ</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Home
