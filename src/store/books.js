import { createSlice } from '@reduxjs/toolkit'
import { getBooks } from '../api'
export const Status = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Failure: 'failure'
}

/*
 * createSlice : action + reducer
 * bookSlice의 리듀서를 export하여 해당하는 함수만 호출해주면 state가 update된다.
 */
const booksSlice = createSlice({
  name: 'books', // action의 경로
  initialState: {
    // 초기 state
    items: [],
    totalItems: 0,
    startIndex: 0,
    status: Status.Idle,
    error: null
  },
  reducers: {
    //해당 action이 dispatch되면 바로 액션을 처리 -> 해당함수가 호출되면 바로 state update
    getItemsStart(state, action) {
      console.log(action)
      //loading 보여주기
      if (action.payload === 0) {
        state.items = []
      }

      state.error = null
      state.status = Status.Loading
    },
    getItemsSuccess(state, action) {
      console.log('getItesmSuccess? ')
      console.log(action)

      //item 불러와졌을 때, action에 대한 데이터 update
      const { items, totalItems, startIndex } = action.payload
      const nextItems = startIndex ? state.items.concat(items) : items

      state.items = nextItems
      state.startIndex = nextItems.length
      state.totalItems = totalItems
      state.status = Status.Success
    },
    getItemsFailure(state, action) {
      // state.error = action.payload
      state.status = Status.Failure
      console.log('에러발생', state.error)
    }
  }
})

//booksSlice.actions ={ getItemsStart:(f), ... }reducer로 정의된 함수가 담겨있음
export const { getItemsStart, getItemsSuccess, getItemsFailure } =
  booksSlice.actions
export default booksSlice.reducer

//store중 books에 해당하는 state return
export const selectBooks = (state) => {
  return state.books
}

// ! who is dispatch ? -> https://redux-toolkit.js.org/usage/usage-guide
// async request using redux-thunk in toolkit - middleware
export const fetchBooks =
  (search, startIndex = 0) =>
  async (dispatch) => {
    try {
      dispatch(getItemsStart(startIndex))
      const data = await getBooks(search, startIndex)
      dispatch(getItemsSuccess({ ...data, startIndex }))
    } catch (error) {
      console.log(error)
      dispatch(getItemsFailure(error))
    }
  }

/* same as  */
// export const fetchBooks = (search, startIndex = 0) =>
//   async function (dispatch) {
//     try {
//       dispatch(getItemsStart(startIndex))
//       const response = await getBooks(search, startIndex)
//       const data = await response.json()
//       dispatch(getItemsSuccess({ ...data, startIndex }))
//     } catch (error) {
//       dispatch(getItemsFailure(error))
//     }
//   }

/* same as  */
// export function fetchBooks(search, startIndex = 0) {
//   return async function (dispatch) {
//     try {
//       dispatch(getItemsStart(startIndex))
//       const response = await getBooks(search, startIndex)
//       const data = await response.json()
//       dispatch(getItemsSuccess({ ...data, startIndex }))
//     } catch (error) {
//       dispatch(getItemsFailure(error))
//     }
//   }
// }
