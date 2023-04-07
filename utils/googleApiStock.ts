import { google } from 'googleapis'
import dayjs from 'dayjs'

interface NewsData {
  date: string
  news: string
}

interface InfoData {
  date: string
  info: string
}

interface Data {
  newsDataFiltered: NewsData[] | null
  infoDataFiltered: InfoData[] | null
}

export async function getStockInfo(id: string): Promise<any> {
  try {
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n') ,
      scopes
    )

    const sheets = google.sheets({ version: 'v4', auth: jwt })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'ContentsList',
    })

    const googleSheetData = response.data.values
    const filteredSheetData = googleSheetData?.filter((item) => {
      return item[0] == id
    })

    // GoogleSheetの日付データを変更する処理　＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    var COEFFICIENT = 24 * 60 * 60 * 1000 //日数とミリ秒を変換する係数
    var DATES_OFFSET = 70 * 365 + 17 + 1 + 1 //「1900/1/0」～「1970/1/1」 (日数)
    var MILLIS_DIFFERENCE = 9 * 60 * 60 * 1000 //UTCとJSTの時差 (ミリ秒)

    // function convertSn2Ut(serialNumber: number): number {
    //   // シリアル値→UNIX時間(ミリ秒)
    //   return (serialNumber - DATES_OFFSET) * COEFFICIENT - MILLIS_DIFFERENCE
    // }

    const convertSn2Ut = (serialNumber: number): number => {  // シリアル値→UNIX時間(ミリ秒)
      return (serialNumber - DATES_OFFSET) * COEFFICIENT - MILLIS_DIFFERENCE
    }

    // function dateFromSn(serialNumber: number): Date {
    //   // シリアル値→Date
    //   return new Date(convertSn2Ut(serialNumber))
    // }

    const dateFromSn = (serialNumber: number): Date => {  // シリアル値→Date  
      return new Date(convertSn2Ut(serialNumber))
    }


    let newsDataFiltered: NewsData[] | null
    let infoDataFiltered: InfoData[] | null

    if (filteredSheetData && filteredSheetData[0][1]) {
      const news = filteredSheetData[0][1].split(',')

      const newsData = news.map((item: any) => {
        const splited = item.split('-')
        const date = dateFromSn(splited[0])
        return {
          date: dayjs(date).format('YYYY/MM/DD'),
          news: splited[1],
        }
      })

      newsDataFiltered = newsData.filter((item: any) => {
        return item.news !== undefined
      })
    } else {
      newsDataFiltered = null
    }

    if (filteredSheetData && filteredSheetData[0][2]) {
      const info = filteredSheetData[0][2].split(',')

      const infoData = info.map((item: any) => {
        const splited = item.split('-')
        const date = dateFromSn(splited[0])
        return {
          date: dayjs(date).format('YYYY/MM/DD'),
          news: splited[1],
        }
      })

      infoDataFiltered = infoData.filter((item: any) => {
        return item.news !== undefined
      })
    } else {
      infoDataFiltered = null
    }

    const data = {
      newsDataFiltered,
      infoDataFiltered,
    }

    return data
  } catch (err) {
    console.log(err)
  }
}
