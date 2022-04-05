import { ADD_CATEGORIES, CLEAR_CATEGORIES } from '../constants'

const categoriesState = []
export const categoriesReducer = (state = categoriesState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return action.payload

    case CLEAR_CATEGORIES:
      return categoriesState

    default:
      return state
  }
}
