import { renderHook, act } from '@testing-library/react-hooks'
import { StateContextWrapper } from './testUtils'
import useDispatch from './useDispatch'
import usePostsState from './usePostsState'

test('should use posts state', () => {
  const { result } = renderHook(
    () => usePostsState(),
    { wrapper: StateContextWrapper }
  )

  expect(result.current).toEqual([])
})

test('should update posts state on fetch action', () => {
  const { result } = renderHook(
    () => ({ state: usePostsState(), dispatch: useDispatch() }),
    { wrapper: StateContextWrapper }
  )

  const samplePosts = [{ id: 'test1' }, { id: 'test2' }]

  act(() => result.current.dispatch({ type: 'FETCH_POSTS', posts: samplePosts }))

  expect(result.current.state).toEqual(samplePosts)
})

test('should update posts state on insert action', () => {
  const { result } = renderHook(
    () => ({ state: usePostsState(), dispatch: useDispatch() }),
    { wrapper: StateContextWrapper }
  )
  const post = {title: 'Hello world', content: 'This is a test', author: 'Test user'}
  act(() => result.current.dispatch({ type: 'CREATE_POST', ...post }))
  expect(result.current.state[0]).toEqual(post)
})
