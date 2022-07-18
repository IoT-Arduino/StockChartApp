import Link from 'next/link'
// Types
import { Company } from '../types/Company'

const Datatable = ({ data }:{data:Company[]}) => {
  return (
    <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
      <thead  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-2">Ticker</th>
          <th scope="col" className="px-4 py-2">Security Name</th>
          <th scope="col" className="px-4 py-2">Sector</th>
          <th scope="col" className="px-4 py-2">Market</th>
        </tr>
      </thead>
      <tbody>
        {data.map((code, i) => (
          <tr key={i} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
            <td className="px-4 py-2">{code.Ticker}</td>
            <td className="px-4 py-2">
              <Link href={`/stocks/${code.Ticker}`} prefetch={false}>
                <a className="text-green-600 hover:text-green-200">{code.Name}</a>
              </Link>
            </td>
            <td className="px-4 py-2">{code.Sector}</td>
            <td className="px-4 py-2">{code.Market}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Datatable
