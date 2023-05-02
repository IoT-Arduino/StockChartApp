import { registerAllowance } from '../const/settings'
import { Ranks } from '../types/Ranks'
import { Comment } from './../types/StoreTypes'

type CommentsArray = Comment[] | undefined

export const checkAllowanceComment = (rank: Ranks, comments: CommentsArray) => {
  let canCommentInput

  switch (rank) {
    case 'free':
      canCommentInput = comments ? registerAllowance.CommentLimitFree > comments.length : false
      break
    case 'pro':
      canCommentInput = comments ? registerAllowance.CommentLimitPro > comments.length : false
      break
    case 'business':
      canCommentInput = comments ? registerAllowance.CommentLimitBusiness > comments.length : false

      break
    case 'admin':
      canCommentInput = true
      break
    default:
      break
  }

  return {
    canCommentInput,
  }
}
