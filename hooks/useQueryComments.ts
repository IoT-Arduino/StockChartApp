import { useQuery } from 'react-query'
import { supabase } from './../utils/supabase';


export const useQueryComments = () => {
  const getComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('ticker', { ascending: false })
      .order('date', { ascending: false })
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  return useQuery({
    queryKey: 'comments',
    queryFn: getComments,
    staleTime: Infinity, //[ms]
    refetchOnWindowFocus: true,
  })
}