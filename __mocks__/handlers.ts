import { rest } from 'msw'
import { Comments } from '../types/Comments'

export const handlers = [
  // POST ハンドラ
  rest.post<Comments>(
    'https://lyqutonanjrerjbqloxc.supabase.co/rest/v1/comments',
    (req, res, ctx) => {
      console.log('Mock POST handler for comments API was called')

      return res(
        ctx.status(201),
        ctx.json<Comments>({
          id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
          created_at: '2023-04-09T02:57:18.850976',
          user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
          ticker: 'AAPL',
          date: '2023-04-08',
          memo: 'Test memo22',
        })
      )
    }
  ),
  // GET ハンドラを追加
  rest.get<Comments[]>(
    'https://lyqutonanjrerjbqloxc.supabase.co/rest/v1/comments',
    (req, res, ctx) => {
      console.log('Mock GET handler for comments API was called')
      return res(
        ctx.status(200),
        ctx.json<Comments[]>([
          {
            id: 'a5030ca2-151f-4f8d-930b-c3087365a82c',
            created_at: '2023-04-09T02:57:18.850976',
            user_id: '9fb62465-2a19-47df-8cc8-8991662e1629',
            ticker: 'AAPL',
            date: '2023-04-09',
            memo: 'Test memo33',
          },
        ])
      )
    }
  ),
]
