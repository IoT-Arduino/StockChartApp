import { render, fireEvent, waitFor, screen } from '@testing-library/react'
// import { act, renderHook } from '@testing-library/react-hooks'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import store from '../../store/store'
import InputMarker from '../../components/InputMarkerState'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useMutateMarker } from '../../hooks/useMutateMarker'
import ja from '../../locales/ja/ja'

const queryClient = new QueryClient()

jest.mock('../../hooks/useQueryMarker', () => ({
  useQueryMarker: () => ({
    data: [],
    status: 'success',
  }),
}))

jest.mock('../../hooks/useMutateMarker', () => {
  const mockData = [{ id: 1, memo: 'Test Memo', date: '2023-05-01', ticker: 'AAPL' }]

  const createMarkerMutation = {
    mutate: jest.fn(),
    onSuccess: jest.fn(),
  }

  createMarkerMutation.mutate.mockImplementation((marker) => {
    mockData.push(marker)

    // onSuccess関数を呼び出す
    createMarkerMutation.onSuccess(mockData)
  })

  return {
    useMutateMarker: () => ({
      createMarkerMutation,
      updateMarkerMutation: {
        mutate: jest.fn(),
      },
      deleteMarkerMutation: {
        mutate: jest.fn(),
      },
    }),
  }
})

jest.mock('../../hooks/useQueryMarker', () => ({
  useQueryMarker: () => ({
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
        <InputMarker ticker='AAPL' t={ja} />
      </Provider>
    </QueryClientProvider>
  )
}

describe('InputMarker component', () => {
  it('adds a marker correctly', async () => {
    const { getByTestId, container } = setup()

    const markerDateInput = container.querySelector('.react-datepicker__input-container input')
    const markerMemoInput = screen.getByTestId('markerMemoInput')
    const addMarkerButton = screen.getByTestId('addMarker')

    const list = screen.getByRole('list')

    // Get the mocked createMarkerMutation
    const { createMarkerMutation } = useMutateMarker()

    // Select date
    if (markerDateInput) {
      await userEvent.type(markerDateInput, '2023/05')
      expect(markerDateInput).toHaveValue('2023/05')
    }

    // Input memo
    await userEvent.type(markerMemoInput, 'Test Memo')
    expect(markerMemoInput).toHaveValue('Test Memo')

    // Check that the button is enabled
    expect(addMarkerButton).not.toBeDisabled()

    // Click add marker button
    fireEvent.submit(getByTestId('inputMarkerForm')) 

    // Wait for the mutate function to be called
    await waitFor(() => {
      expect(createMarkerMutation.mutate).toHaveBeenCalledTimes(1)
    })

    await waitFor(async () => {
      const testMemoElement = await screen.findByText('Test Memo')
      expect(testMemoElement).toBeInTheDocument()
    })
  })

})
