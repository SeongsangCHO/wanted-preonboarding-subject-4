import { useReducer } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { stringifyUrl, parse } from 'query-string'
import { flow, omitBy, isEmpty } from 'lodash/fp'

const initialState = {
  q: '',
  orderBy: 'relevance',
  filter: '',
  printType: 'all'
}

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
  const location = useLocation()
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...parse(location.search)
  })

  function handleRouter(query) {
    const path = stringifyUrl({
      url: '/result',
      query
    })

    history.push(path)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const query = flow(omitBy(isEmpty))(state)

    handleRouter(query)
  }

  function handleChange(e) {
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
