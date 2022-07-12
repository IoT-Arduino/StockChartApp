import { useQuery } from 'react-query'
import { supabase } from './../utils/supabase';


export const useQueryProfile = () => {
  const getProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  return useQuery({
    queryKey: 'profile',
    queryFn: getProfile,
    staleTime: Infinity, //[ms]
    refetchOnWindowFocus: true,
  })
}