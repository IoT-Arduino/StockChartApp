import { google } from 'googleapis'
import dayjs from 'dayjs'

export async function getStockInfo(id) {
  try {
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes
    )

    const sheets = google.sheets({ version: 'v4', auth: jwt })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'ContentsList',
    })

    const googleSheetData = response.data.values
    const filteredSheetData = googleSheetData.filter((item) => {
      return item[0] == id
    })
    console.log(filteredSheetData)

    if (filteredSheetData && filteredSheetData[0][1]) {
      // もしinfoを使う場合は、if文の条件も追加する。
      const news = filteredSheetData[0][1].split(',')
      // const info = filteredSheetData[0][2].split(',')

      // GoogleSheetの日付データを変更する処理　＝＝＝＝＝＝＝＝＝＝＝＝＝＝
      var COEFFICIENT = 24 * 60 * 60 * 1000 //日数とミリ秒を変換する係数
      var DATES_OFFSET = 70 * 365 + 17 + 1 + 1 //「1900/1/0」～「1970/1/1」 (日数)
      var MILLIS_DIFFERENCE = 9 * 60 * 60 * 1000 //UTCとJSTの時差 (ミリ秒)

      function convertSn2Ut(serialNumber) {
        // シリアル値→UNIX時間(ミリ秒)
        return (serialNumber - DATES_OFFSET) * COEFFICIENT - MILLIS_DIFFERENCE
      }
      function dateFromSn(serialNumber) {
        // シリアル値→Date
        return new Date(convertSn2Ut(serialNumber))
      }
      // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

      const newsData = news.map((item) => {
        const splited = item.split('-')
        const date = dateFromSn(splited[0])
        return {
          date: dayjs(date).format('YYYY/MM/DD'),
          news: splited[1],
        }
      })

      const newsDataFiltered = newsData.filter((item) => {
        return item.news !== undefined
      })

      return newsDataFiltered
    } else {
      return null
    }
  } catch (err) {
    console.log(err)
  }
}
