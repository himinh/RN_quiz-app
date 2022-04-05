import { FILTER_CATEGORIES } from '../constants'

export const filterCategories = payload => ({
  type: FILTER_CATEGORIES,
  payload,
})
