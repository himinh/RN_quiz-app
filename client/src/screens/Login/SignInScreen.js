import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { View, Text, SafeAreaView } from 'react-native'
import { FormButton, FormInput } from '../../components/shared'
import { COLORS } from '../../constants/theme'

const loginSchema = yup
  .object({
    email: yup.string().email().required().label('Email'),
    password: yup.string().min(4).required().label('Password'),
  })
  .required()

export const SignInScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
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
        <Text>Don't have an account?</Text>
        <Text
          style={{ marginLeft: 4, color: COLORS.primary }}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          Create account
        </Text>
      </View>
    </SafeAreaView>
  )
}
