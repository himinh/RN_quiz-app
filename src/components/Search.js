import { View, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { elevation } from '../common/styles'

export const Search = ({ setTerm }) => {
  const [input, setInput] = useState('')

  const handleEndEditing = () => {
    if (!input) return
    setTerm(input)
  }

  return (
    <View style={[styles.container, styles.elevation]}>
      <FontAwesome name='search' size={25} />
      <TextInput
        onChangeText={text => setInput(text)}
        style={styles.input}
        placeholder='Restaurants, food'
        onEndEditing={handleEndEditing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 25,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 40,
  },
  elevation,
  input: {
    fontSize: 20,
    marginLeft: 10,
  },
})
