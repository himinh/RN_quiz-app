import { createStore } from 'redux'
import { combineReducers } from 'redux'
import {
  authReducer,
  quizzesReducer,
  categoriesReducer,
  filtersReducer,
} from './slices'

const reducer = combineReducers({
  auth: authReducer,
  quizzes: quizzesReducer,
  categories: categoriesReducer,
  filters: filtersReducer,
})

export const store = createStore(reducer)
