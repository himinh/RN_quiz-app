import React from 'react'
import { ImageBackground, Text, Dimensions, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const CategoriesCard = ({ category, navigation }) => {
  const handleNavigateQuiz = () => {
    navigation.navigate('QuizScreen', {
      categoryId: category.id,
      categoryTitle: category.title,
    })
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleNavigateQuiz}>
      <ImageBackground
        source={{
          uri: category.image,
        }}
        style={styles.imageBackground}
      >
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={{ color: '#ff428f', fontWeight: '600' }}>
          {category.totalQuiz + ' Quiz'}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    width: windowWidth / 2 - 30,
    height: windowHeight / 3,
    paddingTop: 18,
    paddingLeft: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  categoryTitle: {
    color: '#07234e',
    marginBottom: 4,
    fontSize: 14,
    fontWeight: 500,
  },
})
