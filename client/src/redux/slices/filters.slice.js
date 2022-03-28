import { FILTER_CATEGORIES } from '../constants'

const filterState = {
  categoryTitle: '',
}
export const filtersReducer = (state = filterState, action) => {
  switch (action.type) {
    case FILTER_CATEGORIES:
      return {
        ...state,
        categoryTitle: action.payload,
      }

    default:
      return state
  }
}
