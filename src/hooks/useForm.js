import { useReducer } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { stringifyUrl, parse } from 'query-string'
import { flow, omitBy, isEmpty } from 'lodash/fp'
const PAGE_URL = {
  result: '/result',
  main: 'myPage'
}
/*
 * 1. components/SearchForm/index에서 사용
 *  이 부분은 store search로 해야할 것 같은뎅. ?
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
  // ! location대신, search의 path값을 불러와서 사용하는게 ?
  const location = useLocation() //검색 시 해당하는 url에 대한 정보를 객체로 반환받음
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...parse(location.search) //검색 후 쿼리스트링key : value
  })
  const currentPageUrl =
    location.pathname === '/' ? '/result' : location.pathname
  // 느낌스
  // / => result , filter => result
  // / => default url지정해주면 되지않을까 ?
  function handleRouter(query) {
    const path = stringifyUrl({
      url: '/result',
      // ? url: currentPageUrl, //상수 /내관심목록/filter
      query
    })
    // query = {orderBy : "relevance", q:"12", "printType:"all"}
    // path ==  /result?orderBy=relevance&printType=all&q=12
    // path ==  /mybooks?orderBy=relevance&printType=all&q=123
    history.push(path)
  }

  /*
 ? 
*/
  function makeQuery(input) {
    return flow(omitBy(isEmpty))(input)
  }
  //확장성을 생각해서 함수util로 분리, (ex_ 현재는 submit시에 input검색창 1개만 유효값을 체크한다면 나중에는 책이름/저자명/출판사 등 여러 input창으로 나뉘어 submit data를 받을 수 있겠다고 생각함.

  function handleSubmit(e) {
    e.preventDefault()
    /* flow https://stackoverflow.com/questions/53510145/what-does-the-lodash-flow-function-do
     */

    /*
     * 초기검색 result ? orderBy = relevance & printType=all & q=달빛
     * 필터조건검색 /result?filter=ebooks&orderBy=newest&printType=books&q=달빛
     * 초기 검색시 쿼리스트링에 기본값(orderBy,printType) + q값만 들어가고(onChange를 통해 q는 ''-> valid update)
     * filter는 들어가지 않으므로 유효한(비어있지 않은) 값에 대해서만
     * 조건을 할 수 있도록 추가된 함수 + filter할 땐 filter값이 들어가므로 해당 함수를 재사용가능
     */
    const query = makeQuery(state) //비어있지 않은 조건만 query로 만듬
    handleRouter(query)

    //isValidQuery()
    // handleRouter(state)
  }

  function handleChange(e) {
    /*SearchForm에서 값이 변경될 때마다 호출
     * reducer에 {}객체값 전달
     */
    const { name, value } = e.target
    console.log(name, value)
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
    // ! Filters를 모달이나 드롭다운으로 만든다면,
    // 필터조건에 따라 바로바로 검색결과를 눈에 볼 수 있으므로. Router가 있어도 된다 !
    // handleRouter({
    //   ...parse(location.search),
    //   [name]: value
    // })
  }

  return {
    state,
    handleChange,
    handleSelect,
    handleSubmit
  }
}

export default useForm
