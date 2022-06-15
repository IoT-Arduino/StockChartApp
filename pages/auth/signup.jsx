import { Button, IconKey, IconMail } from '@supabase/ui'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@supabase/ui'
import { supabase } from '../../utils/supabase'
import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './auth.module.css'

import { registerAllowance } from '../../const/settings'

const signup = () => {
  // type formData = {
  //   email: string,
  //   password: string,
  // };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { replace } = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const password = useRef({})
  password.current = watch('password', '')
  // const runSignup = async ({ email, password }: formData) => {
  const runSignup = async ({ email, password }) => {
    console.log(email)
    console.log(password)
    const res = await supabase.auth.signUp({
      email,
      password,
    })
    alert('SignUp しました、メールボックスを確認してください')
    replace('/')
    reset()
  }

  return (
    <div className='center my-4 flex items-center justify-center'>
      <div className='w-full bg-white  p-5 shadow sm:max-w-xl sm:rounded-lg'>
        <div className='mb-8'>
          <p>会員登録を行うことで、以下の機能をご利用いただけます</p>
          <ul>
            <li>
              チャート上に独自のマーカーを設定できる。（{registerAllowance.MarkerLimitFree}件まで）
            </li>
            <li>特定銘柄のメモ情報を登録できる（{registerAllowance.CommentLimitFree}件まで）</li>
            <li>
              特定銘柄ブックマーク設定ができる。（{registerAllowance.BookMarkLimitFree}件まで）
            </li>
          </ul>
        </div>

        <h2 className='text-xl'>会員登録（無料）</h2>

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
                className='text-base'
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
                className='text-base'
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
        </form>

        <div className='mt-8 text-xs'>
          <h3>ユーザー登録にあたって（ご覧の上、ご登録ください）</h3>
          <ul>
            <li>ユーザー登録、および、ユーザー限定サービスは無料で利用できます。</li>
            <li>ユーザーはいつでも所定の手続きで登録を削除することができます。</li>
            <li>
              当サイトからユーザーに対し、サービスに関連する連絡等をメールで行うことがあります。
            </li>
            <li>当サイトは独自の判断で、事前の告知なしに登録を取り消す場合があります。</li>
            <li>ユーザー限定サービスは事前の告知なしに変更、または終了する場合があります。</li>
            <li>登録された情報は、当サイトのサービス提供以外の目的では使用されません。</li>
            <li>チャート画像のブログ等での引用は、引用元（TenQ.cc）等の記載をお願いします。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default signup
