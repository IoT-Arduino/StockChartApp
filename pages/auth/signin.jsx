import { Button, IconKey, IconMail } from '@supabase/ui'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@supabase/ui'
import { supabase } from '../../utils/supabase'
import Link from 'next/link'
import style from './auth.module.css'
import { useRouter } from 'next/router'

// i18n
import en from './../../locales/en/en'
import ja from './../../locales/ja/ja'

const signin = () => {
  // type formData = {
  //   email: string,
  //   password: string,
  //   };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { replace, locale } = useRouter()

  // i18n 対応用
  let t
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm()

  // const runSignin = async ({ email, password }: formData) => {
  const runSignin = async ({ email, password }) => {
    try {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      })
      replace('/member')
      reset()
      if (error) throw error
    } catch (error) {
      alert(error.message, `${t.signInErrorMsg}`)
      reset()
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center py-40'>
      <div className='w-full bg-white  p-5 shadow sm:max-w-xl sm:rounded-lg'>
        <form onSubmit={handleSubmit(runSignin)} className={style.inputField}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type='email'
                label='Email'
                icon={<IconMail />}
                error={errors.email ? errors.email.message : ''}
                placeholder='email'
              />
            )}
            rules={{
              required: `${t.signInRequired}`,
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: `${t.signInEmailAlert}`,
              },
            }}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type='password'
                icon={<IconKey />}
                label='Password'
                error={errors.password ? errors.password.message : ''}
                placeholder={t.signInPwdPlaceHolder}
              />
            )}
            rules={{
              required: `${t.signInRequired}`,
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: `${t.signInPwdAlert}`,
              },
            }}
          />
          <div className='h-4' />
          <Button block style={{ fontSize: '16px !important' }} data-testid="login-submit">
            {t.signInSubmit}
          </Button>
          <div className='h-4' />
          <Link href='/auth/signup'>
            <a className=' font-bold hover:text-gray-500'>{t.signInSignUpLink}</a>
          </Link>
          <br />
          <Link href='/auth/send-email'>
            <a className=' font-bold hover:text-gray-500'>{t.signInForgotPwdLink}</a>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default signin
