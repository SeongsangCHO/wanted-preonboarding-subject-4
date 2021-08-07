import { configureStore } from '@reduxjs/toolkit'
import search from './search'
import books from './books'

export default configureStore({
  reducer: {
    search,
    books
  }
})
