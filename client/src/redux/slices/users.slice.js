import { CLEAR_USERS, DELETE_USER, GET_USERS } from '../constants'

const usersState = {
  users: [],
}
export const userssReducer = (state = usersState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      }

    case CLEAR_USERS:
      return usersState

    default:
      return state
  }
}
