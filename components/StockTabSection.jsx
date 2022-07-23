import React from 'react'
import { UserContext } from '../utils/UserContext'
import { useContext, useState, useEffect } from 'react'
import { Tabs } from '@mantine/core'
import InputCommentsState from './InputCommentsState'
import InputMarkerState from './InputMarkerState'

import dayjs from 'dayjs'

// i18n
// import en from '../locales/en/en'
// import ja from '../locales/ja/ja'
// import { useRouter } from 'next/router';

const StockTabSection = ({
  companyInfo,
  fyCompanyDataForTable,
  isDividend,
  isSplit,
  QtrCompanyDataForTable,
  priceData,
  ticker,
  t,
}) => {
  const { user } = useContext(UserContext)
  const [editDataForMember, setEditDataForMember] = useState()

  useEffect(() => {
    if (user) {
      setEditDataForMember(true)
    } else {
      setEditDataForMember(false)
    }
  }, [user])

  // 株式分割の月を1か月加算してもとに戻す処理
  const splitFilteredData = priceData.filter((item) => {
    return item.splitCategory === 'rSplit' || item.splitCategory === 'split'
  })
  const splitFixedMonthData = splitFilteredData.map((item) => {
    return {
      Ticker: item.Ticker,
      date: dayjs(item.date).add(1, 'M').format('YYYY/MM'),
      calcRatio: item.calcRatio,
      splitCategory: item.splitCategory,
      splitRatio: item.splitRatio,
    }
  })

  return (
    <Tabs color='teal' tabPadding='md'>
      <Tabs.Tab label={t.tab1Label}>
        <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
          <h3 className='my-2 p-2'>{t.tab1Title1}</h3>
          <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableDate}
                </th>
                {companyInfo.Sector === 'Finance' ? null : (
                  <th scope='col' className='px-4 py-2'>
                    {t.tabTableFsRevenue}
                  </th>
                )}
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableFsNetIncome}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableFsOpeCf}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableFsAsset}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableFsEquity}
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
                            ? Number(
                                (item.NetIncomeLossAccum / 1000000).toFixed(2)
                              ).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.operatingCashFlowAccum
                            ? Number(
                                (item.operatingCashFlowAccum / 1000000).toFixed(2)
                              ).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.assets
                            ? Number((item.assets / 1000000).toFixed(2)).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.stockHoldersEquity
                            ? Number(
                                (item.stockHoldersEquity / 1000000).toFixed(2)
                              ).toLocaleString()
                            : '--'}
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
                            ? Number((item.revenueAccum / 1000000).toFixed(2)).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.NetIncomeLossAccum
                            ? Number(
                                (item.NetIncomeLossAccum / 1000000).toFixed(2)
                              ).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.operatingCashFlowAccum
                            ? Number(
                                (item.operatingCashFlowAccum / 1000000).toFixed(2)
                              ).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.assets
                            ? Number((item.assets / 1000000).toFixed(2)).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.stockHoldersEquity
                            ? Number(
                                (item.stockHoldersEquity / 1000000).toFixed(2)
                              ).toLocaleString()
                            : '--'}
                        </td>
                      </tr>
                    )
                  }
                })}
            </tbody>
          </table>
        </div>

        <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
          <h3 className='my-2 p-2'>{t.tab1Title2}</h3>
          <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableDate}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabIndicatorPrice}
                </th>
                <th scope='col' className='px-4 py-2'>
                  BPS
                </th>
                <th scope='col' className='px-4 py-2'>
                  PBR
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabIndicatorEpsAnnual}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabIndicatorPerAnnual}
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
                      <td className='px-4 py-2'>{item.bps != 'NaN' ? item.bps : '--'} </td>
                      <td className='px-4 py-2'>{item.pbr != 'NaN' ? item.pbr : '--'}</td>
                      <td className='px-4 py-2'>{item.epsAccum !== 'NaN' ? item.epsAccum : '--'}</td>
                      <td className='px-4 py-2'>
                        {item.perAccum !== NaN
                          ? item.perAccum > 0
                            ? item.perAccum.toFixed(2)
                            : 'minus'
                          : '--'}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        {isDividend && (
          <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
            <h3 className='my-2 p-2'>{t.tab1TitleDividend}</h3>
            <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-4 py-2'>
                    {t.tabTableDate}
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    {t.tabIndicatorDps}
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    {t.tabIndicatorDividendYield}
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    {t.tabIndicatorDividendPayoutRatio}
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
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.dividendYieldYear != 'NaN%' ? item.dividendYieldYear : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.dividendPayoutRatioYear != 'NaN%'
                            ? item.dividendPayoutRatioYear
                            : '--'}
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
            <h3 className='my-2 p-2 text-lg font-bold'>{t.tab1TitleSplit}</h3>
            <ul className='my-3'>
              {splitFixedMonthData &&
                splitFixedMonthData.map((item, i) => {
                  if (item.splitCategory) {
                    return (
                      <li key={i}>
                        {item.date} / {t.tabSplitCate}: {item.splitCategory} / {t.tabSplitRatio}:
                        {item.splitRatio} /
                      </li>
                    )
                  }
                })}
            </ul>
          </div>
        )}
      </Tabs.Tab>
      <Tabs.Tab label={t.tab2Label}>
        <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
          <h3 className='my-2 p-2'>{t.tab2Title1}</h3>
          <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableDate}
                </th>
                {companyInfo.Sector === 'Finance' ? null : <th>{t.tabTableFsRevenue}</th>}
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableFsNetIncome}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableFsOpeCf}
                </th>
                {companyInfo.Sector === 'Finance' ? (
                  <th scope='col' className='px-4 py-2'>
                    {t.tabTableFsAsset}
                  </th>
                ) : (
                  <th scope='col' className='px-4 py-2'>
                    {t.tabTableFsOpeCfMargin}
                  </th>
                )}

                <th scope='col' className='px-4 py-2'>
                  {t.tabTableFsEquity}
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
                            ? Number((item.NetIncomeLoss / 1000000).toFixed(2)).toLocaleString()
                            : '--'}{' '}
                        </td>
                        <td className='px-4 py-2'>
                          {' '}
                          {item.operatingCashFlow
                            ? Number((item.operatingCashFlow / 1000000).toFixed(2)).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.assets
                            ? Number((item.assets / 1000000).toFixed(2)).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.stockHoldersEquity
                            ? Number(
                                (item.stockHoldersEquity / 1000000).toFixed(2)
                              ).toLocaleString()
                            : '--'}
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
                          {item.revenue
                            ? Number((item.revenue / 1000000).toFixed(2)).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.NetIncomeLoss
                            ? Number((item.NetIncomeLoss / 1000000).toFixed(2)).toLocaleString()
                            : '--'}{' '}
                        </td>
                        <td className='px-4 py-2'>
                          {' '}
                          {item.operatingCashFlow
                            ? Number((item.operatingCashFlow / 1000000).toFixed(2)).toLocaleString()
                            : '--'}
                        </td>
                        <td className='px-4 py-2'>
                          {item.operatingCashFlowMargin
                            ? item.operatingCashFlowMargin >= 0
                              ? (item.operatingCashFlowMargin * 100).toFixed(1)
                              : '--'
                            : '--'}
                          %
                        </td>
                        <td className='px-4 py-2'>
                          {item.stockHoldersEquity
                            ? Number(
                                (item.stockHoldersEquity / 1000000).toFixed(2)
                              ).toLocaleString()
                            : '--'}
                        </td>
                      </tr>
                    )
                  }
                })}
            </tbody>
          </table>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label={t.tab3Label}>
        <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
          <h3 className='my-2 p-2'>{t.tab3Title1}</h3>

          <table className='w-full text-right text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  {t.tabTableDate}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabIndicatorPrice}
                </th>
                <th scope='col' className='px-4 py-2'>
                  BPS
                </th>
                <th scope='col' className='px-4 py-2'>
                  PBR
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabIndicatorEpsQtr}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabIndicatorPerQtrToAnnual}
                </th>
                <th scope='col' className='px-4 py-2'>
                  {t.tabIndicatorShareOutstanding}
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
                      <td className='px-4 py-2'>{item.bps != 'NaN' ? item.bps : '--'} </td>
                      <td className='px-4 py-2'>{item.pbr != 'NaN' ? item.pbr : '--'} </td>
                      <td className='px-4 py-2'>{item.eps != 'NaN' ? item.eps : '--'}</td>
                      <td className='px-4 py-2'>
                        {item.per !== NaN ? (item.per >= 0 ? item.per.toFixed(2) : 'minus') : '--'}
                      </td>
                      <td className='px-4 py-2'>
                        {Number.isNaN(item.numberOfSharesOutstanding)
                          ? '--'
                          : parseInt(item.numberOfSharesOutstanding / 1000000).toLocaleString()}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label={t.tab4Label} disabled={!editDataForMember}>
        <div className='my-3'>
          <InputMarkerState ticker={ticker} t={t} />
          <InputCommentsState ticker={ticker} t={t} />
        </div>
      </Tabs.Tab>
    </Tabs>
  )
}

export default StockTabSection
