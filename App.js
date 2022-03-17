import 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStackNavigator } from './src/navigators/AuthStackNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  )
}
