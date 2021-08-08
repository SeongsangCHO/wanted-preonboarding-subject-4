import { configureStore } from '@reduxjs/toolkit'
import search from './search'
import books from './books'
// reduce함수 묶기
export default configureStore({
  reducer: {
    search,
    books
  }
})
