export type Marker = {
  created_at: string
  date: string
  id: string | null
  memo: string
  ticker: string
  user_id: string
}

export type Comment = {
  created_at: string
  date: string
  id: string | null
  memo: string
  ticker: string
  user_id: string
}

export type EditedMarker = Omit<Marker, 'created_at' | 'user_id'>
export type EditedComment = Omit<Comment, 'created_at' | 'user_id'>
