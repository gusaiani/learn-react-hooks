import React, { useReducer, useEffect, useState } from 'react'
import { Router, View } from 'react-navi'
import { mount, route } from 'navi'
import { ThemeContext, StateContext } from './contexts'
import HeaderBar from './pages/HeaderBar'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'

import appReducer from './reducers'

const routes = mount({
  '/': route({ view: <HomePage /> }),
  '/view/:id': route(req => {
    console.log({req})
    return { view: <PostPage id={req.params.id} /> }
  }),
})

export default function App ({projectName}) {
  const [ theme, setTheme ] = useState('')
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const {user} = state

  useEffect(() => {
    if (user) {
      document.title = `${user} — ${projectName}`
    } else {
      document.title = projectName
    }
  }, [projectName, user])


  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <Router routes={routes}>
          <div style={{ padding: 8 }}>
            <HeaderBar setTheme={setTheme} projectName={projectName} />
            <hr />
            <View />
          </div>
        </Router>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}
