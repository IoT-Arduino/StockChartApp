import React, { useState } from 'react'
import styles from './HeroSearchBar.module.css'
import Link from 'next/link'

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered,setWordEntered] = useState("")

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
      const companyString = value.Ticker + value.ShortName
      return companyString.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  const clearInput = () => {
      setFilteredData([])
      setWordEntered('')
  }

  return (
    <div className='search'>
      <div className={styles.searchInputs}>
        <input
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          className={styles.searchInput}
          onChange={handleFilter}
        />
        <div onClick={clearInput}>Clear</div>
      </div>
      {filteredData.length != 0 && (
        <div className={styles.dataResult}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link href={`/stocks/${value.Ticker}`} key={key} >
                <a className={styles.dataItem} target='_blank' onClick={clearInput}><p>{value.Ticker} | {value.ShortName}</p></a>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
