import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { Main, Result, Filters } from './pages'
import store from './store'

//  파일 분리
function Routes() {
  const location = useLocation()
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  return transitions.map(({ item: location, props, key }) => (
    <animated.div key={key} className="absolute w-full" style={props}>
      <Switch location={location}>
        {/* ROUTE 상수화, props로 컴포넌트 주입 */}
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
        <Route path="/filters">
          <Filters />
        </Route>
      </Switch>
    </animated.div>
  ))
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.wrapper}>
          <Routes />
        </div>
      </Router>
    </Provider>
  )
}

const styles = {
  wrapper: 'relative max-w-screen-sm p-4 mx-auto'
}

export default App
