import { createSlice } from '@reduxjs/toolkit'
import { parse } from 'query-string'

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearch(_state, action) {
      return action.payload
    }
  }
})

export const { setSearch } = searchSlice.actions

export const selectSearch = state => parse(state.search)

export default searchSlice.reducer
