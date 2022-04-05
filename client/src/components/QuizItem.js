import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export const QuizItem = ({ quiz, navigation }) => {
  return (
    <View style={styles.quizContainer}>
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        {quiz.description != '' ? (
          <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.buttonPlay}
        onPress={() => {
          navigation.navigate('PlayQuizScreen', {
            quizId: quiz.id,
          })
        }}
      >
        <FontAwesome name='play' size={17} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  quizContainer: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 2,
  },
  buttonPlay: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#49CC96',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizTitle: { fontSize: 18, color: '#171717', fontWeight: 'bold' },
})
