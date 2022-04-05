import { CREATE_QUIZ, ADD_QUIZZES, DELETE_QUIZ, CLEAR_QUIZ } from '../constants'

const quizzesState = []
export const quizzesReducer = (state = quizzesState, action) => {
  switch (action.type) {
    case CREATE_QUIZ:
      return [...state, action.payload]

    case ADD_QUIZZES:
      return action.payload

    case DELETE_QUIZ:
      return state.filter(quiz => quiz.id != action.payload)

    case CLEAR_QUIZ:
      return quizzesState

    default:
      return state
  }
}
