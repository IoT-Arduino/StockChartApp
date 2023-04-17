import { useQuery } from 'react-query'
import { supabase } from './../utils/supabase';

import { Marker } from './../types/Marker'


export const useQueryMarker = () => {
  const getMarker = async () => {
    const { data, error } = await supabase
      .from<Marker>('marker')
      .select('*')
      .order('ticker', { ascending: false })
      .order('date', { ascending: false })
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  // useQuery<Task[], Error>
  return useQuery({
    queryKey: 'marker',
    queryFn: getMarker,
    staleTime: Infinity, //[ms]
    refetchOnWindowFocus: true,
    // refetchOnMount:"always",
    // notifyOnChangeProps:"tracked",
    // refetchOnReconnect:"always",
    // refetchInterval:10,
  })
}