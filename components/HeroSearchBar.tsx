import React, { useState } from 'react'
import styles from './HeroSearchBar.module.css'
import Link from 'next/link'
import * as AiIcons from 'react-icons/ai'
// Types
import { Company } from '../types/Company'

function SearchBar({ placeholder, data, setOpened }:{placeholder:string, data:Company[], setOpened:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [filteredData, setFilteredData] = useState<Company[]>([])
  const [wordEntered, setWordEntered] = useState('')

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
      return (
        value.Ticker.toLowerCase().indexOf(searchWord.toLowerCase()) > -1 ||
        value.ShortName.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
      )
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

  const clickLink = () => {
    setOpened(false)
    setFilteredData([])
    setWordEntered('')
  }

  return (
    <div>
      <div className={styles.searchInputWrapper}>
        <input
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          className={styles.searchInput}
          onChange={handleFilter}
          data-autofocus
        />
        {wordEntered.length !== 0 && (
          <div className='cursor-pointer px-2' onClick={clearInput}>
            <span className='inline-block h-8 leading-8'>
              <AiIcons.AiOutlineCloseCircle />
            </span>
          </div>
        )}
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.dataResult}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link href={`/stocks/${value.Ticker}`} key={key}>
                <a className={styles.dataItem} target='_blank' onClick={clickLink}>
                  <span className='px-4'>
                    {value.Ticker} | {value.ShortName}
                  </span>
                </a>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
