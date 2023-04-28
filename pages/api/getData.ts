import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabase'
import cookie from 'cookie'

type Session = {
  access_token: string
  token_type: string
  user: any 
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  const token = cookie.parse(req.headers.cookie ?? '')['sb-access-token']

  supabase.auth.session = (): Session => ({
    access_token: token,
    token_type: 'Bearer',
    user: user,
  })

  const { data, error, status } = await supabase.from('profiles').select('*').single()

  if (!user) {
    return res.status(401).send('Unathorized')
  }

  return res.status(200).send({
    ...data,
  })
}
