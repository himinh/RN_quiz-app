import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export const FormButton = ({
  labelText = '',
  handleOnPress = null,
  style,
  isPrimary = true,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        backgroundColor: isPrimary ? '#4630EB' : '#fff',
        borderWidth: 1,
        borderColor: '#4630EB',
        borderRadius: 5,
        ...style,
      }}
      activeOpacity={0.9}
      onPress={handleOnPress}
      {...rest}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: isPrimary ? '#fff' : '#4630EB',
        }}
      >
        {labelText}
      </Text>
    </TouchableOpacity>
  )
}
