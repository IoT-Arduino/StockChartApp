import { useQuery } from 'react-query'
import { supabase } from './../utils/supabase';

import { MarkerLimitFree } from './../const/settings';
import { MarkerLimitPro } from './../const/settings';
import { MarkerLimitBusiness } from './../const/settings';


export const useQueryBookMark = () => {
  const getBookMark = async () => {
    const { data, error } = await supabase
      .from('bookmark')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    console.log(data.length > MarkerLimitFree)

    const dataLength = data.length

    return {data,dataLength}
  }
  return useQuery({
    queryKey: 'bookmark',
    queryFn: getBookMark,
    staleTime: 0, //[ms]
    refetchOnWindowFocus: true,
  })
}