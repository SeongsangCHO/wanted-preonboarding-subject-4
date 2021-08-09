import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearch, setPathname } from '../store/search' //경로원래틀렸음

function useSync() {
  const dispatch = useDispatch()
  const { search, pathname } = useLocation()

  useEffect(() => {
    if (!search) {
      return
    }

    dispatch(setSearch(search))
    dispatch(setPathname(pathname))
  }, [dispatch, search, pathname])

  // return search
}

export default useSync
