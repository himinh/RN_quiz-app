import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FormButton, QuestionItem, ResultModal } from '../../components'
import { axiosInstance } from '../../utils/axiosInstance'

const shuffleAnswers = question => {
  const unshuffleAnwers = [question.correctAnswer, ...question.incorrectAnswers]
  return unshuffleAnwers
    .map(anwer => ({ sort: Math.random(), value: anwer }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.value)
}

export const PlayQuizScreen = ({ navigation, route }) => {
  const { quizId } = route.params
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [isResultModalVisible, setIsResultModalVisible] = useState(false)

  const getQuizAndQuestionDetails = async () => {
    // API endpoint
    let getQuiz = axiosInstance.get(`/quizzes/${quizId}`)
    const getQuestionByQuiz = axiosInstance.get(`/questions?quiz=${quizId}`)

    // Call API
    const [{ data: quizData }, { data: questionsData }] = await Promise.all([
      getQuiz,
      getQuestionByQuiz,
    ])
    // Set title
    setTitle(quizData.title)

    // Transform and shuffle options
    let tempQuestions = []
    questionsData.forEach(question => {
      // Create Single array of all options and shuffle it
      question.allAnswers = shuffleAnswers(question)
      tempQuestions.push(question)
    })

    // Set questions
    setQuestions(tempQuestions)
  }

  useEffect(() => {
    getQuizAndQuestionDetails()
  }, [quizId])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#FFFFFF' barStyle={'dark-content'} />
      {/* Top Bar */}
      <View style={styles.topBarContainer}>
        {/* Back Icon */}
        <MaterialIcons
          name='arrow-back'
          size={20}
          color='#FFFFFF'
          onPress={() => navigation.goBack()}
        />

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Count the number of correct or incorrect answers */}
        <View style={styles.countContainer}>
          {/* Correct */}
          <View style={[styles.resultContainer, styles.correctColor]}>
            <MaterialIcons name='check' size={12} style={styles.white} />
            <Text style={[styles.white, styles.spaceLeft]}>
              {correctCount}'
            </Text>
          </View>

          {/* Incorrect */}
          <View style={[styles.resultContainer, styles.incorrectColor]}>
            <MaterialIcons name='close' size={12} style={styles.white} />
            <Text style={[styles.white, styles.spaceLeft]}>
              {incorrectCount}
            </Text>
          </View>
        </View>
      </View>

      {/* Questions and Options list */}
      {questions.length > 0 ? (
        <FlatList
          data={questions}
          style={{ flex: 1, backgroundColor: '#000020' }}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <QuestionItem
              index={index}
              question={item}
              setCorrectCount={setCorrectCount}
              setIncorrectCount={setIncorrectCount}
              questions={questions}
              setQuestions={setQuestions}
              key={index}
            />
          )}
          ListFooterComponent={() => (
            <FormButton
              labelText='Submit'
              style={{ margin: 18, padding: 12 }}
              handleOnPress={() => {
                // Show Result modal
                setIsResultModalVisible(true)
              }}
            />
          )}
        />
      ) : (
        <Text style={[styles.text, { color: 'blue' }]}>
          The question list is empty.
        </Text>
      )}

      {/* Result Modal */}
      <ResultModal
        isModalVisible={isResultModalVisible}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        totalCount={questions.length}
        handleOnClose={() => {
          setIsResultModalVisible(false)
        }}
        handleRetry={() => {
          setCorrectCount(0)
          setIncorrectCount(0)
          getQuizAndQuestionDetails()
          setIsResultModalVisible(false)
        }}
        handleHome={() => {
          navigation.goBack()
          setIsResultModalVisible(false)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000020',
    elevation: 4,
  },
  text: { margin: 20, fontSize: 22, textAlign: 'center', color: 'white' },
  title: { fontSize: 18, marginLeft: 10, color: '#f4f4f4' },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  correctColor: { backgroundColor: '#00C851' },
  incorrectColor: { backgroundColor: '#ff4444' },
  white: { color: '#000020' },
  screenLeft: { marginLeft: 6 },
})
