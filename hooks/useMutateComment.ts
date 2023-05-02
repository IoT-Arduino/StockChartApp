import { useQueryClient, useMutation} from 'react-query'
import { useDispatch } from 'react-redux'
import { resetEditedMarker } from '../store/editInfoSlice'
import { supabase } from './../utils/supabase'
import { Comment } from './../types/StoreTypes'

export const useMutateComment = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const reset = () => dispatch(resetEditedMarker())
  
  const createCommentMutation = useMutation(
    async (comment: Partial<Comment>) => {
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
  const updateCommentMutation = useMutation(
    async (comment: Partial<Comment>) => {
      const { data, error } = await supabase
        .from<Comment>('comments')
        .update({ memo: comment.memo, date: comment.date })
        .eq('id', String(comment.id))
      if (error) throw new Error(error.message)
      return data![0]
    },
    {
      onSuccess: (res, variables) => {
        const previousComments = queryClient.getQueryData<Comment[]>('comments')
        if (previousComments) {
          queryClient.setQueryData(
            'comments',
            previousComments.map((comment) => (comment.id === variables.id ? res : comment))
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteCommentMutation = useMutation(
    async (id:string) => {
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
      onError: (err:any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { deleteCommentMutation, createCommentMutation, updateCommentMutation }
}