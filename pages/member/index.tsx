import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import axios from 'axios'

import { supabase } from '../../utils/supabase'


// Mantine
import { ActionIcon } from '@mantine/core'
// Icons
import * as AiIcons from 'react-icons/ai'

import { UserContext } from '../../utils/UserContext'
import { useQueryComments } from '../../hooks/useQueryComments'
import { useQueryBookMark } from '../../hooks/useQueryBookMark'
import { useQueryMarker } from '../../hooks/useQueryMarker'
import { useMutateComment } from '../../hooks/useMutateComment'
import { useMutateMarker } from '../../hooks/useMutateMarker'

// Redux Related
import { useDispatch } from 'react-redux'
// import { RootState } from '../../store/rootReducer'
// import { updateEditedComment, resetEditedComment } from '../../store/editInfoSlice'


// 登録数制限
import { checkAllowanceComment } from '../../functions/checkAllowanceComment'
import { checkAllowanceMarker } from '../../functions/checkAllowanceMarker'
import { checkAllowanceBookMark } from '../../functions/checkAllowanceBookMark'

import RegisterLimit from '../../components/RegisterLimit'

// i18n
import en from '../../locales/en/en'
import ja from '../../locales/ja/ja'

// Types
import { TranslationLocales } from '../../types/TranslationLocales'
import { Comment } from '../../types/StoreTypes'
import { Marker } from '../../types/StoreTypes'

const Home: NextPage = () => {
  const router = useRouter()

  const { user, session, rank } = useContext(UserContext)
  const { replace } = useRouter()
  const { push, pathname } = useRouter()

  const { deleteCommentMutation } = useMutateComment()
  const { deleteMarkerMutation } = useMutateMarker()

  const [isDisplay, setIsDisplay] = useState<boolean>(false)

  const { data: comments, status: statusComments } = useQueryComments()
  const { data: bookmark, status: statusBookMark } = useQueryBookMark()
  const { data: markers, status: statusMarker } = useQueryMarker()

  const { canCommentInput } = checkAllowanceComment(rank, comments)
  const { canBookMarkInput } = checkAllowanceBookMark(rank, bookmark)
  const { canMarkerInput } = checkAllowanceMarker(rank, markers)

  useEffect(() => {
    if (!user) {
      replace('/auth/signin')
    } else {
      setIsDisplay(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // i18n 対応用
  const { locale } = router ?? { locale: 'en-US' }

  let t: TranslationLocales
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

  const deleteUser = async () => {
    let confirmDelete = confirm(`${t.memberShipDeleteAlert1}`)
    if (confirmDelete) {
      const { data, error }: { data: any; error: any } = await axios.get('/api/deleteUser')
      if (error) {
        console.log(error.message)
        alert(error.message)
        supabase.auth.signOut()
        router.replace('/auth/signup')
      } else {
        supabase.auth.signOut()
        alert(`${t.memberShipDeleteAlert2}`)
        router.replace('/')
      }
    }
  }

    const deleteComment = (comment: Partial<Comment>) => {
    let confirmDelete = confirm(
      `${comment.ticker} : ${comment.date} : ${comment.memo} : ${t.inputDeleteAlert}`
    )
    if (confirmDelete) {
      deleteCommentMutation.mutate(comment.id!)
    } else {
      return
    }
  }

  const deleteMarker = (marker: Partial<Marker>) => {
    let confirmDelete = confirm(`${marker.ticker} : ${marker.date} : ${marker.memo}: ${t.inputDeleteAlert}`)
    if (confirmDelete) {
      deleteMarkerMutation.mutate(marker.id!)
    } else {
      return
    }
  }

  return (
    <div>
      {user ? (
        <div className='mx-auto max-w-2xl px-2 py-4 sm:px-4'>
          {isDisplay ? (
            <p className='font-xl mb-8 mt-3 text-center font-bold' data-testid='memberEmail'>
              {user.email}
              {t.memberUserTop}
            </p>
          ) : null}
          {rank ? (
            <p>
              {t.memberShipRankLabel}
              {rank}
            </p>
          ) : null}

          {isDisplay ? (
            <p className='font-xl mb-2 mt-8 font-bold'>{t.memberShipSecTitle1}</p>
          ) : null}
          {canBookMarkInput ? (
            <span data-testid='canBookMarkInput'>{t.memberShipCanInput}</span>
          ) : (
            <span data-testid='canBookMarkInput'>{t.memberShipCanNotInput}</span>
          )}

          {bookmark && (
            <table className='mx-auto my-4 w-full shadow-md sm:w-2/3 sm:rounded-lg'>
              <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-4 py-2'>
                    Ticker
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookmark.map((mark, i) => {
                  return (
                    <tr
                      key={mark.ticker}
                      className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                    >
                      <td className='px-4 py-2 text-center'>
                        <Link href={`/stocks/${mark.ticker}`}>
                          <a>{mark.ticker}</a>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

          {isDisplay && <p className='font-xl mb-2 mt-8 font-bold'>{t.memberShipSecTitle2}</p>}
          {canMarkerInput ? (
            <span data-testid='canMarkerInput'>{t.memberShipCanInput}</span>
          ) : (
            <span data-testid='canMarkerInput'>{t.memberShipCanNotInput}</span>
          )}
          {markers && (
            <div className='mx-auto my-4 w-full shadow-md sm:w-2/3 sm:rounded-lg'>
              <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
                <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-2'>
                      {t.memberShipTableTicker}
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      {t.memberShipTableDate}
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      {t.memberShipTableMemo}
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      {''}
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
                        <td className='px-4 py-2'>{marker.date.substring(0, 7)}</td>
                        <td className='px-4 py-2'>{marker.memo}</td>
                        <td>
                          <ActionIcon
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              deleteMarker(marker)
                            }}
                            data-testid='markerDelete'
                            className='ml-1 p-1'
                          >
                            <AiIcons.AiFillDelete />
                          </ActionIcon>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {isDisplay ? (
            <p className='font-xl mb-2 mt-8 font-bold'>{t.memberShipSecTitle3}</p>
          ) : null}
          {canCommentInput ? (
            <span data-testid='canCommentInput'>{t.memberShipCanInput}</span>
          ) : (
            <span data-testid='canCommentInput'>{t.memberShipCanNotInput}</span>
          )}

          {comments && (
            <div className='mx-auto my-4 w-full shadow-md sm:w-2/3 sm:rounded-lg'>
              <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
                <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-2'>
                      {t.memberShipTableTicker}
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      {t.memberShipTableDate}
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      {t.memberShipTableMemo}
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      {''}
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
                        <td>
                          <ActionIcon
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              deleteComment(comment)
                            }}
                            data-testid='commentDelete'
                            className='ml-1 p-1'
                          >
                            <AiIcons.AiFillDelete />
                          </ActionIcon>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          <RegisterLimit rank={rank} t={t} />
          <div className='my-16 border-2 bg-slate-100 px-4 py-1 text-sm'>
            <h5>{t.memberShipUnsub}</h5>
            <span>{t.memberShipUnsubWarning}</span>
            <button className='mb-4 ml-4 text-xs' onClick={deleteUser}>
              {t.memberShipUnsubButton}
            </button>
          </div>
        </div>
      ) : (
        <div>Member's only page</div>
      )}
    </div>
  )
}

export default Home
