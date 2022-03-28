import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { FormButton, FormInput } from '../../components'
import { axiosInstance } from '../../utils/axiosInstance'
import * as Animatable from 'react-native-animatable'

const questionSchema = yup.object({
  question: yup.string().required().label('Question'),
  correctAnswer: yup.string().required().label('Correct answer'),
  optionOne: yup.string().label('Option 1').required(),
  optionTwo: yup.string().label('Option 2'),
  optionThree: yup.string().label('Option 3'),
})

const defaultValues = {
  question: '',
  correctAnswer: '',
  optionOne: '',
  optionTwo: '',
  optionThree: '',
}

export const AddQuestionScreen = ({ navigation, route }) => {
  const [quizId, setQuizId] = useState(route.params.quizId)
  const quizTitle = route.params.quizTitle
  const [count, setCount] = useState(0)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues, resolver: yupResolver(questionSchema) })
  const [imageUri, setImageUri] = useState('')

  const [error, setError] = useState(false)

  const onQuestionSave = async ({ question, correctAnswer, ...options }) => {
    try {
      const { optionOne, optionTwo, optionThree } = options
      // Call api create quiz
      await axiosInstance.post('/questions', {
        quiz: quizId,
        question,
        correctAnswer,
        incorrectAnswers: [optionOne, optionTwo, optionThree],
        image: imageUri,
      })

      // Reset data
      setImageUri('')
      reset()
      setCount(prevCount => prevCount + 1)
      if (error) setError('')
    } catch (error) {
      const message = error?.response
        ? error?.response.data.message
        : error.message
      setError(message)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImageUri(result.uri)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.text_header_sm}>
          Create questions for{' '}
          <Text style={styles.text_header}>{quizTitle}!</Text>!
        </Text>
      </View>
      <ScrollView>
        {/* Form Container */}
        <Animatable.View
          animation='fadeInUpBig'
          style={[styles.footer, { backgroundColor: 'white' }]}
        >
          {/* Form input */}
          <View style={styles.action}>
            <Text style={{ textAlign: 'center', marginBottom: 4 }}>
              Number of questions created: {'  '}
              <Text style={{ color: 'blue', fontSize: 18, fontWeight: 'bold' }}>
                {count}
              </Text>
            </Text>

            {/* Error message */}
            {!!error && <Text style={styles.error}>{error}</Text>}

            {/* Question */}
            <Controller
              control={control}
              name='question'
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  labelText='Question'
                  placeholderText='Enter question'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.question}
                />
              )}
            />

            {/* Add or preview image */}
            {imageUri == '' ? (
              <TouchableOpacity
                style={styles.buttonAddImage}
                onPress={pickImage}
              >
                <Text style={styles.textAddImage}>+ add image</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonAddImage}
                onPress={pickImage}
              >
                <Image
                  source={{ uri: imageUri }}
                  resizeMode={'cover'}
                  style={styles.previewImage}
                />
              </TouchableOpacity>
            )}

            {/* Correct answer */}
            <Controller
              control={control}
              name='correctAnswer'
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  labelText='Correct Answer'
                  placeholderText='Enter correct answer'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.correctAnswer}
                />
              )}
            />

            {/* Option 1 */}
            <Controller
              control={control}
              name='optionOne'
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  labelText='Option 1'
                  placeholderText='Enter option 1'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.optionOne}
                />
              )}
            />

            {/* Option 1 */}
            <Controller
              control={control}
              name='optionTwo'
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  labelText='Option 2'
                  placeholderText='Enter option 2'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.optionTwo}
                />
              )}
            />

            {/* Option 3 */}
            <Controller
              control={control}
              name='optionThree'
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  labelText='Option 3'
                  placeholderText='Enter option 3'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.optionThree}
                />
              )}
            />
          </View>

          {/* Submit button */}
          <FormButton
            labelText='Save Question'
            type='submit'
            handleOnPress={handleSubmit(onQuestionSave)}
            style={{ width: '100%' }}
          />

          <FormButton
            labelText='Done & Go Home'
            isPrimary={false}
            disabled={count === 0}
            handleOnPress={() => {
              setQuizId('')
              navigation.navigate('HomeScreen')
            }}
            style={{
              marginVertical: 20,
            }}
          />
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252c4a',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header_sm: {
    color: 'rgb(195,195,195)',
    fontSize: 26,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 8,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    marginBottom: 12,
    padding: 3,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 0, 67, 0.55)',
  },
  buttonAddImage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '#4630EB' + '20',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  textAddImage: { opacity: 0.5, color: '#4630EB' },
})
