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
      replace("/");
    }
  }, [user]);


  useEffect(() => {
    fetchBookmark()
    fetchComments()
  },[])


  async function fetchBookmark() {
    try {
      const { data, error } = await supabase
        .from('bookmark')
        .select()

      if (error) {
        throw error
      } else {
        console.log(data)
        setBookmark(data)
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

      if (error) {
        throw error
      } else {
        console.log(data)
        setComments(data)
      }
    } catch (error) {
      alert(error.message)
    } 
  }


  return (
    <div className="max-w-7xl p-10 m-auto">
      <p>BookMark</p>
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
      <p>Comments</p>
      {comments && comments.map((comments,i) => {
        return (
            <li key={i}>
                {comments.date}/{comments.ticker}/{comments.memo}
            </li>
        )
      })}

    </div>
  )
}