import React, { useEffect } from 'react'
import { useInput } from 'react-hookedup'
import { useDispatch, useUserState, useAPICreatePost, useDebouncedUndo } from '../hooks'
import { useNavigation } from 'react-navi'

export default function CreatePost () {
  const dispatch = useDispatch()
  const user = useUserState()
  const { value: title, bindToInput: bindTitle, clear: clearTitle } = useInput('')
  const [ content, setContent, { undo, redo, canUndo, canRedo } ] = useDebouncedUndo()

  const [ post, createPost ] = useAPICreatePost()

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
  }

  function handleContent (e) {
    const { value } = e.target
    setContent(value)
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
      onChange={handleContent}
      />
      <button type="button" onClick={undo} disabled={!canUndo}>Undo</button>
      <button type="button" onClick={redo} disabled={!canRedo}>Redo</button>
      <input
        type="submit"
        value="Create"
      />
    </form>
  )
}
