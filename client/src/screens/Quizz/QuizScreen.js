import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { axiosInstance } from '../../utils/axiosInstance'
import { Header } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, quizzesSelector } from '../../redux/selector'
import { addQuizzes } from '../../redux/actions'
import { QuizItem } from '../../components'
import banner from '../../../assets/images/banner.png'

export const QuizScreen = ({ navigation, route }) => {
  const { user } = useSelector(authSelector)
  const { categoryId, categoryTitle } = route.params
  const quizzes = useSelector(quizzesSelector)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const getAllQuizzesByCategory = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(
        `/quizzes?category=${categoryId}`
      )
      dispatch(addQuizzes(data))
      setLoading(false)
    } catch (error) {
      const message = error?.response
        ? error?.response.data.message
        : error.message
      setError(message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllQuizzesByCategory()
  }, [categoryId, dispatch])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle={'dark-content'} />

      {/* Header */}
      <Header navigation={navigation} text={categoryTitle} />

      {/* Banner */}
      <View style={styles.banner}>
        <Image source={banner} style={{ width: 250, height: 250 }} />
      </View>

      {/* Body */}
      {!!error ? (
        <>
          {/* Error message */}
          <Text style={styles.error}>{error}</Text>
        </>
      ) : loading ? (
        <Text style={styles.text}>loading...</Text>
      ) : quizzes.length > 0 ? (
        <View style={styles.itemsContainer}>
          {/* Quizzes list */}
          <FlatList
            data={quizzes}
            showsVerticalScrollIndicator={true}
            style={{
              paddingVertical: 20,
            }}
            renderItem={({ item, index }) => (
              <View style={styles.quizItems}>
                {/* STT */}
                <View>
                  {index < 9 ? (
                    <Text style={styles.number}>{'0' + (index + 1)}</Text>
                  ) : (
                    <Text style={styles.number}>{index + 1}</Text>
                  )}
                </View>
                {/* Quiz Item */}
                <View style={{ flex: 1 }}>
                  <QuizItem quiz={item} navigation={navigation} />
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <Text style={styles.text}>The quizzes list is empty.</Text>
      )}

      {/* Button New  */}
      {user?.role === 'Admin' && (
        <AntDesign
          style={styles.buttonCreate}
          name='pluscircleo'
          size={35}
          color={'#49CC96'}
          onPress={() => {
            navigation.navigate('CreateQuizScreen', {
              categoryId: categoryId,
              categoryTitle: categoryTitle,
            })
          }}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252c4a',
    position: 'relative',
  },
  navbarContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textLogo: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  avatar: { width: 40, height: 40, borderRadius: 50 },
  banner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
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
  itemsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
  },
  text: { margin: 20, fontSize: 22, textAlign: 'center', color: 'white' },
  buttonCreate: {
    position: 'fixed',
    bottom: 40,
    left: 10,
    borderRadius: 50,
  },
  itemTitle: {
    marginVertical: 10,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  number: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E4E7F4',
  },
})
