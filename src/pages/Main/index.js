import React from 'react'
import SearchForm from '../../components/SearchForm'

function Main() {
  return (
    <div className={styles.wrapper}>
      <SearchForm />
    </div>
  )
}

const styles = {
  wrapper: 'flex items-center justify-center w-full h-screen'
}

export default Main
