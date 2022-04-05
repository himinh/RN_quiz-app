import { createStackNavigator } from '@react-navigation/stack'
import {
  AddQuestionScreen,
  AdminScreen,
  CreateQuizScreen,
  HomeScreen,
  PlayQuizScreen,
  QuizScreen,
} from '../screens'

const Stack = createStackNavigator()

export const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='AdminScreen' component={AdminScreen} />
      <Stack.Screen name='QuizScreen' component={QuizScreen} />
      <Stack.Screen name='CreateQuizScreen' component={CreateQuizScreen} />
      <Stack.Screen name='AddQuestionScreen' component={AddQuestionScreen} />
      <Stack.Screen name='PlayQuizScreen' component={PlayQuizScreen} />
    </Stack.Navigator>
  )
}
