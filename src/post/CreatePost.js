import React, { useState } from 'react'

export default function CreatePost ({ user, posts, dispatch }) {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')

  function handleTitle (evt) {
    setTitle(evt.target.value)
  }

  function handleContent (evt) {
    setContent(evt.target.value)
  }

  function handleCreate (evt) {
    evt.preventDefault()

    dispatch({ type: 'CREATE_POST', title, content, author: user })
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
