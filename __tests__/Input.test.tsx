import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import 'matchmedia-polyfill'
import InputCommentsState from './../components/InputCommentsState'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

import fetchMock from 'jest-fetch-mock'
import { rest } from 'msw'
import { server } from '../__mocks__/mocks'

import { expect } from '@jest/globals';

// const server = setupServer(
//   rest.post('/api/add-comment', (req: any, res: any, ctx: any) => {
//     return res(ctx.json({ success: true }))
//   })
// )

/* eslint-disable react/display-name */
// import { ReactNode } from 'react'

// jest.mock('next/link', () => {
//   return ({ children, href }: { children: ReactNode; href: string }) => {
//     return (
//       <span role='link' data-testid='mocked-link' style={{ cursor: 'pointer' }}>
//         {children}
//       </span>
//     )
//   }
// })

jest.mock('next/router', () => require('next-router-mock'))

describe('Input Test', () => {
  // setup fetch mock
  fetchMock.enableMocks()
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  // test case
  test.only('POST /api/login', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <InputCommentsState ticker='AAPL' t='ja' />
      </QueryClientProvider>
    )
    const response = await fetch('https://lyqutonanjrerjbqloxc.supabase.co/rest/v1/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
        created_at: '2023-04-09T02:57:18.850976',
        user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
        ticker: 'AAPL',
        date: '2023-04-06',
        memo: 'Test memo22',
      }),
    })
    const data = await response.json()
    expect(data).toEqual({
      id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
      created_at: '2023-04-09T02:57:18.850976',
      user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
      ticker: 'AAPL',
      date: '2023-04-06',
      memo: 'Test memo22',
    })

    //  const listItems = screen.getAllByRole('listitem')
    const commentDateInput = screen.getByTestId('commentDateInput')
    const commentMemoInput = screen.getByTestId('commentMemoInput')
    //  const editButton = screen.getByTestId('editComment')
    // const addCommentButton = screen.getByRole('button', { name: /Save/i})
    const addCommentButton = screen.getByTestId('addComment')

    // 日付入力フィールドに値を入力します
    const dateValue = '2023-04-09'
    fireEvent.change(commentDateInput, { target: { value: dateValue } })

    // メモ入力フィールドに値を入力します
    const memoValue = 'Test memo3'
    fireEvent.change(commentMemoInput, { target: { value: memoValue } })

    fireEvent.click(addCommentButton)
  })

  it('InputTest', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <InputCommentsState ticker='AAPL' t='ja' />
      </QueryClientProvider>
    )

    //  const listItems = screen.getAllByRole('listitem')
    const commentDateInput = screen.getByTestId('commentDateInput')
    const commentMemoInput = screen.getByTestId('commentMemoInput')
    //  const editButton = screen.getByTestId('editComment')
    // const addCommentButton = screen.getByRole('button', { name: /Save/i})
    const addCommentButton = screen.getByTestId('addComment')

    // 日付入力フィールドに値を入力します
    const dateValue = '2023-04-09'
    fireEvent.change(commentDateInput, { target: { value: dateValue } })

    // メモ入力フィールドに値を入力します
    const memoValue = 'Test memo3'
    fireEvent.change(commentMemoInput, { target: { value: memoValue } })

    fireEvent.click(addCommentButton)

    const addedComment = await screen.findByTestId('commentMemo')
    // You might need to wrap this with waitFor if the update is asynchronous
    // Use waitFor when the update is asynchronous
    // await waitFor(() => addedComment =  screen.getByTestId('commentMemo'))

    // const addedComment = screen.getByText(memoValue)
    console.log(addedComment.textContent)
    expect(addedComment.textContent).toEqual(memoValue)

    screen.debug()
  })

  it.skip('Input', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <InputCommentsState ticker='AAPL' t='ja' />
      </QueryClientProvider>
    )
    // 日付入力フィールドとメモ入力フィールドを取得します
    const commentDateInput = screen.getByTestId('commentDateInput')
    const commentMemoInput = screen.getByTestId('commentMemoInput')
    const addButton = screen.getByTestId('addComment')

    const listItems = screen.getAllByRole('listitem')

    // 日付入力フィールドに値を入力します
    const dateValue = '2023-04-09'
    fireEvent.change(commentDateInput, { target: { value: dateValue } })

    // メモ入力フィールドに値を入力します
    const memoValue = 'Test memo'
    userEvent.type(commentMemoInput, memoValue)

    // 入力が完了するのを待ちます
    // await waitFor(() => {
    //   if (commentMemoInput.value === memoValue) {
    //     return true
    //   }
    // })

    // userEvent.click(saveButton)
    // confirm memo data is displayed

    console.log(memoValue)
    console.log(commentMemoInput.value)

    console.log(listItems)

    // 入力した値が正しく表示されていることを確認します
    expect(commentDateInput).toHaveValue('April 9, 2023')
    // expect(commentMemoInput).toHaveValue(memoValue)

    screen.debug()
  })
})
