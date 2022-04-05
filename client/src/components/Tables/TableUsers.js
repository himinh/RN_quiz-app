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
import { usersSelector } from '../../redux/selector'
import { getUsers, deleteUsersById } from '../../redux/actions'
import { DeleteModal } from '../DeleteModal'

const sliceText = (text, maxSize) =>
  text.length > maxSize ? text.slice(0, maxSize) + '...' : text

export const TableUsers = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { users } = useSelector(usersSelector)
  const dispatch = useDispatch()
  const fetchUsers = () => {
    axiosInstance
      .get('/users')
      .then(({ data }) => dispatch(getUsers(data)))
      .catch(error => {
        const message = error?.response
          ? error?.response.data.message
          : error.message
        setError(message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    users.length < 1 && fetchUsers()
  }, [users.length])

  const [deleteUser, setDeleteUser] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleDelete = userId => {
    axiosInstance
      .delete(`/users/${userId}`)
      .then(() => dispatch(deleteUsersById(userId)))
      .catch(error => {
        const message = error?.response
          ? error?.response.data.message
          : error.message
        setError(message)
      })
      .finally(() => setLoading(false))
    // Call API
  }
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{ backgroundColor: '#dfdfdf' }}>
            <DataTable.Cell>Name</DataTable.Cell>
            <DataTable.Cell>Email</DataTable.Cell>
            <DataTable.Cell>Role</DataTable.Cell>
            <DataTable.Cell>Actions</DataTable.Cell>
          </DataTable.Header>
          {loading ? (
            <Text style={styles.text}>Loading...</Text>
          ) : error ? (
            <Text style={[styles.text, { color: 'red' }]}>{error}</Text>
          ) : users.length > 0 ? (
            users.map(user => (
              <DataTable.Row key={user.id}>
                <DataTable.Cell>{sliceText(user.name, 5)}</DataTable.Cell>
                <DataTable.Cell>{sliceText(user.email, 5)}</DataTable.Cell>
                <DataTable.Cell>{user.role}</DataTable.Cell>
                <DataTable.Cell>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteUser(user)
                      setIsModalVisible(true)
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: 'red' }}>X</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <Text style={styles.text}>The users list is empty.</Text>
          )}
        </DataTable>
      </ScrollView>

      <DeleteModal
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        item={deleteUser}
        handleDelete={handleDelete}
        text='Delete User: '
        title={deleteUser?.name}
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
