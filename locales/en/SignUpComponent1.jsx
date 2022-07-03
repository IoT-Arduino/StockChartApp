import React from 'react'

const SignUpComponent1 = ({registerAllowance}) => {
  return (
    <div className='mb-8'>
      <p>By registering as a member, you will have access to the following features.</p>
      <ul>
        <li>Chart page "Pagination function" is available.</li>
        <li>
        You can set your own markers on the chart.（up to {registerAllowance.MarkerLimitFree}）
        </li>
        <li>Can register memo information for specific stocks.（up to {registerAllowance.CommentLimitFree}）</li>
        <li>Bookmark can be set for specific Stock.（up to {registerAllowance.BookMarkLimitFree}）</li>
      </ul>
    </div>
  )
}

export default SignUpComponent1
