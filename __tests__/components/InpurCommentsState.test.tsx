import { render, fireEvent, waitFor, screen } from '@testing-library/react'
// import { act, renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import store from '../../store/store'
import InputComment from '../../components/InputCommentsState'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useMutateComment } from '../../hooks/useMutateComment'
import ja from '../../locales/ja/ja'

const queryClient = new QueryClient()

jest.mock('../../hooks/useQueryComments', () => ({
  useQueryComment: () => ({
    data: [],
    status: 'success',
  }),
}))

jest.mock('../../hooks/useMutateComment', () => {
  const mockData = [{ id: 1, memo: 'Test Memo', date: '2023-05-01', ticker: 'AAPL' }]

  const createCommentMutation = {
    mutate: jest.fn(),
    onSuccess: jest.fn(),
  }

  createCommentMutation.mutate.mockImplementation((comment) => {
    mockData.push(comment)
    // onSuccess関数を呼び出す
    createCommentMutation.onSuccess(mockData)
  })

  return {
    useMutateComment: () => ({
      createCommentMutation,
      updateCommentMutation: {
        mutate: jest.fn(),
      },
      deleteCommentMutation: {
        mutate: jest.fn(),
      },
    }),
  }
})

jest.mock('../../hooks/useQueryComments', () => ({
  useQueryComments: () => ({
    data: [{ id: 1, memo: 'Test Memo', date: '2023-05-01', ticker: 'AAPL' }],
    error: null,
    isLoading: false,
    isSuccess: true,
    isError: false,
  }),
}))

jest.mock('next/router', () => ({
  useRouter: () => ({
    locale: 'ja-JP',
  }),
}))

const setup = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <InputComment ticker='AAPL' t={ja} />
      </Provider>
    </QueryClientProvider>
  )
}

describe('InputComment component', () => {
  it('adds a Comment correctly', async () => {
    const { getByTestId, container } = setup()

    const commentDateInput = container.querySelector('.react-datepicker__input-container input')
    const commentMemoInput = screen.getByTestId('commentMemoInput')
    const addCommentButton = screen.getByTestId('addComment')

    const list = screen.getByRole('list')

    // Get the mocked createCommentMutation
    const { createCommentMutation } = useMutateComment()

    // Select date
    if (commentDateInput) {
      await userEvent.type(commentDateInput, '2023/05/01')
      expect(commentDateInput).toHaveValue('2023/05/01')
    }

    // Input memo
    await userEvent.type(commentMemoInput, 'Test Memo')
    expect(commentMemoInput).toHaveValue('Test Memo')

    // Check that the button is enabled
    expect(addCommentButton).not.toBeDisabled()

    // Click add comment button
    fireEvent.submit(getByTestId('inputCommentForm')) 

    // Wait for the mutate function to be called
    await waitFor(() => {
      expect(createCommentMutation.mutate).toHaveBeenCalledTimes(1)
    })

    await waitFor(async () => {
      const testMemoElement = await screen.findByText('Test Memo')
      expect(testMemoElement).toBeInTheDocument()
    })
  })

})
