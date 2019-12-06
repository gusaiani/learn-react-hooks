import React, { useReducer, useEffect } from 'react'
import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import Header from './Header'
import { ThemeContext } from './contexts'

import appReducer from './reducers'

const defaultPosts = [
  {
    title: 'React Hooks',
    content: 'arst arst',
    author: 'Gustavo'
  },
  {
    title: 'React Hooks',
    content: 'arst arst',
    author: 'Gustavo'
  },
]

export default function App ({projectName}) {
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: defaultPosts })
  const {user, posts} = state

  useEffect(() => {
    if (user) {
      document.title = `${user} — ${projectName}`
    } else {
      document.title = projectName
    }
  }, [projectName, user])

  return (
    <div style={{ padding: 8 }}>
      <Header text={projectName} />
      <UserBar user={user} dispatch={dispatch} />
      <br />
      {user && <CreatePost user={user} posts={posts} dispatch={dispatch} />}
      <br />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
