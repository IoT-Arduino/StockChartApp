import { useQueryClient, useMutation } from 'react-query'
import useStore from './../store/store'

import { supabase } from './../utils/supabase'

export const useMutateComment = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedComment)

  // const user = supabase.auth.user()

  const createCommentMutation = useMutation(
    async (comment) => {
      const { data, error } = await supabase.from('comments').insert(comment)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousComments = queryClient.getQueryData('comments')
        if (previousComments) {
          queryClient.setQueryData('comments', [...previousComments, res[0]])
        }
        reset()
      },
      onError: (err) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateCommentMutation = useMutation(
    async (comment) => {
      console.log(comment)
      const { data, error } = await supabase
        .from('comments')
        .update({ memo: comment.memo,date:comment.date })
        .eq('id', comment.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousComments = queryClient.getQueryData('comments')
        if (previousComments) {
          queryClient.setQueryData(
            'comments',
            previousComments.map((comment) =>
              comment.id === variables.id ? res[0] : comment
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
  const deleteCommentMutation = useMutation(
    async (id) => {
      const { data, error } = await supabase.from('comments').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousComments = queryClient.getQueryData('comments')
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