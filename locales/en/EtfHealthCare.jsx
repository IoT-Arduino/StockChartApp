import Link from 'next/link'
import EtfCandleChart from './../../components/EtfCandleChart'

const EtfHealthCare = ({ fundsData }) => {
  return (
    <div>
      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>{fundsData.vhtData.meta.symbol}</p>
        <EtfCandleChart etfData={fundsData.vhtData} />
        <div className='mx-auto md:w-4/5'>
          <p>
          VHT is an ETF offered by Vanguard, an American asset management company, which invests in "approximately 450 companies in the healthcare sector, including pharmaceuticals and medical devices.
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>Top component stocks</p>

          <table className='mx-auto w-full text-center text-sm text-gray-500 dark:text-gray-400 sm:w-1/2'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  銘柄
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/UNH'>
                    <a className='text-green-600 hover:text-green-200'>
                    UNH:UnitedHealth Group
                    </a>
                  </Link>
                </td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/JNJ'>
                    <a className='text-green-600 hover:text-green-200'>
                    JNJ:Johnson & Johnson(J&J)
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/PFE'>
                    <a className='text-green-600 hover:text-green-200'>PFE:Pfizer</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/ABBV'>
                    <a className='text-green-600 hover:text-green-200'>ABBV:AbbVie</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/LLY'>
                    <a className='text-green-600 hover:text-green-200'>LLY:Eli Lilly and Company</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/TMO'>
                    <a className='text-green-600 hover:text-green-200'>
                     TMO:Thermo Fisher Scientific
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/ABT'>
                    <a className='text-green-600 hover:text-green-200'>ABT:Abbott Laboratories</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/BMY'>
                    <a className='text-green-600 hover:text-green-200'>
                    BMY:Bristol-Myers Squibb
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/DHR'>
                    <a className='text-green-600 hover:text-green-200'>DHR:Danaher</a>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EtfHealthCare
