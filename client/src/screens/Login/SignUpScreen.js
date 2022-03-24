import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { View, Text, SafeAreaView } from 'react-native'
import { FormButton, FormInput } from '../../components/shared'
import { COLORS } from '../../constants/theme'

const registerSchema = yup
  .object({
    name: yup.string().required().label('Name'),
    email: yup.string().email().required().label('Email'),
    password: yup.string().min(4).required().label('Password'),
  })
  .required()

export const SignUpScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontWeight: 'bold',
          marginVertical: 32,
          textAlign: 'center',
        }}
      >
        Sign In
      </Text>

      {/* Email */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            labelText='Full Name'
            placeholderText='Enter your name'
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.name}
          />
        )}
        name='email'
      />

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
        <Text>Already have an account?</Text>
        <Text
          style={{ marginLeft: 4, color: COLORS.primary }}
          onPress={() => navigation.navigate('SignInScreen')}
        >
          Login
        </Text>
      </View>
    </SafeAreaView>
  )
}
