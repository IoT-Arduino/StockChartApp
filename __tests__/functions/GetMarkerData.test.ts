import { getMarkerData } from '../../functions/GetMarkerData'
import { Marker } from '../../types/StoreTypes'

describe('getMarkerData', () => {
  it('should return an empty array when the input is empty', () => {
    const markers:Marker[] = []
    const result = getMarkerData(markers)
    expect(result).toEqual([])
  })

  it('should return the correct marker data when there is only one marker', () => {
    const markers = [{ date: '2022-03-01', ticker: 'AAPL', memo: 'Apple earnings report' }]
    const result = getMarkerData(markers)
    expect(result).toEqual([
      {
        name: 'AAPL',
        date: '2022/03',
        coord: ['2022/03'],
        value: 'Apple earnings report',
      },
    ])
  })

  it('should return the sorted marker data when there are multiple markers', () => {
    const markers = [
      { date: '2022-03-01', ticker: 'AAPL', memo: 'Apple earnings report' },
      { date: '2021-12-01', ticker: 'GOOG', memo: 'Google earnings report' },
      { date: '2022-01-01', ticker: 'TSLA', memo: 'Tesla earnings report' },
    ]
    const result = getMarkerData(markers)
    expect(result).toEqual([
      {
        name: 'GOOG',
        date: '2021/12',
        coord: ['2021/12'],
        value: 'Google earnings report',
      },
      {
        name: 'TSLA',
        date: '2022/01',
        coord: ['2022/01'],
        value: 'Tesla earnings report',
      },
      {
        name: 'AAPL',
        date: '2022/03',
        coord: ['2022/03'],
        value: 'Apple earnings report',
      },
    ])
  })
})
