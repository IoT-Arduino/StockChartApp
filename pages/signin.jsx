import { Button, IconKey, IconMail } from '@supabase/ui'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@supabase/ui'
import { supabase } from '../utils/supabase'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

const signin = () => {
  // type formData = {
  //   email: string,
  //   password: string,
  //   };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { replace } = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm()

  // const runSignin = async ({ email, password }: formData) => {
  const runSignin = async ({ email, password }) => {
    const res = await supabase.auth.signIn({
      email,
      password,
    })

    replace('/member')
    reset()
  }

  return (
    <div className='flex justify-center py-40'>
      <div className='w-full bg-white  p-5 shadow sm:max-w-xl sm:rounded-lg'>
        <form onSubmit={handleSubmit(runSignin)}>
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
          <div className='h-4' />
          <Button block>送信</Button>
          <div className='h-4' />
          <Link href='/signup'>
            <a className=' font-bold hover:text-gray-500'>サインアップはこちら(招待制)</a>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default signin
