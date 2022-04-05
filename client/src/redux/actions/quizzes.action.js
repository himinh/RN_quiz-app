import { CREATE_QUIZ, ADD_QUIZZES, DELETE_QUIZ, CLEAR_QUIZ } from '../constants'

export const createQuiz = payload => ({ type: CREATE_QUIZ, payload })
export const addQuizzes = payload => ({ type: ADD_QUIZZES, payload })
export const deleteQuizById = payload => ({ type: DELETE_QUIZ, payload })
export const clearQuizzes = () => ({ type: CLEAR_QUIZ })
