import { Session, User } from '@supabase/supabase-js'
import { createContext } from 'react'
import { Ranks } from '../types/Ranks'

type value = {
  user: User | null
  session: Session | null
  rank: Ranks
}
export const UserContext = createContext<value>({ user: null, session: null, rank: 'free' })
