type Marker = {
  date: string
  ticker: string
  memo: string
}

type MarkerData = {
  name: string
  date: string
  coord: string[]
  value: string
}

export const getMarkerData = (marker: Marker[]): MarkerData[] => {
  // データを古い順にソート
  let resultRes = marker.sort(function (a, b) {
    return a.date < b.date ? -1 : 1
  })

  const markerRes = resultRes.map((res, i) => {
    const ymDate = new Date(res.date)
    const dateStr = ymDate.getFullYear() + '/' + ('0' + (ymDate.getMonth() + 1)).slice(-2)

    return {
      name: res.ticker,
      date: dateStr,
      coord: [dateStr],
      value: res.memo,
    }
  })

  return markerRes
}
