import React, { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { useNavigation } from 'react-navi'
import { StateContext } from '../contexts'

export default function CreatePost () {
  const { state, dispatch } = useContext(StateContext)
  const { user } = state
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')

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

  function handleTitle (evt) {
    setTitle(evt.target.value)
  }

  function handleContent (evt) {
    setContent(evt.target.value)
  }

  function handleCreate (evt) {
    evt.preventDefault()

    createPost({ title, content, author: user })
    setTitle('')
    setContent('')
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
          onChange={handleTitle}
        />
      </div>
      <textarea
        value={content}
        onChange={handleContent}
      />
      <input
        type="submit"
        value="Create"
      />
    </form>
  )
}
