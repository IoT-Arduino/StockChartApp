import { supabase } from "../../utils/supabase"
import cookie from 'cookie'

export default async function handler(req, res) {

  const { user } = await supabase.auth.api.getUserByCookie(req)

  const token = cookie.parse(req.headers.cookie)['sb-access-token']

  supabase.auth.session = () => ({
    access_token: token,
  })

  const { data, error, status } = await supabase
    .from('profiles')
    .select('*')
    .single()


  if (!user) {
    return res.status(401).send('Unathorized')
  }


  return res.status(200).send({
    ...data,
  })
}
