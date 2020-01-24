import React, { useContext } from 'react'
import useWindowSize from '@rehooks/window-size'
import CreatePost from '../post/CreatePost'
import UserBar from '../user/UserBar'
import Header from '../Header'
import ChangeTheme from '../ChangeTheme'

import { StateContext } from '../contexts'
import useTheme from '../hooks/useTheme'

export default function HeaderBar ({ setTheme, projectName }) {
  const theme = useTheme()

  const { state } = useContext(StateContext)
  const { innerWidth } = useWindowSize()
  const mobilePhone = innerWidth < 640
  const { user } = state

  return (
    <div>
      <Header text={projectName} />
      {!mobilePhone && <ChangeTheme theme={theme} setTheme={setTheme} />}
      {!mobilePhone && <br />}
      {!mobilePhone && <React.Suspense fallback={'Loading...'}>
        <UserBar />
      </React.Suspense>}
      {!mobilePhone &&<br />}
      {user && <CreatePost />}
    </div>
  )
}
