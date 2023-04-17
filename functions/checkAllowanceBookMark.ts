import { registerAllowance } from '../const/settings'

import { Ranks } from '../types/Ranks'
import { Bookmark } from '../types/Bookmark'

type BookmarksArray = Bookmark[] | undefined

export const checkAllowanceBookMark =  (rank:Ranks, bookmarks:BookmarksArray) => {
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