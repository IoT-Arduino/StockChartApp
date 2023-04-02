import { Button, IconKey, IconMail } from '@supabase/ui'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@supabase/ui'
import { supabase } from '../../utils/supabase'
import { useRef } from 'react'
// import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './auth.module.css'

import { registerAllowance } from '../../const/settings'

// i18n
import en from './../../locales/en/en'
import ja from './../../locales/ja/ja'
import SignUp1en from './../../locales/en/SignUpComponent1'
import SignUp2en from './../../locales/en/SignUpComponent2'
import SignUp1ja from './../../locales/ja/SignUpComponent1'
import SignUp2ja from './../../locales/ja/SignUpComponent2'

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

const signup = () => {


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { replace,locale } = useRouter()

    // i18n 対応用
    let t: typeof ja
    if (locale === 'ja-JP') {
      t = ja
    } else {
      t = en
    }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormData>()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const password = useRef<string>('')
  password.current = watch('password', '')
  // const runSignup = async ({ email, password }: formData) => {
  const runSignup = async ({ email, password }: FormData) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      alert(error.message)
    } else {
      alert(`${t.signUpAlertMsg}`)
      replace('/')
      reset()
    }
  }

  return (
    <div className='center my-4 flex items-center justify-center'>
      <div className='w-full bg-white  p-5 shadow sm:max-w-xl sm:rounded-lg'>
        {t == ja ? (
          <SignUp1ja registerAllowance={registerAllowance} />
        ) : (
          <SignUp1en registerAllowance={registerAllowance} />
        )}

        <h2 className='text-xl'>{t.signUpTitle}</h2>

        <form onSubmit={handleSubmit(runSignup)} className={style.inputField}>
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
                className='text-base'
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
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field: { onChange, onBlur } }) => (
              <Input
                className='text-base'
                onBlur={onBlur}
                onChange={onChange}
                type='password'
                icon={<IconKey />}
                label='ConfirmPassword'
                error={errors.confirmPassword ? errors.confirmPassword.message : ''}
                placeholder={t.signUpPwdConfirm}
              />
            )}
            rules={{
              required: `${t.signInRequired}`,
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: `${t.signInPwdAlert}`,
              },
              validate: (value) => value === password.current || `${t.signUpPwdNotMatch}`,
            }}
          />
          <div className='h-4' />
          <Button block>
            {t.signInSubmit}
          </Button>
          <div className='h-4' />
        </form>

        {t == ja ? <SignUp2ja /> : <SignUp2en />}
      </div>
    </div>
  )
}

export default signup
