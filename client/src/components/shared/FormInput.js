import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { COLORS } from '../../constants/theme'

export const FormInput = ({
  labelText = '',
  placeholderText = '',
  onChangeText = null,
  value = null,
  error = false,
  ...rest
}) => {
  return (
    <View style={{ width: '100%', marginBottom: 20 }}>
      <Text>{labelText}</Text>
      <TextInput
        style={{
          padding: 10,
          borderColor: !error ? COLORS.black + '20' : 'red',
          borderWidth: 1,
          width: '100%',
          borderRadius: 5,
          marginTop: 10,
        }}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
      {!!error && (
        <Text
          style={{
            fontSize: 12,
            color: 'red',
            marginTop: '4px',
            textAlign: 'left',
          }}
        >
          {error.message}
        </Text>
      )}
    </View>
  )
}
