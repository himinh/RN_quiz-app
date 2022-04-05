import { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import { DataTable } from 'react-native-paper'
import { axiosInstance } from '../../utils/axiosInstance'
import { useSelector, useDispatch } from 'react-redux'
import { categoriesSelector } from '../../redux/selector'
import { addCategories } from '../../redux/actions'
import { DeleteModal } from '../DeleteModal'

const sliceText = (text, maxSize) =>
  text.length > maxSize ? text.slice(0, maxSize) + '...' : text

export const TableCategories = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const categories = useSelector(categoriesSelector)
  const dispatch = useDispatch()
  const fetchCategories = () => {
    axiosInstance
      .get('/categories')
      .then(({ data }) => dispatch(addCategories(data)))
      .catch(error => {
        const message = error?.response
          ? error?.response.data.message
          : error.message
        setError(message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    categories.length < 1 && fetchCategories()
  }, [categories.length])

  const [deleteCateg, setDeleteCateg] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleDelete = categId => {
    // Call API
    console.log({ categId })
  }

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{ backgroundColor: '#dfdfdf' }}>
            <DataTable.Cell>Title</DataTable.Cell>
            <DataTable.Cell>TotalQuiz</DataTable.Cell>
            <DataTable.Cell>Actions</DataTable.Cell>
          </DataTable.Header>
          {loading ? (
            <Text style={styles.text}>Loading...</Text>
          ) : error ? (
            <Text style={[styles.text, { color: 'red' }]}>{error}</Text>
          ) : categories.length > 0 ? (
            categories.map(categ => (
              <DataTable.Row key={categ.id}>
                <DataTable.Cell>{sliceText(categ.title, 6)}</DataTable.Cell>
                <DataTable.Cell>{categ.totalQuiz}</DataTable.Cell>
                <DataTable.Cell>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteCateg(categ)
                      setIsModalVisible(true)
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: 'red' }}>X</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <Text style={styles.text}>The categories list is empty.</Text>
          )}
        </DataTable>
      </ScrollView>

      <DeleteModal
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        item={deleteCateg}
        handleDelete={handleDelete}
        text='Delete Category: '
        title={deleteCateg?.title}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    maxHeight: 200,
  },
  text: { margin: 20, fontSize: 22, textAlign: 'center', color: 'black' },
})
