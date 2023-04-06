import Link from 'next/link'
// import EtfCandleChart from './../../components/EtfCandleChart'
import EtfCompareToSP500 from './../../components/EtfCompareToSP500'

import { Card, Image, Button, Grid } from '@mantine/core'

// Types
import { FundsData } from './../../types/FundsData'

const EtfHealthCare = ({ fundsData }: FundsData ) => {
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

  return (
    <div className='mx-auto md:w-4/5'>
      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>
          VHT Asset Value Trends and Top Component Stocks Charts
        </p>
        <EtfCompareToSP500 fundsData={fundsData} />
        <p className='text-center'>VOO,VHT Comparison Chart(Red line : VOO , Green Line : VHT)</p>
        <div className='mt-16'>
          <p>
            VHT is an ETF offered by Vanguard, an American asset management company, which invests
            in "approximately 450 companies in the healthcare sector, including pharmaceuticals and
            medical devices.
          </p>
          <h3 className='text-bold mt-3 mb-2 text-xl'>Top component stocks</h3>
          <p>Chart is as of July 2022.</p>
          <p>Please click on the company name link for the latest information.</p>

          <Grid>
            {stockList.map((item) => {
              return (
                <Grid.Col md={6} lg={4} key={item.Ticker}>
                  <Card shadow='sm' p='lg'>
                    <Card.Section>
                      <Image
                        src={`/images/etfHealthCare/${item.Ticker}.png`}
                        alt='Chart'
                        width={300}
                        height={196}
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
