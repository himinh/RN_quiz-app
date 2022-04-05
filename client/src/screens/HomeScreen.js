import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { axiosInstance } from '../utils/axiosInstance'
import { useSelector, useDispatch } from 'react-redux'
import { categoriesFilteredSelector } from '../redux/selector'
import { addCategories, filterCategories } from '../redux/actions'
import { Header, Search, CategoriesCard } from '../components'
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const categories = useSelector(categoriesFilteredSelector)
  const dispatch = useDispatch()

  const getCategories = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get('/categories')
      dispatch(addCategories(data))
      setLoading(false)
    } catch (error) {
      console.log({ error })
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleSearch = () => {
    dispatch(filterCategories(searchText))
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />
      {/* Search categories */}
      <Search
        text={searchText}
        setText={setSearchText}
        onSearch={handleSearch}
      />

      <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
        <View style={styles.buttonCategories}>
          <Text style={styles.buttonTextCt}>Categories</Text>

          <TouchableOpacity
            onPress={() => {
              dispatch(filterCategories(''))
              setSearchText('')
            }}
          >
            <Text style={styles.buttonTextV}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        // <SkeletonPlaceholder>
        //   <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
        // </SkeletonPlaceholder>
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          {/* List categories */}
          {categories.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <CategoriesCard navigation={navigation} category={item} />
              )}
            />
          ) : (
            <Text style={styles.text}>The categories list is empty.</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252c4a',
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonCategories: {
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonTextV: { fontSize: 18, fontWeight: 'bold', color: '#6E8AFA' },
  buttonTextCt: { fontSize: 20, color: 'white', fontWeight: 'bold' },
  text: { margin: 20, fontSize: 22, textAlign: 'center', color: 'white' },
})
