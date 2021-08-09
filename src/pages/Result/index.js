import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks, selectBooks } from '../../store/books'
import SearchForm from '../../components/SearchForm'
import Books from '../../components/Books'
import Pagination from '../../components/Books/Pagination'
import Stack from '../../components/Stack'
import useSync from '../../hooks/useSync'
import { selectSearch } from '../../store/search'

function Result() {
  //store로부터 dispatch함수 참조값 반환
  useSync()
  console.log('after useSync')

  const dispatch = useDispatch()
  const { query } = useSelector(selectSearch)
  // const { search } = useLocation() // queryString::?orderBy=...
  const { items, status } = useSelector(selectBooks) // store에서 해당하는 state extract
  // ! useSync로 작성된 코드임 ->setBooks가 default로 되어있긴함
  console.log('renderiggdsfgdfgfdfdgfdg')
  useEffect(() => {
    //url이 변경될 때마다 실행됨
    // if (!query) {
    //   return
    // }
    //검색이 클릭되었을 때 비동기 요청의 결과를 dispatch함.
    // ! 그럼 함수 호출만 하면되지 왜 dispatch안에 넣어놓은거지 ?
    // ! -> 상태를 update하기 위해서는 dispatch를 호출해야한다.
    if (items.length === 0)
      // => 다시 api요청보내지 않도록 처리함
      dispatch(fetchBooks(query))
    // ! -> 불러왔을 때 실패에 대한 UI도 보여주어야 하지 않을까 ? 다시시도라든지,
    // ! ->
  }, [dispatch, query])
  return (
    <div className={styles.wrapper}>
      <Stack gaps={[0, 10, 20, 20]}>
        {/* Main.js에서 재사용됨 */}
        <SearchForm />
        {/* 여기서 filter가 안보이니까  보기 위해서 밑으로 파고들어야함 modal로 빼버리는게,*/}
        {/*  status를 useSelecotr로 가져와서 조건부 랜더링 처리하는 것도 좋을듯. */}
        <Books items={items} />
        <Pagination />
      </Stack>
    </div>
  )
}

const styles = {
  wrapper: 'pb-4'
}

export default Result
