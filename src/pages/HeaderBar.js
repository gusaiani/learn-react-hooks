import React, { useContext } from 'react'
import CreatePost from '../post/CreatePost'
import UserBar from '../user/UserBar'
import Header from '../Header'
import ChangeTheme from '../ChangeTheme'

import { ThemeContext, StateContext } from '../contexts'

export default function HeaderBar ({ setTheme, projectName }) {
  const theme = useContext(ThemeContext)

  const { state } = useContext(StateContext)
  const { user } = state

  return (
    <div>
      <Header text={projectName} />
      <ChangeTheme theme={theme} setTheme={setTheme} />
      <br />
      <React.Suspense fallback={'Loading...'}>
        <UserBar />
      </React.Suspense>
      <br />
      {user && <CreatePost />}
    </div>
  )
}
