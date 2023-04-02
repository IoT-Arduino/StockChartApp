import { useQueryClient, useMutation} from 'react-query'
import useStore from './../store/store'

import { supabase } from './../utils/supabase'

type Comment = {
  id: number
  memo: string
  date: Date
}

export const useMutateComment = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedComment)

  // const user = supabase.auth.user()

  const createCommentMutation = useMutation(
    async (comment: Partial<Comment>[] | Partial<Comment>) => {
      const { data, error } = await supabase.from<Comment>('comments').insert(comment)
      if (error) throw new Error(error.message)
      return data![0]
    },
    {
      onSuccess: (res) => {
        const previousComments = queryClient.getQueryData<Comment[]>('comments')
        if (previousComments) {
          queryClient.setQueryData('comments', [...previousComments, res])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateCommentMutation = useMutation<Comment, Error, Comment>(
    async (comment) => {
      const { data, error } = await supabase
        .from<Comment>('comments')
        .update({ memo: comment.memo, date: comment.date })
        .eq('id', comment.id)
      if (error) throw new Error(error.message)
      return data![0]
    },
    {
      onSuccess: (res, variables) => {
        const previousComments = queryClient.getQueryData<Comment[]>('comments')
        if (previousComments) {
          queryClient.setQueryData(
            'comments',
            previousComments.map((comment) => (comment.id === variables.id ? res: comment))
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
  const deleteCommentMutation = useMutation<unknown, Error, number>(
    async (id) => {
      const { data, error } = await supabase.from('comments').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousComments = queryClient.getQueryData<Comment[]>('comments')
        if (previousComments) {
          queryClient.setQueryData(
            'comments',
            previousComments.filter((comment) => comment.id !== variables)
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
  return { deleteCommentMutation, createCommentMutation, updateCommentMutation }
}