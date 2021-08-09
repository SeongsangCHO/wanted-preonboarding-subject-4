import { createSlice } from '@reduxjs/toolkit'
import { parse } from 'query-string'

// const searchSlice = createSlice({
//   name: 'search',
//   initialState: {
//     searchPath: ''
//   },
//   reducers: {
//     // initState도 없고 그냥 return만 하는애네 아무 기능이 없다.
//     setSearch(_state, action) {
//       const { payload } = action
//       // console.log(_state, payload)
//       _state.searchPath = payload
//       // return action.payload
//     }
//   }
// })

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    pathname: '',
  },
  reducers: {
    // initState도 없고 그냥 return만 하는애네 아무 기능이 없다.
    setSearch(_state, action) {
      _state.query = action.payload
      // return action.payload
    },
    setPathname(_state, action) {
      _state.pathname = action.payload
    }
  }
})

export const { setSearch, setPathname } = searchSlice.actions

// export const selectSearch = (state) => parse(state.search) //변경전친구
export const selectSearch = (state) => state.search //변경된친구

export default searchSlice.reducer
