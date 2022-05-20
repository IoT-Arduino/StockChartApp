import Link from 'next/link'
import {useEffect,useState,useContext}from 'react'

import { supabase } from '../../utils/supabase'
import { useRouter } from 'next/router'

import { UserContext } from "../../utils/UserContext";

export default function Home() {
  const [bookmark,setBookmark]= useState([])
  const [comments, setComments] = useState([])

  const { user, session } = useContext(UserContext);
  const { replace } = useRouter();

  const {push,pathname} = useRouter()
  useEffect(() => {
    if (!user) {
      replace("/signin");
    }
  }, [user]);


  useEffect(() => {
    if (user) {
      fetchBookmark()
      fetchComments()
    }
  }, [])
  
  
  async function fetchBookmark() {
    try {
      const { data:bookmark, error } = await supabase
        .from('bookmark')
        .select()
        .eq('user_id', user.id)
      if (error) {
        throw error
      } else {
        // const filteredData = bookmark.filter(item => {
        //   return item.user_id == user.id
        // })
        setBookmark(bookmark)
      }
    } catch (error) {
      alert(error.message)
    } 
  }

    async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select()
        .eq('user_id', user.id)
      if (error) {
        throw error
      } else {
        // console.log(data)
        setComments(data)
      }
    } catch (error) {
      alert(error.message)
    } 
  }


  return (
    <div className="max-w-7xl p-10 m-auto">
      <p className="mt-3 mb-2 font-bold font-xl">BookMark一覧</p>
      {bookmark && bookmark.map((mark,i) => {
        return (
            <div key={i}>
              <li>
                <Link href={`/stocks/${mark.ticker}`}>
                  <a>
                    {mark.ticker}
                </a>
                </Link>
              </li>
            </div>
        )
      })}
      <p className="mt-3 mb-2 font-bold font-xl">Comments一覧</p>
      {comments && comments.map((comments,i) => {
        return (
            <li key={i}>
                {comments.date}/{comments.ticker}-[メモの内容]:{comments.memo}
            </li>
        )
      })}

    </div>
  )
}