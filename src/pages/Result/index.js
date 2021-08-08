import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks, selectBooks } from '../../store/books'
import SearchForm from '../../components/SearchForm'
import Books from '../../components/Books'
import Pagination from '../../components/Books/Pagination'
import Stack from '../../components/Stack'

function Result() {
  //store로부터 dispatch함수 참조값 반환
  const dispatch = useDispatch()
  const { search } = useLocation() // queryString::?orderBy=...
  const { items } = useSelector(selectBooks) // store에서 해당하는 state extract

  useEffect(() => {
    //url이 변경될 때마다 실행됨
    if (!search) {
      return
    }
    console.log(dispatch)
    dispatch(fetchBooks(search))
  }, [dispatch, search])

  return (
    <div className={styles.wrapper}>
      <Stack gaps={[0, 10, 20, 20]}>
        <SearchForm />
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
