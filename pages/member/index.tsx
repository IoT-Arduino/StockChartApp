import Link from 'next/link'
import {useEffect,useState,useContext}from 'react'
import Auth from '../../components/auth'
import Dashboard from '../../components/dashboard'
// import { useUser } from '../../contexts/user'
import { supabase } from '../../utils/supabase'
import { useRouter } from 'next/router'

import { UserContext } from "../../util/UserContext";

import { Button } from "@supabase/ui";

export default function Home() {
  // const { user } = useUser()
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

  console.log(user)
  // console.log(pathname)

  // const validateSession = async () => {
  //   if (!user) {
  //     await push('/')
  //     console.log(user)
  //     console.log("not user")
  //    }
  //  }

  // useEffect(() => {
  //   validateSession()
  // },[])


  useEffect(() => {
    fetchBookmark()
    fetchComments()
  },[])


  // async function fetchBookmark() {
  //     const { data, error } = await supabase
  //       .from('bookmark')
  //       .select()

  //       console.log(data)
  //       setBookmark(data)
  // }

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

 // <!-- ☑の処理 -->
  // const Todo = ({ todo, onDelete }) => {
  //   const [isBookmarked, setBookmarked] = useState(todo.is_complete)

  //   const toggle = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('bookmark')
  //         .update({ is_complete: !isBookmarked })
  //         .eq('id', todo.id)
  //         .single()
  //       if (error) {
  //         throw new Error(error)
  //       }
  //       setBookmarked(data.is_complete)
  //     } catch (error) {
  //       console.log('error', error)
  //     }
  //   }
  // }

  // console.log(comments)



  // {!user ? <Auth /> : <Dashboard />}
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
                {/*  
                <input
                  className="cursor-pointer"
                  onChange={(e) => toggle()}
                  type="checkbox"
                  checked={isBookmarked ? true : ''}
                />
                */}
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

       <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <h2>ログイン中</h2>
        <Button
          block
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          サインアウト
        </Button>
      </div>

    </div>
  )
}