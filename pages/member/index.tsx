import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '../../utils/supabase'
import { UserContext } from '../../utils/UserContext'

import { useQueryComments } from '../../hooks/useQueryComments'
import { useQueryBookMark } from '../../hooks/useQueryBookMark'
import { useQueryMarker } from '../../hooks/useQueryMarker'
import { useQueryProfile } from '../../hooks/useQueryProfile'

// types
import { Bookmark } from '../../types/Bookmark'
import { Comments } from '../../types/Comments'
import { NextPage } from 'next'

// 登録数制限
import { registerAllowance } from '../../const/settings'

const Home: NextPage = () => {
  const { user, session } = useContext(UserContext)
  const { replace } = useRouter()
  const { push, pathname } = useRouter()

  const [isDisplay, setIsDisplay] = useState<boolean>(false)

  const [canMarkerInput, setCanMarkerInput] = useState<boolean>(false)
  const [canBookMarkInput, setCanBookMarkInput] = useState<boolean>(false)
  const [canCommentsInput, setCanCommentsInput] = useState<boolean>(false)

  const { data: comments, status: statusComments } = useQueryComments()
  const { data: bookmark, status: statusBookMark } = useQueryBookMark()
  const { data: markers, status: statusMarker } = useQueryMarker()
  const { data: profile, status: statusProfile } = useQueryProfile()

  useEffect(() => {
    if (!user) {
      replace('/signin')
    } else {
      setIsDisplay(true)
      if (profile?.length) {
        checkAllowance(profile[0].rank)
      }
    }
  }, [user, profile])

  const checkAllowance = (rank: any) => {
    switch (rank) {
      case 'free':
        setCanBookMarkInput(
          bookmark?.length ? registerAllowance.BookMarkLimitFree > bookmark.length : false
        )

        setCanMarkerInput(
          markers?.length ? registerAllowance.MarkerLimitFree > markers.length : false
        )

        setCanCommentsInput(
          comments?.length ? registerAllowance.CommentLimitFree > comments.length : false
        )

        break
      case 'pro':
        setCanBookMarkInput(
          bookmark?.length ? registerAllowance.BookMarkLimitPro > bookmark.length : false
        )

        setCanMarkerInput(
          markers?.length ? registerAllowance.MarkerLimitPro > markers.length : false
        )

        setCanCommentsInput(
          comments?.length ? registerAllowance.CommentLimitPro > comments.length : false
        )
        break
      case 'business':
        setCanBookMarkInput(
          bookmark?.length ? registerAllowance.BookMarkLimitBusiness > bookmark.length : false
        )

        setCanMarkerInput(
          markers?.length ? registerAllowance.MarkerLimitBusiness > markers.length : false
        )

        setCanCommentsInput(
          comments?.length ? registerAllowance.CommentLimitBusiness > comments.length : false
        )
        break
      case 'admin':
        setCanBookMarkInput(true)
        setCanMarkerInput(true)
        setCanCommentsInput(true)
        break
      default:
        break
    }
  }

  return (
    <div className='mx-auto max-w-4xl px-2 py-4 sm:px-4'>
      {user && isDisplay ? (
        <p className='font-xl mt-3 mb-2 text-center font-bold'>{user.email}　様会員ページ</p>
      ) : null}
      {user && profile?.length ? <p>会員種別：{profile[0].rank}</p> : null}
      {isDisplay && <p className='font-xl mt-3 mb-2 font-bold'>BookMark一覧 </p>}
      {canBookMarkInput ? <span>登録可能です</span> : <span>登録制限に達しています</span>}
      {bookmark &&
        bookmark.map((mark, i) => {
          return (
            <div key={i}>
              <li>
                <Link href={`/stocks/${mark.ticker}`}>
                  <a>{mark.ticker}</a>
                </Link>
              </li>
            </div>
          )
        })}

      {isDisplay && <p className='font-xl mt-3 mb-2 font-bold'>Marker一覧</p>}
      {canMarkerInput ? <span>登録可能です</span> : <span>登録制限に達しています</span>}
      {markers && (
        <div className='my-4 mx-auto w-1/2 shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  銘柄
                </th>
                <th scope='col' className='px-4 py-2'>
                  登録日
                </th>
                <th scope='col' className='px-4 py-2'>
                  Marker内容
                </th>
              </tr>
            </thead>
            <tbody>
              {markers.map((marker, i) => {
                return (
                  <tr
                    key={i}
                    className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                  >
                    <td className='px-4 py-2'>
                      <Link href={`/stocks/${marker.ticker}`}>
                        <a>{marker.ticker}</a>
                      </Link>
                    </td>
                    <td className='px-4 py-2'>{marker.date}</td>
                    <td className='px-4 py-2'>{marker.memo}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {isDisplay && <p className='font-xl mt-3 mb-2 font-bold'>Comment一覧</p>}
      {canCommentsInput ? <span>登録可能です</span> : <span>登録制限に達しています</span>}

      {comments && (
        <div className='my-4 mx-auto w-1/2 shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  銘柄
                </th>
                <th scope='col' className='px-4 py-2'>
                  登録日
                </th>
                <th scope='col' className='px-4 py-2'>
                  Marker内容
                </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, i) => {
                return (
                  <tr
                    key={i}
                    className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                  >
                    <td className='px-4 py-2'>
                      <Link href={`/stocks/${comment.ticker}`}>
                        <a>{comment.ticker}</a>
                      </Link>
                    </td>
                    <td className='px-4 py-2'>{comment.date}</td>
                    <td className='px-4 py-2'>{comment.memo}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <h4>登録可能数について(無料登録ユーザー)</h4>
        <ul>
          <li>BookMark : {registerAllowance.BookMarkLimitFree}件まで</li>
          <li>Comment : {registerAllowance.CommentLimitFree}件まで</li>
          <li>Marker : {registerAllowance.MarkerLimitFree}件まで</li>
        </ul>
      </div>

    </div>
  )
}

export default Home
