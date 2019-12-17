import React, { useReducer, useEffect, useState } from 'react'
import { ThemeContext, StateContext } from './contexts'
import ChangeTheme from './ChangeTheme'
import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import Header from './Header'

import appReducer from './reducers'

export default function App ({projectName}) {
  const [ theme, setTheme ] = useState('')
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: [] })
  const {user} = state

  useEffect(() => {
    if (user) {
      document.title = `${user} — ${projectName}`
    } else {
      document.title = projectName
    }
  }, [projectName, user])

  useEffect(() => {
    fetch('/api/posts')
      .then(result => result.json())
      .then(posts => dispatch({ type: 'FETCH_POSTS', posts }))
  }, [])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 8 }}>
          <Header text={projectName} />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <br />
          <UserBar />
          <br />
          {user && <CreatePost />}
          <br />
          <hr />
          <PostList />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}
