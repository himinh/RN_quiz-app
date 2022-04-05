import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  Header,
  TableUsers,
  TableCategories,
  TableQuizzes,
} from '../../components'

export const AdminScreen = ({ navigation, route }) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header text='Admin - Managers' navigation={navigation} />

        {/* Users */}
        <View style={{ margin: 12, marginTop: 20 }}>
          <Text style={styles.title}>Users</Text>
          <TableUsers />
        </View>

        {/* Quizzes */}
        <View style={{ margin: 12 }}>
          <Text style={styles.title}>Quizzes</Text>
          <TableQuizzes />
        </View>

        {/* Categories */}
        <View style={{ margin: 12 }}>
          <Text style={styles.title}>Categories</Text>
          <TableCategories />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252c4a',
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 'bold',
    color: 'white',
  },
})
