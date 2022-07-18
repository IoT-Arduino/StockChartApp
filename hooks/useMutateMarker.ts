import { useQueryClient, useMutation } from 'react-query'
import useStore from '../store/store'

import { supabase } from '../utils/supabase'

// types
import { EditedMarker, Marker } from '../types/StoreTypes'


export const useMutateMarker = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedMarker)

  const createMarkerMutation = useMutation(

    async (marker:Omit<Marker, 'user_id' | 'created_at'>) => {
      const { data, error } = await supabase.from('marker').insert(marker)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousMarkers = queryClient.getQueryData<Omit<Marker, 'user_id' | 'created_at'>[]>('marker')
        if (previousMarkers) {
          queryClient.setQueryData('marker', [...previousMarkers, res[0]])
        }
        reset()
      },
      onError: (err:any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateMarkerMutation = useMutation(
    async (marker: EditedMarker) => {
      console.log(marker)
      const { data, error } = await supabase
        .from('marker')
        .update({ memo: marker.memo,date:marker.date })
        .eq('id', marker.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousMarkers = queryClient.getQueryData<Omit<Marker, 'user_id' | 'created_at'>[]>('marker')
        if (previousMarkers) {
          queryClient.setQueryData<Omit<Marker, 'user_id' | 'created_at'>[]>(
            'marker',
            previousMarkers.map((marker) =>
              marker.id === variables.id ? res[0] : marker
            )
          )
        }
        reset()
      },
      onError: (err:any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteMarkerMutation = useMutation(
    async (id:number) => {
      const { data, error } = await supabase.from('marker').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        // for TypeScript : 
        const previousMarkers = queryClient.getQueryData<Omit<Marker, 'user_id' | 'created_at'>[]>('marker')
        if (previousMarkers) {
          queryClient.setQueryData(
            'marker',
            previousMarkers.filter((marker) => marker.id !== variables)
          )
        }
        reset()
      },
      onError: (err:any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { deleteMarkerMutation, createMarkerMutation, updateMarkerMutation }
}