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
import { quizzesSelector } from '../../redux/selector'
import { addQuizzes, deleteQuizById } from '../../redux/actions'
import { DeleteModal } from '../DeleteModal'

export const TableQuizzes = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const quizzes = useSelector(quizzesSelector)
  const dispatch = useDispatch()

  const fetchQuizzes = () => {
    axiosInstance
      .get('/quizzes')
      .then(({ data }) => dispatch(addQuizzes(data)))
      .catch(error => {
        const message = error?.response
          ? error?.response.data.message
          : error.message
        setError(message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    quizzes.length < 1 && fetchQuizzes()
  }, [quizzes.length])

  // Delete
  const [deleteQuiz, setDeleteId] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleDelete = quizId => {
    axiosInstance
      .delete(`/quizzes/${quizId}`)
      .then(() => dispatch(deleteQuizById(quizId)))
      .catch(error => {
        const message = error?.response
          ? error?.response.data.message
          : error.message
        setError(message)
      })
      .finally(() => setLoading(false))
    // Call API
  }

  console.log({ quizzes })

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{ backgroundColor: '#dfdfdf' }}>
            <DataTable.Cell>#</DataTable.Cell>
            <DataTable.Cell>Title</DataTable.Cell>
            <DataTable.Cell>Actions</DataTable.Cell>
          </DataTable.Header>
          {loading ? (
            <Text style={styles.text}>Loading...</Text>
          ) : error ? (
            <Text style={[styles.text, { color: 'red' }]}>{error}</Text>
          ) : quizzes.length > 0 ? (
            quizzes.map(quiz => (
              <DataTable.Row key={quiz.id}>
                <DataTable.Cell>{quiz.id}</DataTable.Cell>
                <DataTable.Cell>{quiz.title}</DataTable.Cell>
                <DataTable.Cell>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(!isModalVisible)
                      setDeleteId(quiz)
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: 'red' }}>X</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <Text style={[styles.text, { color: 'blue' }]}>
              The quizzes list is empty.
            </Text>
          )}
        </DataTable>
      </ScrollView>
      <DeleteModal
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        item={deleteQuiz}
        handleDelete={handleDelete}
        text='Delete Quiz: '
        title={deleteQuiz?.title}
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
  text: { margin: 20, fontSize: 16, textAlign: 'center', color: 'black' },
})
