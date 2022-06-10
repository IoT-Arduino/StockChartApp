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
  }, [user,profile])

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
      {markers &&
        markers.map((marker, i) => {
          return (
            <li key={i}>
              {marker.date}/{marker.ticker}-[markerの内容]:{marker.memo}
            </li>
          )
        })}

      {isDisplay && <p className='font-xl mt-3 mb-2 font-bold'>Comments一覧</p>}
      {canCommentsInput ? <span>登録可能です</span> : <span>登録制限に達しています</span>}
      {comments &&
        comments.map((comments, i) => {
          return (
            <li key={i}>
              {comments.date}/{comments.ticker}-[メモの内容]:{comments.memo}
            </li>
          )
        })}
    </div>
  )
}

export default Home
