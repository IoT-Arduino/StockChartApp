import { render, screen, waitFor } from '@testing-library/react'
// import 'matchmedia-polyfill'

import { Footer } from './../components/Footer'
import Navbar from './../components/Navbar'
import { TopComponentJ } from './../locales/ja/TopComponent'


/* eslint-disable react/display-name */
import { ReactNode } from 'react'

jest.mock('next/link', () => {
  return ({ children, href }: { children: ReactNode; href: string }) => {
    return (
      <span role='link' data-testid='mocked-link' style={{ cursor: 'pointer' }}>
        {children}
      </span>
    )
  }
})

describe('Example', () => {
  it('Footer表示されること', async () => {
    render(<Footer />)
    const element = await screen.findByText('Home')
    const element2 = await screen.findByText('Twitter')

    expect(element).toBeInTheDocument()
    expect(element2).toBeInTheDocument()
  })
  it('Link表示されること', async () => {
    render(<Navbar />)
    const elements = await screen.findAllByRole('link', { name: /home/i })
    expect(elements.length).toBe(2)
    elements.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
  })

  it('home', async () => {
    render(<TopComponentJ />)
    // screen.debug()
    // await waitFor(() => {
    //   screen.getAllByText(/TenQ/i)
    // })
    const elements = await screen.findAllByText(/TenQ/i)
    expect(elements.length).toBeGreaterThan(0)
    elements.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
  })
})
