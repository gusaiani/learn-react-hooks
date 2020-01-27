import { useContext } from React;
import { StateContext } from '../contexts'

export default function useUserState () {
  const { state } = useContext(StateContext)
  return state.user
}
