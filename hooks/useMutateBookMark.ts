import { useQueryClient, useMutation, MutationFunction } from 'react-query'
import { supabase } from './../utils/supabase'
import { Bookmark } from './../types/Bookmark'

type CreateBookMarkData = {
  bookmark: boolean
  ticker: string
  user_id: string | null
}

type DeleteBookMarkData = {
  id: string
}

type CreateBookMarkMutationFn = MutationFunction<Bookmark, CreateBookMarkData>
type DeleteBookMarkMutationFn = MutationFunction<Bookmark, DeleteBookMarkData>

export const useMutateBookMark = () => {
  const queryClient = useQueryClient()

  const createBookMarkMutation = useMutation<
    Bookmark,
    Error,
    CreateBookMarkData,
    CreateBookMarkMutationFn
  >(
    async (bookmark) => {
      const { data, error } = await supabase.from('bookmark').insert(bookmark)
      if (error) throw new Error(error.message)
      return data![0]
    },
    {
      onSuccess: (res) => {
        const previousBookMark = queryClient.getQueryData<Bookmark[]>('bookmark')
        if (previousBookMark) {
          queryClient.setQueryData<Bookmark[]>('bookmark', [...previousBookMark, res])
        }
      },
      onError: (err) => {
        alert(err.message)
      },
    }
  )

  const deleteBookMarkMutation = useMutation<
    Bookmark,
    Error,
    string,
    DeleteBookMarkMutationFn
  >(
    async (id) => {
      const { data, error } = await supabase.from('bookmark').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data![0]
    },
    {
      onSuccess: (_, variables) => {
        const previousBookMark = queryClient.getQueryData<Bookmark[]>('bookmark')
        if (previousBookMark) {
          queryClient.setQueryData<Bookmark[]>(
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
