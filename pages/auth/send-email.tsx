import { useState } from 'react'
import { NextPage } from 'next'
import { supabase } from './../../utils/supabase'
import style from './auth.module.css'

// i18n
import en from './../../locales/en/en'
import ja from './../../locales/ja/ja'
import { useRouter } from 'next/router'

const SendEmailToResetPassword: NextPage = () => {
  const [email, setEmail] = useState<string>('')
  const [isSend, setIsSend] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
        // 送信メールに埋め込まれるリンクのリダイレクト先のURL
        // reset-passwordへ遷移する
        redirectTo: `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/auth/reset-password`,
      })
      if (error) {
        setError(error)
        throw error
      }
      setIsSend(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  // i18n 対応用
  const router = useRouter()
  const { locale } = router ?? { locale: 'en-US' }

  let t
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

  if (error) {
    return <p>{t.authResetPwd1}</p>
  }

  if (isSend) {
    return <p>{t.authResetPwd2}</p>
  }

  return (
    <div>
      <p>{t.authResetPwd3}</p>
      <form onSubmit={handleSubmitEmail} className={style.inputField}>
        <input value={email} type='email' onChange={handleSetEmail} placeholder='email' required />
        <button type='submit'>{t.authResetPwd5}</button>
      </form>
    </div>
  )
}

export default SendEmailToResetPassword
