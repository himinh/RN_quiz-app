import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { COLORS } from '../../constants/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FormButton, QuestionItem, ResultModal } from '../../components'
import { axiosInstance } from '../../utils/axiosInstance'

const getOptionBgColor = (currentQuestion, currentOption) => {
  console.log({ currentQuestion, currentOption })
  if (currentQuestion.selectedOption) {
    if (currentOption == currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.correctAnswer) {
        return COLORS.success
      } else {
        return COLORS.error
      }
    } else {
      return COLORS.white
    }
  } else {
    return COLORS.white
  }
}

const getOptionTextColor = (currentQuestion, currentOption) => {
  if (currentQuestion.selectedOption) {
    if (currentOption == currentQuestion.selectedOption) {
      return COLORS.white
    } else {
      return COLORS.black
    }
  } else {
    return COLORS.black
  }
}

export const PlayQuizScreen = ({ navigation, route }) => {
  const [quizId, setQuizId] = useState(route.params.quizId)
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [isResultModalVisible, setIsResultModalVisible] = useState(false)

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate random number
      let j = Math.floor(Math.random() * (i + 1))

      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  const getQuizAndQuestionDetails = async () => {
    let getQuiz = axiosInstance.get(`/quizzes/${quizId}`)
    const getQuestionByQuiz = axiosInstance.get(`/questions?quiz=${quizId}`)

    try {
      const [{ data: quizData }, { data: questionData }] = await Promise.all([
        getQuiz,
        getQuestionByQuiz,
      ])
      setTitle(quizData.title)
      console.log(questionData)
      // Transform and shuffle options
      let tempQuestions = []
      questionData.forEach(question => {
        // Create Single array of all options and shuffle it
        question.allOptions = shuffleArray([
          ...question.incorrectAnswers,
          question.correctAnswer,
        ])
        tempQuestions.push(question)
      })
      setQuestions(tempQuestions)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    getQuizAndQuestionDetails()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {/* Top Bar */}
      <View style={styles.topBarContainer}>
        {/* Back Icon */}
        <MaterialIcons
          name='arrow-back'
          size={24}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Correct and incorrect count */}
        <View style={styles.countContainer}>
          {/* Correct */}
          <View style={[styles.resultContainer, styles.correctColor]}>
            <MaterialIcons name='check' size={14} style={styles.white} />
            <Text style={[styles.white, styles.spaceLeft]}>
              {correctCount}'
            </Text>
          </View>

          {/* Incorrect */}
          <View style={[styles.resultContainer, styles.incorrectColor]}>
            <MaterialIcons name='close' size={14} style={styles.white} />
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
          style={{
            flex: 1,
            backgroundColor: COLORS.secondary,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <QuestionItem
              index={index}
              item={item}
              correctCount={correctCount}
              setCorrectCount={setCorrectCount}
              incorrectCount={incorrectCount}
              setIncorrectCount={setIncorrectCount}
              getOptionBgColor={getOptionBgColor}
              getOptionTextColor={getOptionTextColor}
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
        <Text style={styles.text}>The question list is empty.</Text>
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
    backgroundColor: COLORS.secondary,
    elevation: 4,
    minHeight: 300,
  },
  text: { margin: 20, fontSize: 22, textAlign: 'center', color: 'white' },
  title: { fontSize: 22, marginLeft: 10, color: COLORS.background },
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
  correctColor: { backgroundColor: COLORS.success },
  incorrectColor: { backgroundColor: COLORS.error },
  white: { color: COLORS.secondary },
  screenLeft: { marginLeft: 6 },
})
