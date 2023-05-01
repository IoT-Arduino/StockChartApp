import { Ranks } from '../../types/Ranks'
import { mockBookmarks } from '../../__mocks__/fixture/bookmarkData'
import { checkAllowanceBookMark } from '../../functions/checkAllowanceBookMark' 

describe('checkAllowanceBookMark', () => {
  test('should return false for free user when bookmarks exceed limit', () => {
    const rank: Ranks = 'free'
    const result = checkAllowanceBookMark(rank, mockBookmarks)
    expect(result.canBookMarkInput).toBe(false)
  })

  test('should return true for free user when bookmarks are within limit', () => {
    const rank: Ranks = 'free'
    const result = checkAllowanceBookMark(rank, [])
    expect(result.canBookMarkInput).toBe(true)
  })

  test('should return true for admin user', () => {
    const rank: Ranks = 'admin'
    const result = checkAllowanceBookMark(rank, mockBookmarks)
    expect(result.canBookMarkInput).toBe(true)
  })

  test('should return undefined for unknown user rank', () => {
    const rank = 'unknown' as Ranks
    const result = checkAllowanceBookMark(rank, mockBookmarks)
    expect(result.canBookMarkInput).toBeUndefined()
  })
})
