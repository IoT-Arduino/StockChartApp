
import { registerAllowance } from '../const/settings'
export const checkAllowanceBookMark =  (rank, bookmarks) => {
    let canBookMarkInput
  
    switch (rank) {
      case 'free':
        canBookMarkInput = bookmarks
          ? registerAllowance.BookMarkLimitFree > bookmarks.length
          : false
  
        break
      case 'pro':
        canBookMarkInput = bookmarks
          ? registerAllowance.BookMarkLimitPro > bookmarks.length
          : false
  
        break
      case 'business':
        canBookMarkInput = bookmarks
          ? registerAllowance.BookMarkLimitBusiness > bookmarks.length
          : false
  
        break
      case 'admin':
        canBookMarkInput = true
        break
      default:
        break
    }


 
    return {
      canBookMarkInput,
    }
  }