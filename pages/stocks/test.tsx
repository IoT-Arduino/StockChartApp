import React,{useEffect,useState} from 'react'
// Supabase
import { useUser } from '../../contexts/user'
import Auth from '../../components/auth'
import { supabase } from '../../utils/supabase'
import Comments from '../../components/Comments'
import BookMark from '../../components/BookMark'

import { getMarkerData } from '../../functions/GetMarkerData'

export async function getServerSideProps({ query }) {
    // データが取れない
    // const markerRows = await getMarkerData('AAPL')
    // console.log("server", markerRows)

    const {data:mark} = await supabase
      .from('marker')
      .select('*')

    return {
      props: {
       mark
      },
    };
}


const test = ({mark}) => {
  const [marker, setMarker] = useState([])

  useEffect(() => {
      fetchMarker()
  }, [])

  // <!-- supabaseに接続 -->
  const fetchMarker = async () => {
    let { data: items, error } = await supabase
      .from('marker')
      .select('*')

    if (error) console.log('error', error)
    else {
      console.log(items)
      setMarker(items)
    }
  }

      const { user } = useUser()
      
      const id = 'AAPL'
    // console.log(user)
    console.log(marker)
  return (
    <div>
          test
          {marker && marker.map(item => {
              return <p key={item.id}>{item.date}/{item.memo}</p>
          })}
          <BookMark user={supabase.auth.user()} ticker={id} />
    </div>
  )
}

export default test
