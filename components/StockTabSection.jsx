import React from 'react'
import { UserContext } from '../utils/UserContext'
import { useContext } from 'react'
import { Tabs } from '@mantine/core'
import InputCommentsState from './InputCommentsState'
import InputMarkerState from './InputMarkerState'

const StockTabSection = ({companyInfo,fyCompanyDataForTable,isDividend,isSplit,QtrCompanyDataForTable,priceData,ticker}) => {

    const { user } = useContext(UserContext)  

  return (
    <Tabs>
        <Tabs.Tab label='通期業績・配当'>
          <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
            <h3 className='my-2 p-2'>通期業績データ FS</h3>
            <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-4 py-2'>
                    年月
                  </th>
                  {companyInfo.Sector === 'Finance' ? null : (
                    <th scope='col' className='px-4 py-2'>
                      売上高
                    </th>
                  )}
                  <th scope='col' className='px-4 py-2'>
                    純利益
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    営業CF
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    総資産
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    株主資本
                  </th>
                </tr>
              </thead>
              <tbody>
                {fyCompanyDataForTable &&
                  fyCompanyDataForTable.map((item, i) => {
                    if (companyInfo.Sector === 'Finance') {
                      return (
                        <tr
                          className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                          key={i}
                        >
                          <td className='px-4 py-2'>{item.date}</td>
                          <td className='px-4 py-2'>
                            {item.NetIncomeLossAccum
                              ? parseInt(item.NetIncomeLossAccum / 1000).toLocaleString()
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.operatingCashFlowAccum
                              ? parseInt(item.operatingCashFlowAccum / 1000).toLocaleString()
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.assets ? parseInt(item.assets / 1000).toLocaleString() : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.stockHoldersEquity
                              ? parseInt(item.stockHoldersEquity / 1000).toLocaleString()
                              : '-'}
                          </td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr
                          className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                          key={i}
                        >
                          <td className='px-4 py-2'>{item.date}</td>
                          <td className='px-4 py-2'>
                            {item.revenueAccum
                              ? parseInt(item.revenueAccum / 1000000).toLocaleString()
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.NetIncomeLossAccum
                              ? parseInt(item.NetIncomeLossAccum / 1000000).toLocaleString()
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.operatingCashFlowAccum
                              ? parseInt(item.operatingCashFlowAccum / 1000000).toLocaleString()
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.assets ? parseInt(item.assets / 1000000).toLocaleString() : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.stockHoldersEquity
                              ? parseInt(item.stockHoldersEquity / 1000000).toLocaleString()
                              : '-'}
                          </td>
                        </tr>
                      )
                    }
                  })}
              </tbody>
            </table>
          </div>

          <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
            <h3 className='my-2 p-2'>通期業績データ 指標</h3>
            <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-4 py-2'>
                    年月
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    株価
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    BPS
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    PBR
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    EPS（年間）
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    PER（年間）
                  </th>
                </tr>
              </thead>
              <tbody>
                {fyCompanyDataForTable &&
                  fyCompanyDataForTable.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                      >
                        <td className='px-4 py-2'>{item.date}</td>
                        <td className='px-4 py-2'>{item.close} </td>
                        <td className='px-4 py-2'>{item.bps != 'NaN' ? item.bps : '-'} </td>
                        <td className='px-4 py-2'>{item.pbr != 'NaN' ? item.pbr : '-'}</td>
                        <td className='px-4 py-2'>
                          {item.epsAccum !== 'NaN' ? item.epsAccum : '-'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.perAccum !== NaN
                            ? item.perAccum > 0
                              ? item.perAccum.toFixed(2)
                              : 'minus'
                            : '-'}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

          {isDividend && (
            <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
              <h3 className='my-2 p-2'>年間配当データ 指標</h3>
              <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
                <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-2'>
                      年月
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      一株当たり配当年
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      配当利回り年
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      配当性向年
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fyCompanyDataForTable &&
                    fyCompanyDataForTable.map((item, i) => {
                      return (
                        <tr
                          key={i}
                          className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                        >
                          <td className='px-4 py-2'>{item.date}</td>
                          <td className='px-4 py-2'>
                            {item.commonStockDividendsPerShareDeclaredYear != 'NaN'
                              ? item.commonStockDividendsPerShareDeclaredYear
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.dividendYieldYear != 'NaN%' ? item.dividendYieldYear : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.dividendPayoutRatioYear != 'NaN%'
                              ? item.dividendPayoutRatioYear
                              : '-'}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          )}
          {isSplit && (
            <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
              <h3 className='my-2 p-2 text-lg font-bold'>株式分割データ</h3>
              <ul className='my-3'>
                {priceData &&
                  priceData.map((item, i) => {
                    if (item.splitCategory) {
                      return (
                        <li key={i}>
                          {item.date} / 分割種別: {item.splitCategory} / 分割比率:{item.splitRatio} /
                        </li>
                      )
                    }
                  })}
              </ul>
            </div>
          )}
        </Tabs.Tab>
        <Tabs.Tab label='四半期財務'>
          <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
            <h3 className='my-2 p-2'>単四半期業績データ PL/CFS/BS</h3>
            <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-4 py-2'>
                    年月
                  </th>
                  {companyInfo.Sector === 'Finance' ? null : <th>売上高</th>}
                  <th scope='col' className='px-4 py-2'>
                    純利益
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    営業CF
                  </th>
                  {companyInfo.Sector === 'Finance' ? (
                    <th scope='col' className='px-4 py-2'>
                      総資産
                    </th>
                  ) : (
                    <th scope='col' className='px-4 py-2'>
                      営業CFマージン
                    </th>
                  )}

                  <th scope='col' className='px-4 py-2'>
                    株主資本
                  </th>
                </tr>
              </thead>
              <tbody>
                {QtrCompanyDataForTable &&
                  QtrCompanyDataForTable.map((item, i) => {
                    if (companyInfo.Sector === 'Finance') {
                      return (
                        <tr
                          key={i}
                          className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                        >
                          <td className='px-4 py-2'>{item.date}</td>
                          <td className='px-4 py-2'>
                            {item.NetIncomeLoss
                              ? parseInt(item.NetIncomeLoss / 1000000).toLocaleString()
                              : '-'}{' '}
                          </td>
                          <td className='px-4 py-2'>
                            {' '}
                            {item.operatingCashFlow
                              ? parseInt(item.operatingCashFlow / 1000000).toLocaleString()
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.assets ? parseInt(item.assets / 1000000).toLocaleString() : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.stockHoldersEquity
                              ? parseInt(item.stockHoldersEquity / 1000000).toLocaleString()
                              : '-'}
                          </td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr
                          key={i}
                          className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                        >
                          <td className='px-4 py-2'>{item.date}</td>
                          <td className='px-4 py-2'>
                            {item.revenue ? parseInt(item.revenue / 1000000).toLocaleString() : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.NetIncomeLoss
                              ? parseInt(item.NetIncomeLoss / 1000000).toLocaleString()
                              : '-'}{' '}
                          </td>
                          <td className='px-4 py-2'>
                            {' '}
                            {item.operatingCashFlow
                              ? parseInt(item.operatingCashFlow / 1000000).toLocaleString()
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {item.operatingCashFlowMargin
                              ? item.operatingCashFlowMargin >= 0
                                ? (item.operatingCashFlowMargin * 100).toFixed(1)
                                : '-'
                              : '-'}
                            %
                          </td>
                          <td className='px-4 py-2'>
                            {item.stockHoldersEquity
                              ? parseInt(item.stockHoldersEquity / 1000000).toLocaleString()
                              : '-'}
                          </td>
                        </tr>
                      )
                    }
                  })}
              </tbody>
            </table>
          </div>
        </Tabs.Tab>
        <Tabs.Tab label='四半期株価指標'>
          <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
            <h3 className='my-2 p-2'>単四半期業績データ 株式指標等</h3>

            <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-4 py-2'>
                    年月
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    株価
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    BPS
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    PBR
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    EPS(単四半期)
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    PER(単四半期を年間換算)
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    流通株式数
                  </th>
                </tr>
              </thead>
              <tbody>
                {QtrCompanyDataForTable &&
                  QtrCompanyDataForTable.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                      >
                        <td className='px-4 py-2'>{item.date}</td>
                        <td className='px-4 py-2'>{item.close}</td>
                        <td className='px-4 py-2'>{item.bps != 'NaN' ? item.bps : '-'} </td>
                        <td className='px-4 py-2'>{item.pbr != 'NaN' ? item.pbr : '-'} </td>
                        <td className='px-4 py-2'>{item.eps != 'NaN' ? item.eps : '-'}</td>
                        <td className='px-4 py-2'>
                          {item.per !== NaN ? (item.per >= 0 ? item.per.toFixed(2) : 'minus') : '-'}
                        </td>
                        <td className='px-4 py-2'>
                          {Number.isNaN(item.numberOfSharesOutstanding)
                            ? '-'
                            : parseInt(item.numberOfSharesOutstanding / 1000000).toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </Tabs.Tab>
        <Tabs.Tab label='データ入力' disabled={!user}>
            <div className='my-3'>
                <InputMarkerState ticker={ticker} />
                <InputCommentsState ticker={ticker} />
            </div>
        </Tabs.Tab>
      </Tabs>
  )
}

export default StockTabSection
