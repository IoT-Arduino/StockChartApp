import React from 'react'

const SignUpComponent1 = ({registerAllowance}) => {
  return (
    <div className='mb-8'>
      <p>会員登録を行うことで、以下の機能をご利用いただけます</p>
      <ul>
        <li>チャートページ送り,「Pagination機能」が利用できる。</li>
        <li>
          チャート上に独自のマーカーを設定できる。（{registerAllowance.MarkerLimitFree}件まで）
        </li>
        <li>特定銘柄のメモ情報を登録できる（{registerAllowance.CommentLimitFree}件まで）</li>
        <li>特定銘柄ブックマーク設定ができる。（{registerAllowance.BookMarkLimitFree}件まで）</li>
      </ul>
    </div>
  )
}

export default SignUpComponent1
