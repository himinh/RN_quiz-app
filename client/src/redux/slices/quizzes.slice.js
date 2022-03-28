import { CREATE_QUIZ, ADD_QUIZZES } from '../constants'

const quizzesState = []
export const quizzesReducer = (state = quizzesState, action) => {
  switch (action.type) {
    case CREATE_QUIZ:
      return [...state, action.payload]

    case ADD_QUIZZES:
      return action.payload

    default:
      return state
  }
}
