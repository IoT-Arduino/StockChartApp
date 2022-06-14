import { useQueryClient, useMutation } from 'react-query'

import { supabase } from './../utils/supabase'

export const useMutateBookMark = () => {
  const queryClient = useQueryClient()

  const createBookMarkMutation = useMutation(
    async (bookmark) => {
      const { data, error } = await supabase.from('bookmark').insert(bookmark)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousBookMark = queryClient.getQueryData('bookmark')
        if (previousBookMark) {
          queryClient.setQueryData('bookmark', [...previousBookMark, res[0]])
        }
      },
      onError: (err) => {
        alert(err.message)
      },
    }
  )

  const deleteBookMarkMutation = useMutation(
    async (id) => {
      const { data, error } = await supabase.from('bookmark').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        console.log(variables)
        const previousBookMark = queryClient.getQueryData('bookmark')
        if (previousBookMark) {
          queryClient.setQueryData(
            'bookmark',
            previousBookMark.filter((bookmark) => bookmark.id !== variables)
          )
        }
      },
      onError: (err) => {
        alert(err.message)
      },
    }
  )
  return { deleteBookMarkMutation, createBookMarkMutation }
}
