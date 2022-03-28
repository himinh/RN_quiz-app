import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../constants'

const authState = {
  user: null,
  token: null,
}
export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.tokens.access_token,
        loading: false,
      }

    case SIGN_UP:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.tokens.access_token,
        loading: false,
      }
    case SIGN_OUT:
      return authState

    default:
      return state
  }
}
