import { ADD_CATEGORIES, CLEAR_CATEGORIES } from '../constants'

export const addCategories = payload => ({ type: ADD_CATEGORIES, payload })
export const clearCategories = () => ({ type: CLEAR_CATEGORIES })
