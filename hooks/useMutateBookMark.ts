import { useQueryClient, useMutation, MutationFunction } from 'react-query'

import { supabase } from './../utils/supabase'

interface BookMark {
  id: string
  user_id: string
  ticker: string
  bookmark: boolean
  created_at: string
}

interface CreateBookMarkData {
  bookmark: boolean
  ticker: string
  user_id: string | null
}

interface DeleteBookMarkData {
  id: string
}

type CreateBookMarkMutationFn = MutationFunction<BookMark, CreateBookMarkData>
type DeleteBookMarkMutationFn = MutationFunction<BookMark, DeleteBookMarkData>

export const useMutateBookMark = () => {
  const queryClient = useQueryClient()

  const createBookMarkMutation = useMutation<
    BookMark,
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
        const previousBookMark = queryClient.getQueryData<BookMark[]>('bookmark')
        if (previousBookMark) {
          queryClient.setQueryData<BookMark[]>('bookmark', [...previousBookMark, res])
        }
      },
      onError: (err) => {
        alert(err.message)
      },
    }
  )

  const deleteBookMarkMutation = useMutation<
    BookMark,
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
        console.log(variables)
        const previousBookMark = queryClient.getQueryData<BookMark[]>('bookmark')
        if (previousBookMark) {
          queryClient.setQueryData<BookMark[]>(
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
