import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mantine/core';

const PagingTicker = ({prevTicker,nextTicker,signIn,t}) => {
    const router = useRouter()
    const handlePrev = (e) => {
        const prevLink = `/stocks/${prevTicker}`
        router.push(prevLink)
      }

      const handleNext = (e) => {
        const nextLink = `/stocks/${nextTicker}`
        router.push(nextLink)
      }


  return (
    <div>
    <div className="flex justify-center mt-4 sm:mt-8">
      {/* Paging */}
      <Button variant="outline" color="teal" compact disabled={!signIn} onClick={handlePrev} className="mr-8" data-testid="prevTicker">
        Prev Ticker
      </Button>
   
      <Button variant="outline" color="teal" compact disabled={!signIn} onClick={handleNext} data-testid="nextTicker">
        Next Ticker
      </Button>
    </div>
    <span className={`${!signIn ? "w-full text-center my-2 block text-sm" :"hidden"} ? `}>{t.pagingInform}</span>
    </div>
  )
}

export default PagingTicker
