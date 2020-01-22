import React, { useEffect } from 'react'
import { Link } from 'react-navi'
import { useResource } from 'react-request-hook'

import Post from '../post/Post'

export default function PostPage ({ id }) {
  const [ post, getPost ] = useResource(() => ({
    url: `/posts/${id}`,
    method: 'get'
  }))

  useEffect(getPost, [id])

  return (
    <div>
      <div><Link href="/">Go back</Link></div>
      {(post && post.data)
        ? <Post {...post.data} />
        : 'Loading…'
      }
      <hr/>
    </div>
  )
}
