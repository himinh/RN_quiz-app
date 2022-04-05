import React from 'react'
import { View, Text, TextInput } from 'react-native'

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
      <Text
        style={{
          fontSize: 16,
        }}
      >
        {labelText}
      </Text>
      <TextInput
        style={{
          padding: 10,
          borderColor: !error ? '#d3d3d3' : 'red',
          borderWidth: 1,
          width: '100%',
          borderRadius: 5,
          marginTop: 10,
          fontSize: 16,
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
