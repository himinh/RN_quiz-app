import { CREATE_QUIZ, ADD_QUIZZES } from '../constants'

export const createQuiz = payload => ({ type: CREATE_QUIZ, payload })
export const addQuizzes = payload => ({ type: ADD_QUIZZES, payload })
