import { createStore } from 'redux'
import { combineReducers } from 'redux'
import {
  authReducer,
  quizzesReducer,
  categoriesReducer,
  filtersReducer,
  userssReducer,
} from './slices'

const reducer = combineReducers({
  auth: authReducer,
  quizzes: quizzesReducer,
  categories: categoriesReducer,
  filters: filtersReducer,
  users: userssReducer,
})

export const store = createStore(reducer)
