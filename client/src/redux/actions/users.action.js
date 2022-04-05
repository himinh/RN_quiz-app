import { GET_USERS, DELETE_USER, CLEAR_USERS } from '../constants'

export const getUsers = payload => ({
  type: GET_USERS,
  payload,
})

export const deleteUsersById = payload => ({
  type: DELETE_USER,
  payload,
})
export const clearUsers = () => ({ type: CLEAR_USERS })
