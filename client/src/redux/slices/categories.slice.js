import { ADD_CATEGORIES } from '../constants'

const categoriesState = []
export const categoriesReducer = (state = categoriesState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return action.payload

    default:
      return state
  }
}
