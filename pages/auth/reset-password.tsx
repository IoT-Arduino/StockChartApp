import { NextPage } from 'next'
import { useState } from 'react'
import { supabase } from './../../utils/supabase'
import style from './auth.module.css'

// i18n
import en from './../../locales/en/en'
import ja from './../../locales/ja/ja'
import { useRouter } from 'next/router'

const ResetPassword: NextPage = () => {
  const [password, setPassword] = useState<string>('')
  const [isSend, setIsSend] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const handleSubmitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      // 新パスワードを引数に入力
      const { error } = await supabase.auth.update({ password: password })
      if (error) {
        setError(error)
        throw error
      }
      setIsSend(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
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
      <p>{t.authResetPwd4}</p>
      <form onSubmit={handleSubmitPassword} className={style.inputField}>
        <input
          value={password}
          type='password'
          onChange={handleSetPassword}
          placeholder='password'
          required
        />
        <button type='submit'>{t.authResetPwd5}</button>
      </form>
    </div>
  )
}

export default ResetPassword
