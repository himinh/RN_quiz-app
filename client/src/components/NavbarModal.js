import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  logout,
  clearCategories,
  clearQuizzes,
  clearUsers,
} from '../redux/actions'
import { authSelector } from '../redux/selector'
import { axiosInstance } from '../utils/axiosInstance'

export const NavbarModal = ({ navigation }) => {
  const dispatch = useDispatch()
  const { token, user } = useSelector(authSelector)

  const signOut = async () => {
    await axiosInstance.post(
      '/auth/logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    dispatch(logout())
    dispatch(clearCategories())
    dispatch(clearUsers())
    dispatch(clearQuizzes())
  }
  return (
    <View style={styles.navbarModalContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AdminScreen')}
        style={styles.navbarOption}
        disabled={user.role !== 'Admin'}
      >
        <Text>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signOut} style={styles.navbarOption}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  navbarModalContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    paddingVertical: 12,
    zIndex: 100,
  },
  navbarOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#F5F5F7',
  },
})
