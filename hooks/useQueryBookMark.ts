import { useQuery } from 'react-query'
import { supabase } from './../utils/supabase';

export const useQueryBookMark = () => {
  const getBookMark = async () => {
    const { data, error } = await supabase
      .from('bookmark')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  return useQuery({
    queryKey: 'bookmark',
    queryFn: getBookMark,
    staleTime: Infinity, //[ms]
    refetchOnWindowFocus: true,
  })
}