import React, { useReducer, useEffect, useState } from 'react'
import { useResource } from 'react-request-hook'
import { ThemeContext, StateContext } from './contexts'
import ChangeTheme from './ChangeTheme'
import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import Header from './Header'

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

  const [posts, getPosts] = useResource(() => ({
    url: '/posts',
    method: 'get'
  }))

  useEffect(getPosts, [])

  useEffect(() => {
    if (posts && posts.error) {
      dispatch({ type: 'POSTS_ERROR' })
    }
    if (posts && posts.data) {
      dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() })
    }
  }, [posts])

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
          {error && <b>{error}</b>}
          <PostList />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}
