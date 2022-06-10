import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '../../utils/supabase'
import { UserContext } from '../../utils/UserContext'

import { useQueryComments } from '../../hooks/useQueryComments'
import { useQueryBookMark } from '../../hooks/useQueryBookMark'
import { useQueryMarker } from '../../hooks/useQueryMarker'

// types
import { Bookmark } from '../../types/Bookmark'
import { Comments } from '../../types/Comments'
import { NextPage } from 'next'

const Home: NextPage = () => {
  // const [bookmark, setBookmark] = useState<Bookmark[] | null>([])
  // const [comments, setComments] = useState<Comments[] | null>([])
  // const [markers, setMarkers] = useState<Comments[] | null>([])
  const [profile, setProfile] = useState<any>([])

  const [isDisplay, setIsDisplay] = useState<boolean>(false)

  const { user, session } = useContext(UserContext)
  const { replace } = useRouter()
  const { push, pathname } = useRouter()

  const { data: comments, status: statusComments } = useQueryComments()
  const { data : bookmarkData, status: statusBookMark } = useQueryBookMark()
  const { data: markers, status: statusMarker } = useQueryMarker()

  const bookmark = bookmarkData?.data
  const bookmarkLength = bookmarkData?.dataLength

  useEffect(() => {
    if (!user) {
      replace('/signin')
    } else {
      setIsDisplay(true)
      fetchProfile()
    }
  }, [user])


    async function fetchProfile() {
    if (user) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
        if (error) {
          throw error
        } else {
          console.log(profile[0].rank)
        }
      } catch (error: any) {
        alert(error.message)
      }
    }
  }

  // useEffect(() => {
  //   fetchBookmark()
  //   fetchComments()
  //   fetchMarkers()
  // }, [])

  // async function fetchBookmark() {
  //   if (user) {
  //     try {
  //       const { data: bookmark, error } = await supabase
  //         .from('bookmark')
  //         .select()
  //         .eq('user_id', user.id)
  //       if (error) {
  //         throw error
  //       } else {
  //         if (bookmark) {
  //           setBookmark(bookmark)
  //         }
  //       }
  //     } catch (error: any) {
  //       alert(error.message)
  //     }
  //   }
  // }

  // async function fetchComments() {
  //   if (user) {
  //     try {
  //       const { data, error } = await supabase.from('comments').select().eq('user_id', user.id)
  //       if (error) {
  //         throw error
  //       } else {
  //         // console.log(data)
  //         if (data) {
  //           setComments(data)
  //         }
  //       }
  //     } catch (error: any) {
  //       alert(error.message)
  //     }
  //   }
  // }

  // async function fetchMarkers() {
  //   if (user) {
  //     try {
  //       const { data, error } = await supabase.from('marker').select().eq('user_id', user.id)
  //       if (error) {
  //         throw error
  //       } else {
  //         // console.log(data)
  //         if (data) {
  //           setMarkers(data)
  //         }
  //       }
  //     } catch (error: any) {
  //       alert(error.message)
  //     }
  //   }
  // }

  // console.log(markers)

  // const fetchMarker = async () => {
  //   if (user) {
  //     let { data: items, error } = await supabase
  //       .from('marker')
  //       .select('*')
  //       .match({ ticker: id, user_id: user.id })
  //     if (error) console.log('error', error)
  //     else {
  //       const markerFetchedTemp = getMarkerData(items)
  //       setMarker(markerFetchedTemp)
  //     }
  //   }
  // }

  return (
    <div className='mx-auto max-w-4xl px-2 sm:px-4 py-4'>
      {isDisplay && <p className='font-xl mt-3 mb-2 font-bold'>BookMark一覧</p>}
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
      {markers &&
        markers.map((marker, i) => {
          return (
            <li key={i}>
              {marker.date}/{marker.ticker}-[markerの内容]:{marker.memo}
            </li>
          )
        })}

      {isDisplay && <p className='font-xl mt-3 mb-2 font-bold'>Comments一覧</p>}
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
