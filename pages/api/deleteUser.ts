import { supabase } from '../../utils/supabase'
import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SERVICE_ROLE_KEY as string
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (user) {
    const { data: deletedUser, error } = await supabaseServer.auth.api.deleteUser(user.id)

    if (error) {
      console.log(error.message)
      return res.status(401).send(error)
    }

    return res.status(200).send(deletedUser)
  }
}
