import React, { ChangeEvent } from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import 'react-datepicker/dist/react-datepicker.css'

type CustomCalendarHeaderProps = {
  date: Date
  changeYear: (year: number) => void
  changeMonth: (month: number) => void
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
  locale?: 'ja-JP' | 'en-US'
}

type Props = {
  style?: React.CSSProperties |  string
}


const YEARS_FOR_DROPDOWN = 10

export const CustomCalendarHeader: React.FC<CustomCalendarHeaderProps> = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  locale
}) => {
  const years = [...Array(YEARS_FOR_DROPDOWN)].map((_, i) => new Date().getFullYear() - i)

    const MonthSelect = ({ style }: Props) => {
      return (
        <select
          value={date.getMonth()}
          onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) =>
            changeMonth(Number(value))
          }
          className={`react-datepicker__month-select ${style}`}
        >
          {Array.from({ length: 12 }, (_, index) =>
            new Date(date.getFullYear(), index).toLocaleDateString(locale, { month: 'long' })
          ).map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      )
    }

  const YearSelect = ({ style }: Props) => {
    return (
      <select
        value={date.getFullYear()}
        onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) =>
          changeYear(Number(value))
        }
        className={`react-datepicker__year-select ${style}`}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className='react-datepicker__header'>
      <div className='mb-2'>
        <button
          className='react-datepicker__navigation react-datepicker__navigation--previous'
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        <div className='mx-2'>
          {date.toLocaleDateString(locale, { year: 'numeric', month: 'long' })}
        </div>
        <button
          className='react-datepicker__navigation react-datepicker__navigation--next'
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>

      <div>
        <button
          className='react-datepicker__navigation react-datepicker__navigation--previous'
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        />
        {locale === 'ja-JP' ? (
          <>
            <YearSelect style={'mr-2'}/>
            <MonthSelect />
          </>
        ) : (
          <>
            <MonthSelect  style={'mr-2'}/>
            <YearSelect />
           </>
        )
        }

        <button
          className='react-datepicker__navigation react-datepicker__navigation--next'
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        />
      </div>
    </div>
  )
}
