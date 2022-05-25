import React from 'react'
import Link from 'next/link'

const Datatable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Name</th>
          <th>Sector</th>
          <th>Market</th>
        </tr>
      </thead>
      <tbody>
        {data.map((code, i) => (
          <tr key={i}>
            <td>{code.Ticker}</td>
            <td>
              <Link href={`/stocks/${code.Ticker}`}>
                <a>{code.Name}</a>
              </Link>
            </td>
            <td>{code.Sector}</td>
            <td>{code.Market}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Datatable
