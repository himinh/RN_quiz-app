import React, { useEffect } from 'react'
import { CategoriesCard } from '../../components'
import { View, FlatList, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
export const CategoriesScreen = ({ navigation, route }) => {
  const { search } = route.params
  console.log({ search })
  // const categories = useSelector(categoriesSelector)
  const categories = []
  const dispatch = useDispatch()

  const getCategories = async () => {
    const { data } = await axiosInstance.get('/categories')
    dispatch(addCategories(data))
  }

  useEffect(() => {
    if (categories.length < 0) {
      getCategories()
    }
  }, [categories.length])

  return (
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
        <Text> Not found category: {search} </Text>
      )}
    </View>
  )
}
