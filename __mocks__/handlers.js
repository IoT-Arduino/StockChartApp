// handlers.js
import { rest } from 'msw'

export const handlers = [
  // POST ハンドラ
  rest.post('https://lyqutonanjrerjbqloxc.supabase.co/rest/v1/comments',  (req, res, ctx) => {
    console.log('Mock POST handler for comments API was called')
    console.log(req.json())
    return res(
      ctx.status(201),
      ctx.json({
        id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
        created_at: '2023-04-09T02:57:18.850976',
        user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
        ticker: 'AAPL',
        date: '2023-04-06',
        memo: 'Test memo22',
      })
    )
  }),
  // GET ハンドラを追加
  rest.get('https://lyqutonanjrerjbqloxc.supabase.co/rest/v1/comments', (req, res, ctx) => {
    console.log('Mock GET handler for comments API was called')
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
          created_at: '2023-04-09T02:57:18.850976',
          user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
          ticker: 'AAPL',
          date: '2023-04-06',
          memo: 'Test memo3',
        },
        // {
        //   id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
        //   created_at: '2023-04-09T02:57:18.850976',
        //   user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
        //   ticker: 'AAPL',
        //   date: '2023-04-07',
        //   memo: 'Test memo4',
        // },
      ])
    )
  }),
]
