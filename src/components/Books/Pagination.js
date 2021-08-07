import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBooks, fetchBooks, Status } from '../../store/books'
import { useLocation } from 'react-router-dom'

function Pagination() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { status, startIndex } = useSelector(selectBooks)
  const isLoading = status === Status.Loading

  return (
    <button
      className={styles.button}
      disabled={startIndex === 0 || isLoading}
      onClick={() => {
        if (isLoading) {
          return
        }
        dispatch(fetchBooks(location.search, startIndex))
      }}
    >
      {isLoading ? '로딩중...' : '더보기'}
    </button>
  )
}

const styles = {
  button:
    'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
}

export default Pagination
