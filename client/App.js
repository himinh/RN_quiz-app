import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStackNavigator, AppStackNavigator } from './src/navigators'
import { Provider, useSelector } from 'react-redux'
import { store } from './src/redux/store'
import { authSelector } from './src/redux/selector'

const App = () => {
  const { token } = useSelector(authSelector)
  return (
    <NavigationContainer>
      {token ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
