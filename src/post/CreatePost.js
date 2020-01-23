import React, { useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { useInput } from 'react-hookedup'
import { useNavigation } from 'react-navi'
import { StateContext } from '../contexts'

export default function CreatePost () {
  const { state, dispatch } = useContext(StateContext)
  const { user } = state
  const { value: title, bindToInput: bindTitle, clear: clearTitle } = useInput('')
  const { value: content, bindToInput: bindContent, clear: clearContent } = useInput('')

  const [ post, createPost ] = useResource(({ title, content, author }) => ({
    url: '/posts',
    method: 'post',
    data: { title, content, author }
  }))

  const navigation = useNavigation()

  useEffect(() => {
    if (post && post.data) {
      dispatch({ type: 'CREATE_POST', ...post.data })
      navigation.navigate(`/view/${post.data.id}`)
    }
  }, [dispatch, navigation, post])

  function handleCreate (evt) {
    evt.preventDefault()

    createPost({ title, content, author: user })
    clearTitle()
    clearContent()
  }

  return (
    <form onSubmit={handleCreate}>
      <div>Author: <b>{user}</b></div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          {...bindTitle}
        />
      </div>
      <textarea
        value={content}
        {...bindContent}
      />
      <input
        type="submit"
        value="Create"
      />
    </form>
  )
}
