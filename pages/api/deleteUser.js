import { supabase } from '../../utils/supabase'
import { createClient } from '@supabase/supabase-js'

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  const { data: deletedUser, error } = await supabaseServer.auth.api.deleteUser(user.id)


  return res.status(200).send(deletedUser)
}
