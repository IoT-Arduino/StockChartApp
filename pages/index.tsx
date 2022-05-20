import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import EtfCandleChart from './../components/EtfCandleChart';
import EtfCompareLineChart from './../components/EtfCompareLineChart';

export async function getServerSideProps() {
  try {
    const symbol = "VOO"

    const p1 = 1420038000 // 2015/01/01 
    const p2 = 9999999999
    const range = "5d" // week "5d" , month "1mo"

    // const url = `https://query1.finance.yahoo.com/v8/finance/chart/?symbol=${symbol}&period1=${p1}&period2=${p2}&interval=${range}`
    // const reqList = await fetch(url);
    // const priceList = await reqList.json();

    const symbols = ["VOO", "VTI","VT","VIG","VYM","VWO"]
    
    const etfResponse = symbols.map(async (symbol) => {
      let reqList = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/?symbol=${symbol}&period1=${p1}&period2=${p2}&interval=${range}`)
      const etfPriceList = await reqList.json();
      return etfPriceList.chart.result[0];

    })
    const etfResponseData = await Promise.all(etfResponse);

    // console.log(etfResponseData[3].meta)
    // console.log(etfResponseData[4].meta)
    // console.log(etfResponseData[5].meta)
    // console.log(priceList.chart.result[0].indicators.adjclose)

    return {
      props: {
        fundsData: {
          vooData: etfResponseData[0],
          vtiData: etfResponseData[1],
          vtData: etfResponseData[2],
          vigData: etfResponseData[3],
          vymData: etfResponseData[4],
          vwoData: etfResponseData[5],
        }
      },
    };
  } catch (err) {
    console.log(err);
  }
}


const Home: NextPage = ({ fundsData }: any) => {
  
  // console.log(fundsData.vigData)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>米国主要ETF比較</h2>
        <div>米国主要ETF（Vanguard系の比較、2014年末を起点とした成長率）</div>

        <div className="m-8">
          <p className="text-bold text-2xl">VOO,VTI,VT</p>
          <EtfCompareLineChart fundsData={fundsData} />
          <p>VOOの説明（赤線）：S&P500インデックス指数に連動したETF</p>
          <p>VTIの説明（緑線）：中小型株を含めた米国市場の約4,000銘柄をカバーしているETF。厚切りジェイソンさんが著書「ジェイソン流お金の増やし方」でおすすめしている。</p>
          <p>VTの説明（青線）：先進国と新興国市場の両方を対象とし、米国内外の株式で構成されるETF。「ほったらかし投資術」で推奨されている。</p>
          <p className="text-bold text-xl mt-3 mb-2">上位構成銘柄（VOO,VTI,VT共通）</p>
          <ul>
            <li>
              <Link href="/stocks/AAPL">
                <a>AAPL:アップル</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/MSFT">
                <a>MSFT:マイクロソフト</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/AMZN">
                <a>AMZN:アマゾン</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/GOOGL">
                <a>GOOGL:アルファベット</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/TSLA">
                <a>TSLA:テスラ</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/FB">
                <a>FB:メタ</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/NVDA">
                <a>NVDA:エヌビディア</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/BRK-B">
                <a>BRKB:バークシャーハサウェイ</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="m-8">
          <p className="text-bold text-2xl">{ fundsData.vigData.meta.symbol}</p> 
          <EtfCandleChart etfData={fundsData.vigData} />
          <p>VIGの説明：、10年以上連続で一貫して増配する方針がとられている米国株（約250銘柄）を投資対象とするETFです（REITを除く）。</p>
          <p className="text-bold text-xl mt-3 mb-2">上位構成銘柄</p>
          <ul>
            <li>
              <Link href="/stocks/MSFT">
                <a>MSFT:マイクロソフト</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/UNH">
                <a>UNH:ユナイテッドヘルス・グループ</a>
              </Link>
            </li>

            <li>
              <Link href="/stocks/JNJ">
                <a>JNJ:ジョンソン・エンド・ジョンソン(J&J)</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/JPM">
                <a>JPモルガン・チェース・アンド・カンパニー</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/PG">
                <a>PG:プロクター・アンド・ギャンブル(P&G)</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/V">
                <a>V:ビザ</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/HD">
                <a>HD:ホーム・デポ</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/MA">
                <a>MA:マスターカード</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/AVGO">
                <a>AVGO:ブロードコム</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/COST">
                <a>COST:コストコホールセール</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="m-8">
          <p className="text-bold text-2xl">{ fundsData.vymData.meta.symbol}</p>
          <EtfCandleChart etfData={fundsData.vymData} />
          <p>VYMの説明：全米国銘柄の中から大型株を中心に予想配当利回りが市場平均を上回る銘柄で構成されています。（FTSEハイデ ィビデンド・イールド指数に連動します）</p>
          <p className="text-bold text-xl mt-3 mb-2">上位構成銘柄</p>
          <ul>
            <li>
              <Link href="/stocks/JNJ">
                <a>JNJ:ジョンソン・エンド・ジョンソン(J&J)</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/JPM">
                <a>JPモルガン・チェース・アンド・カンパニー</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/PG">
                <a>PG:プロクター・アンド・ギャンブル(P&G)</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/XOM">
                <a>XOM:エクソンモービル</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/CVX">
                <a>CVX:シェブロン</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/HD">
                <a>HD:ホームデポ</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/BAC">
                <a>BAC:バンク・オブ・アメリカ</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/PFE">
                <a>PFE:ファイザー</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/ABBV">
                <a>ABBV:アッヴィ</a>
              </Link>
            </li>
            <li>
              <Link href="/stocks/AVGO">
                <a>AVGO:ブロードコム</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="m-8">
          <p className="text-bold text-2xl">{ fundsData.vwoData.meta.symbol}</p>
          <EtfCandleChart etfData={fundsData.vwoData} />
          <p>VWOの説明：FTSEエマージング・マーケッツ・インデックスに連動する投資成果を目指す。ブラジル、ロシア、インド、台湾、中国、南アフリカなど、世界中の新興国市場で大型・中型株を保有するETF</p>
         　<p className="text-bold text-xl mt-3 mb-2">上位構成銘柄</p>
          <ul>
            <li>2330:TT(TSM:US)/台湾積体電路製造 [TSMC/台湾セ]</li>
            <li>700:HK/騰訊控股[テンセント・ホールディングス]</li>
            <li>9988:HK/アリババグループ・ホールディング</li>
            <li>RIL:IN/リライアンス・インダストリーズ</li>
            <li>INFO:IN/インフォシス</li>
            <li>VALE3:BZ/ヴァーレ</li>
            <li>3690:HK/美団[メイトゥアン]</li>
            <li>939:HK/中国建設銀行 [チャイナ・コンストラクション]</li>
          </ul>
        </div>
        
      </main>
    </div>
  );
};

export default Home;
