
export const createMarkerData = (markerData) => {

  // データを古い順にソート
  let resultRes = markerData.sort(function (a, b) {
    return a.period < b.period ? -1 : 1;
  });
    
   const markerRes = resultRes.map((res, i) => {
      
        return   (          {
            name: res.Ticker,
            date:res.date,
              coord: [res.date],
              value: res.value,
            })
  })

 return markerRes;
}


