import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { selectSearch } from '../../store/search'
import IconFilter from './IconFilter'

function LinkToFilter() {
  // const location = useLocation()
  const { query } = useSelector(selectSearch);
  return (
    <Link
      to={{
        pathname: '/filters',
        search: query
      }}
      className={styles.wrapper}
    >
      <IconFilter />
    </Link>
  )
}

const styles = {
  wrapper: 'text-blue-500 hover:text-blue-700'
}

export default LinkToFilter
