import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { FormButton, FormInput } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { authSelector } from '../../redux/selector'
import { axiosInstance } from '../../utils/axiosInstance'
import { createQuiz } from '../../redux/actions'
import * as Animatable from 'react-native-animatable'

const quizSchema = yup.object({
  title: yup.string().required().label('Title'),
  description: yup.string().label('Descriptionn'),
})
const defaultValues = {
  title: '',
  description: '',
}
export const CreateQuizScreen = ({ navigation, route }) => {
  const { categoryId, categoryTitle } = route.params
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(quizSchema) })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { token } = useSelector(authSelector)
  const dispatch = useDispatch()
  const onQuizSave = async quizData => {
    try {
      setLoading(true)
      // Call api create quiz
      const { data } = await axiosInstance.post(
        '/quizzes',
        { ...quizData, category: categoryId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      // dispatch create quiz action
      dispatch(createQuiz(data))

      // Navige add question screen
      navigation.navigate('AddQuestionScreen', {
        quizId: data.id,
        quizTitle: data.title,
      })
      setLoading(false)
    } catch (error) {
      const message = error?.response
        ? error?.response.data.message
        : error.message
      setError(message)
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.text_header_sm}>
          New Quiz
          <Text style={styles.text_header}>{categoryTitle}!</Text>
        </Text>
      </View>
      <Animatable.View
        animation='fadeInUpBig'
        style={[styles.footer, { backgroundColor: 'white' }]}
      >
        <View style={styles.action}>
          {/* Error message */}
          {!!error && <Text style={styles.error}>{error}</Text>}

          {/* Title */}
          <Controller
            control={control}
            name='title'
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                labelText='Title'
                placeholderText='Enter quiz title'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.title}
              />
            )}
          />

          {/* Description */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                labelText='Description'
                placeholderText='Enter quiz description'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.description}
              />
            )}
            name='description'
          />
        </View>

        {/* Submit button */}
        <FormButton
          labelText='Save Quiz'
          type='submit'
          handleOnPress={handleSubmit(onQuizSave)}
          style={{ width: '100%' }}
        />

        <FormButton
          labelText='Go Back'
          isPrimary={false}
          handleOnPress={() => {
            navigation.goBack()
          }}
          style={{
            marginVertical: 20,
          }}
        />
      </Animatable.View>
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
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginTop: 10,
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
})
