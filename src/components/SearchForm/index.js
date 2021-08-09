import React from 'react'
import { useLocation } from 'react-router-dom'
import useSync from '../../hooks/useSync'
import useForm from '../../hooks/useForm'
import LinkToFilter from './LinkToFilter'

function SearchForm() {
  const location = useLocation()
  // useSync()
  const { state, handleChange, handleSubmit } = useForm()

  // let nextpath;
  // if(location.pathname==='/') nextpath = './result'
  // else nextpath = './mybooks'

  return (
    // /result 페이지로 라우팅
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <fieldset>
        <label htmlFor="q" className={styles.label}>
          <span hidden>검색어</span>
          <input
            type="search"
            id="q"
            name="q"
            defaultValue={state.q}
            placeholder="제목, 저자, 출판사를 검색해 보세요"
            required
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.submit}>
          검색
        </button>
      </fieldset>
      {/* 경로가 /result로 되었을 때 필터칸 viewing */}
      {location.pathname !== '/' && <LinkToFilter />}
    </form>
  )
}

//  ! style부분도 이렇게 나열할게 아니라 따로 관리해야 할 듯
const styles = {
  wrapper: 'flex items-center justify-between sticky',
  label: 'mb-1 text-gray-700',
  input: 'w-64 h-8 px-2 border border-r-0 rounded-l focus:outline-none text-sm',
  submit:
    'h-8 px-4 rounded-r bg-blue-500 hover:bg-blue-700 text-white align-top'
}

export default SearchForm
