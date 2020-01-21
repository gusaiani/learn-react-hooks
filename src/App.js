import React, { useReducer, useEffect, useState } from 'react'
import { ThemeContext, StateContext } from './contexts'
import HeaderBar from './pages/HeaderBar'
import HomePage from './pages/HomePage'

import appReducer from './reducers'

export default function App ({projectName}) {
  const [ theme, setTheme ] = useState('')
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const {user, error} = state

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
        <div style={{ padding: 8 }}>
          <HeaderBar setTheme={setTheme} projectName={projectName} />
          <hr />
          <HomePage />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}
