import { useQueryClient, useMutation } from 'react-query'
import useStore from './../store/store'

import { supabase } from './../utils/supabase'

export const useMutateMarker = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedMarker)

  // const user = supabase.auth.user()

  const createMarkerMutation = useMutation(
    async (marker) => {
      const { data, error } = await supabase.from('marker').insert(marker)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousMarkers = queryClient.getQueryData('marker')
        if (previousMarkers) {
          queryClient.setQueryData('marker', [...previousMarkers, res[0]])
        }
        reset()
      },
      onError: (err) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateMarkerMutation = useMutation(
    async (marker) => {
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
        const previousMarkers = queryClient.getQueryData('marker')
        if (previousMarkers) {
          queryClient.setQueryData(
            'marker',
            previousMarkers.map((marker) =>
              marker.id === variables.id ? res[0] : marker
            )
          )
        }
        reset()
      },
      onError: (err) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteMarkerMutation = useMutation(
    async (id) => {
      const { data, error } = await supabase.from('marker').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousMarkers = queryClient.getQueryData('marker')
        if (previousMarkers) {
          queryClient.setQueryData(
            'marker',
            previousMarkers.filter((marker) => marker.id !== variables)
          )
        }
        reset()
      },
      onError: (err) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { deleteMarkerMutation, createMarkerMutation, updateMarkerMutation }
}