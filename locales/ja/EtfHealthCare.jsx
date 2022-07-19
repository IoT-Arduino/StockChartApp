import Link from 'next/link'
// import EtfCandleChart from './../../components/EtfCandleChart'
import EtfCompareToSP500 from './../../components/EtfCompareToSP500';
import { Card, Image,  Button, Grid } from '@mantine/core'

const stockList = [
  {
    Ticker: 'UNH',
    Name: 'UnitedHealth Group',
  },
  {
    Ticker: 'JNJ',
    Name: 'JNJ:Johnson & Johnson(J&J)',
  },
  {
    Ticker: 'PFE',
    Name: 'Pfizer',
  },
  {
    Ticker: 'ABBV',
    Name: 'AbbVie Inc. Common Stock',
  },
  {
    Ticker: 'LLY',
    Name: 'Eli Lilly and Company',
  },
  {
    Ticker: 'TMO',
    Name: 'Thermo Fisher Scientific',
  },
  {
    Ticker: 'ABT',
    Name: 'Abbott Laboratories Common Stock',
  },
  {
    Ticker: 'BMY',
    Name: 'Bristol-Myers Squibb',
  },
  {
    Ticker: 'DHR',
    Name: 'Danaher',
  },
]

const EtfHealthCare = ({ fundsData }) => {
  return (
    <div className='mx-auto md:w-4/5'>
      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>{fundsData.vhtData.meta.symbol}の資産価値推移と構成銘柄チャート一覧</p>
        <EtfCompareToSP500 fundsData={fundsData} />
        <p className="text-center">VOO,VHT比較チャート(Red line : VOO , Green Line : VHT)</p>
        <div className="mt-16">
          <p>
            VHTはアメリカの資産運用会社・バンガード社が提供するETFで、「医薬品や医療機器などを含むヘルスケアセクターの企業（約450社）」を投資対象とするETFです。
          </p>
          <h3 className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄</h3>
          <p>チャートは2022年7月現在のもの</p>
          <p>最新情報は会社名のリンクをクリックして参照してください。</p>

          <Grid>
          {stockList.map((item, i) => {
            return (
              <Grid.Col md={6} lg={4} key={item.Ticker}>
                <Card shadow='sm' p='lg'>
                  <Card.Section>
                    <Image
                      src={`/images/etfHealthCare/${item.Ticker}.png`}
                      alt='Chart'
                    />
                  </Card.Section>

                  <Button variant='light' color='green' fullWidth style={{ marginTop: 14 }}>
                    <Link href={`/stocks/${item.Ticker}`}>
                      <a className='text-green-600 hover:text-green-200'>
                        {item.Ticker}:{item.Name}
                      </a>
                    </Link>
                  </Button>
                </Card>
              </Grid.Col>
            )
          })}
        </Grid>


        </div>
      </div>
    </div>
  )
}

export default EtfHealthCare
