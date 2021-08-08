import { useReducer } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { stringifyUrl, parse } from 'query-string'
import { flow, omitBy, isEmpty } from 'lodash/fp'

/*
 * 1. components/SearchForm/index에서 사용
 */
const initialState = {
  q: '',
  orderBy: 'relevance',
  filter: '',
  printType: 'all'
}

/*
 * dispatch type: 'change' 발생시 state update
 * SearchForm의 input 입력시 상태 갱신
 */
function reducer(state, action) {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

function useForm() {
  const history = useHistory()
  const location = useLocation() //검색 시 해당하는 url에 대한 정보를 객체로 반환받음
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...parse(location.search) //검색 후 쿼리스트링key : value
  })
  function handleRouter(query) {
    const path = stringifyUrl({
      url: '/result',
      query
    })
    // query = {orderBy : "relevance", q:"12", "printType:"all"}
    // path ==  /result?orderBy=relevance&printType=all&q=12
    history.push(path)
  }

  function handleSubmit(e) {
    e.preventDefault()
    /* flow https://stackoverflow.com/questions/53510145/what-does-the-lodash-flow-function-do
     *
     */
    const query = flow(omitBy(isEmpty))(state)
    console.log(query)
    handleRouter(query)
  }

  function handleChange(e) {
    /*SearchForm에서 값이 변경될 때마다 호출
     * reducer에 {}객체값 전달
     */
    const { name, value } = e.target

    dispatch({
      type: 'change',
      payload: {
        [name]: value
      }
    })
  }

  function handleSelect(e) {
    const { name, value } = e.target

    handleChange(e)
    handleRouter({
      ...parse(location.search),
      [name]: value
    })
  }

  return {
    state,
    handleChange,
    handleSelect,
    handleSubmit
  }
}

export default useForm
