import { Ranks } from './Ranks'
export type Profile = {
  id: string
  user_id: string
  name?: string
  updated_at: string
  rank:Ranks
}
