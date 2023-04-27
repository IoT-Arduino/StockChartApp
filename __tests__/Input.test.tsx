import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// import 'matchmedia-polyfill'

import InputCommentsState from './../components/InputCommentsState'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

import en from './../locales/en/en'
import ja from './../locales/ja/ja'

import fetchMock from 'jest-fetch-mock'
import { rest } from 'msw'
import { server } from '../__mocks__/mocks'

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
  // test('POST comment', async () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <InputCommentsState ticker='AAPL' t='ja' />
  //     </QueryClientProvider>
  //   )
  //   const response = await fetch('https://lyqutonanjrerjbqloxc.supabase.co/rest/v1/comments', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
  //       created_at: '2023-04-09T02:57:18.850976',
  //       user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
  //       ticker: 'AAPL',
  //       date: '2023-04-06',
  //       memo: 'Test memo22',
  //     }),
  //   })
  //   const data = await response.json()
  //   expect(data).toEqual({
  //     id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
  //     created_at: '2023-04-09T02:57:18.850976',
  //     user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
  //     ticker: 'AAPL',
  //     date: '2023-04-06',
  //     memo: 'Test memo22',
  //   })

  //   //  const listItems = screen.getAllByRole('listitem')
  //   const commentDateInput = screen.getByTestId('commentDateInput')
  //   const commentMemoInput = screen.getByTestId('commentMemoInput')
  //   //  const editButton = screen.getByTestId('editComment')
  //   // const addCommentButton = screen.getByRole('button', { name: /Save/i})
  //   const addCommentButton = screen.getByTestId('addComment')

  //   // 日付入力フィールドに値を入力します
  //   const dateValue = '2023-04-06'
  //   fireEvent.change(commentDateInput, { target: { value: dateValue } })

  //   // メモ入力フィールドに値を入力します
  //   const memoValue = 'Test memo22'
  //   fireEvent.change(commentMemoInput, { target: { value: memoValue } })

  //   fireEvent.click(addCommentButton)

  //   const commentList = await screen.findByRole('list')

  //   expect(commentList.textContent).toEqual(dateValue + memoValue)

  // })

  it('InputTest', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <InputCommentsState ticker='AAPL' t={ja} />
      </QueryClientProvider>
    )

    const commentDateInput = container.querySelector('.react-datepicker__input-container input')
    const commentMemoInput = screen.getByTestId('commentMemoInput')
    const addCommentButton = screen.getByTestId('addComment')

    if (!commentDateInput) {
      throw new Error('日付入力フィールドが見つかりません')
    }

    // 日付入力フィールドに値を入力します
    const dateValue = '04/09/2023'
    fireEvent.change(commentDateInput, { target: { value: dateValue } })

    // メモ入力フィールドに値を入力します
    const memoValue = 'Test memo33'
    fireEvent.change(commentMemoInput, { target: { value: memoValue } })

    fireEvent.click(addCommentButton)

    const commentList = await screen.findAllByRole('list')

    expect(commentList[0].textContent).toEqual(dateValue + memoValue)
  })
})
