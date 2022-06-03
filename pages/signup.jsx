import { Button, IconKey, IconMail } from '@supabase/ui'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@supabase/ui'
import { supabase } from '../utils/supabase'
import { useRef } from 'react'
import Link from 'next/link'
const signup = () => {
  // type formData = {
  //   email: string,
  //   password: string,
  // };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const password = useRef({})
  password.current = watch('password', '')
  // const runSignup = async ({ email, password }: formData) => {
  const runSignup = async ({ email, password }) => {
    const res = await supabase.auth.signUp({
      email,
      password,
    })
  }
  return (
    <div className='center flex items-center justify-center my-20'>
      <div className='w-full bg-white  p-5 shadow sm:max-w-xl sm:rounded-lg'>
        <h2 className="text-xl">サインアップ（招待制）</h2>
        <form onSubmit={handleSubmit(runSignup)}>
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
                placeholder='メールアドレス'
              />
            )}
            rules={{
              required: '必須項目です。',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'メールアドレスが不適切です。',
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
                placeholder='パスワード(8文字以上)'
              />
            )}
            rules={{
              required: '必須項目です。',
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: 'パスワードは8文字以上です。',
              },
            }}
          />
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type='password'
                icon={<IconKey />}
                label='ConfirmPassword'
                error={errors.confirmPassword ? errors.confirmPassword.message : ''}
                placeholder='パスワード(確認用)'
              />
            )}
            rules={{
              required: '必須項目です。',
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: 'パスワードは8文字以上です。',
              },
              validate: (value) => value === password.current || 'パスワードが一致しません。',
            }}
          />
          <div className='h-4' />
          <Button block>送信</Button>
          <div className='h-4' />
          <Link href='/signin'>
            <a className=' font-bold hover:text-gray-500'>サインインはこちら</a>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default signup
