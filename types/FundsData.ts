export type FundsData = {
  fundsData: {
    vigData?: {
      timestamp: number[]
      indicators: {
        quote: {
          [key: string]: number[]
        }
      }
    }
    vymData?: {
      timestamp: number[]
      indicators: {
        quote: {
          [key: string]: number[]
        }
      }
    }
    vhtData?: {
      timestamp: number[]
      indicators: {
        quote: {
          [key: string]: number[]
        }
      }
    }
    vooData?: {
      timestamp: number[]
      indicators: {
        quote: {
          [key: string]: number[]
        }
      }
    }
    vtiData?: {
      timestamp: number[]
      indicators: {
        quote: {
          [key: string]: number[]
        }
      }
    }
    vtData?: {
      timestamp: number[]
      indicators: {
        quote: {
          [key: string]: number[]
        }
      }
    }
    vwoData?: {
      timestamp: number[]
      indicators: {
        quote: {
          [key: string]: number[]
        }
      }
    }
  }
}
