import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'

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
import { checkAllowanceComment } from '../../functions/checkAllowanceComment'
import { checkAllowanceMarker } from '../../functions/checkAllowanceMarker'
import { checkAllowanceBookMark } from '../../functions/checkAllowanceBookMark'

import RegisterLimit from '../../components/RegisterLimit'

// i18n
import en from '../../locales/en/en'
import ja from '../../locales/ja/ja'

const Home: NextPage = () => {
  const router = useRouter()

  const { user, session, rank } = useContext(UserContext)
  const { replace } = useRouter()
  const { push, pathname } = useRouter()

  const [isDisplay, setIsDisplay] = useState<boolean>(false)

  // const [canMarkerInput, setCanMarkerInput] = useState<boolean>(false)
  // const [canBookMarkInput, setCanBookMarkInput] = useState<boolean>(false)
  // const [canCommentsInput, setCanCommentsInput] = useState<boolean>(false)

  const { data: comments, status: statusComments } = useQueryComments()
  const { data: bookmark, status: statusBookMark } = useQueryBookMark()
  const { data: markers, status: statusMarker } = useQueryMarker()
  // const { data: profile, status: statusProfile } = useQueryProfile()

  const { canCommentInput } = checkAllowanceComment(rank, comments)
  const { canBookMarkInput } = checkAllowanceBookMark(rank, bookmark)
  const { canMarkerInput } = checkAllowanceMarker(rank, markers)

  useEffect(() => {
    if (!user) {
      replace('/auth/signin')
    } else {
      setIsDisplay(true)
      // if (profile?.length) {
      //   checkAllowance(profile[0].rank)
      // }
      // getDataFromAPI()
    }
  }, [user])

  // const getDataFromAPI = async() =>{
  //   const {data} = await axios.get('/api/getData')
  //   console.log("c",data)
  // }

    // i18n 対応用
    const { locale } = router
    let t;
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

  return (
    <div className='mx-auto max-w-2xl px-2 py-4 sm:px-4'>
      {user && isDisplay ? (
        <p className='font-xl mt-3 mb-8 text-center font-bold'>{user.email}　{t.memberUserTop}</p>
      ) : null}
      {user && rank ? <p>{t.memberShipRankLabel}{rank}</p> : null}
      {isDisplay && <p className='font-xl mt-8 mb-2 font-bold'>{t.memberShipSecTitle1}</p>}
      {canBookMarkInput ? <span>{t.memberShipCanInput}</span> : <span>{t.memberShipCanNotInput}</span>}
      {bookmark &&
        bookmark.map((mark, i) => {
          return (
            <div key={i} className='ml-8'>
              <li>
                <Link href={`/stocks/${mark.ticker}`}>
                  <a>{mark.ticker}</a>
                </Link>
              </li>
            </div>
          )
        })}

      {isDisplay && <p className='font-xl mt-8 mb-2 font-bold'>{t.memberShipSecTitle2}</p>}
      {canMarkerInput ? <span>{t.memberShipCanInput}</span> : <span>{t.memberShipCanNotInput}</span>}
      {markers && (
        <div className='my-4 mx-auto w-full shadow-md sm:w-2/3 sm:rounded-lg'>
          <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
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

      {isDisplay && <p className='font-xl mt-8 mb-2 font-bold'>{t.memberShipSecTitle3}</p>}
      {canCommentInput ? <span>{t.memberShipCanInput}</span> : <span>{t.memberShipCanNotInput}</span>}

      {comments && (
        <div className='my-4 mx-auto w-full shadow-md sm:w-2/3 sm:rounded-lg'>
          <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
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

      <RegisterLimit rank={rank} t={t}/>
      <div className='my-16 border-2 bg-slate-100 px-4 py-1 text-sm'>
        <h5>{t.memberShipUnsub}</h5>
        <span>{t.memberShipUnsubWarning}</span>
        <button className='mb-4 ml-4 text-xs' onClick={deleteUser}>
          {t.memberShipUnsubButton}
        </button>
      </div>
    </div>
  )
}

export default Home
