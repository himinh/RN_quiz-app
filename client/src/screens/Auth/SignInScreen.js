import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { FormButton, FormInput } from '../../components'
import { axiosInstance } from '../../utils/axiosInstance'
import { login } from '../../redux/actions'
import { useState } from 'react'
import * as Animatable from 'react-native-animatable'

const loginSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(4).required().label('Password'),
})
const defaultValues = {
  email: '',
  password: '',
}

export const SignInScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(loginSchema) })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.post('/auth/login', {
        email,
        password,
      })
      dispatch(login(data))
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
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation='fadeInUpBig'
        style={[styles.footer, { backgroundColor: 'white' }]}
      >
        <View style={styles.action}>
          {/* Error message */}
          {!!error && <Text style={styles.error}>{error}</Text>}

          {/* Email */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                labelText='Email'
                placeholderText='Enter your email'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.email}
              />
            )}
            name='email'
          />

          {/* Password */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                labelText='Password'
                placeholderText='Enter password'
                value={value}
                onBlur={onBlur}
                secureTextEntry={true}
                onChangeText={onChange}
                error={errors.password}
              />
            )}
            name='password'
          />
        </View>

        {/* Submit button */}
        <FormButton
          labelText='Sign In'
          type='submit'
          handleOnPress={handleSubmit(onSubmit)}
          style={{ width: '100%' }}
        />

        {/* Footer */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}
        >
          <Text>Don't have an account?</Text>
          <Text
            style={{ marginLeft: 4, color: '#4630EB' }}
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            Create account
          </Text>
        </View>
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
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
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
