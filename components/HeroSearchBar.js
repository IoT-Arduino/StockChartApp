import React, { useState } from 'react'
import styles from './HeroSearchBar.module.css'
import Link from 'next/link'
import * as AiIcons from 'react-icons/ai';

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
    <div>
      <div className={styles.searchInputs}>
        <input
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          className={styles.searchInput}
          onChange={handleFilter}
          id="tickerInput"
        />
        {wordEntered.length !== 0 && <div className="cursor-pointer py-2 px-5" onClick={clearInput}><AiIcons.AiOutlineCloseCircle /></div>}
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.dataResult}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link href={`/stocks/${value.Ticker}`} key={key} >
                <a className={styles.dataItem} target='_blank' onClick={clearInput}><p className="px-4">{value.Ticker} | {value.ShortName}</p></a>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
