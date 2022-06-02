import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'

import { supabase } from '../../utils/supabase'
import { useRouter } from 'next/router'

import { UserContext } from '../../utils/UserContext'

// types
import { Bookmark } from '../../types/Bookmark'
import { Comments } from '../../types/Comments'
import { NextPage } from 'next'

const Home:NextPage = () => {
  const [bookmark, setBookmark] = useState<Bookmark[] | null>([])
  const [comments, setComments] = useState<Comments[] | null>([])
  const [markers, setMarkers] = useState<Comments[] | null>([])

  const { user, session } = useContext(UserContext)
  const { replace } = useRouter()

  const { push, pathname } = useRouter()
  useEffect(() => {
    if (!user) {
      replace('/signin')
    }
  }, [user])

  useEffect(() => {
    fetchBookmark()
    fetchComments()
    fetchMarkers()
  }, [])

  async function fetchBookmark() {
    if (user) {
      try {
        const { data: bookmark, error } = await supabase
          .from('bookmark')
          .select()
          .eq('user_id', user.id)
        if (error) {
          throw error
        } else {
          if (bookmark) {
            setBookmark(bookmark)
          }
        }
      } catch (error: any) {
        alert(error.message)
      }
    }
  }

  async function fetchComments() {
    if (user) {
      try {
        const { data, error } = await supabase.from('comments').select().eq('user_id', user.id)
        if (error) {
          throw error
        } else {
          // console.log(data)
          if(data){
            setComments(data)
          }
        }
      } catch (error:any) {
        alert(error.message)
      }
    }
  }

  async function fetchMarkers() {
    if (user) {
      try {
        const { data, error } = await supabase.from('marker').select().eq('user_id', user.id)
        if (error) {
          throw error
        } else {
          // console.log(data)
          if(data){
            setMarkers(data)
          }
        }
      } catch (error:any) {
        alert(error.message)
      }
    }
  }

  console.log(markers)


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
    <div className='m-auto max-w-7xl p-10'>
      <p className='font-xl mt-3 mb-2 font-bold'>BookMark一覧</p>
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

      <p className='font-xl mt-3 mb-2 font-bold'>Marker一覧</p>
      {markers &&
        markers.map((marker, i) => {
          return (
            <li key={i}>
              {marker.date}/{marker.ticker}-[markerの内容]:{marker.memo}
            </li>
          )
        })}

      <p className='font-xl mt-3 mb-2 font-bold'>Comments一覧</p>
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