import { Image, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../constants/theme'

export const QuestionItem = ({
  item,
  index,
  correctCount,
  setCorrectCount,
  incorrectCount,
  setIncorrectCount,
  setQuestions,
  getOptionBgColor,
  getOptionTextColor,
  questions,
}) => {
  console.log({ item })
  return (
    <View
      style={{
        marginTop: 14,
        marginHorizontal: 10,
        backgroundColor: COLORS.secondary,
        elevation: 2,
        borderRadius: 2,
      }}
    >
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 26, color: COLORS.background }}>
          {index + 1}. {item.question}
        </Text>
        {item.image ? (
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode={'contain'}
            style={{
              width: '80%',
              height: 200,
              marginTop: 15,
              marginLeft: '10%',
              borderRadius: 5,
            }}
          />
        ) : null}
      </View>
      {/* Options */}
      {item.allOptions.map((option, optionIndex) => {
        return (
          <TouchableOpacity
            key={optionIndex}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              marginTop: 12,
              borderRadius: 15,
              borderTopWidth: 1,
              backgroundColor: getOptionBgColor(item, option) + '20',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
            onPress={() => {
              if (item.selectedOption) {
                return null
              }
              // Increase correct/incorrect count
              if (option == item.correctAnswer) {
                setCorrectCount(correctCount + 1)
              } else {
                setIncorrectCount(incorrectCount + 1)
              }

              let tempQuestions = [...questions]
              tempQuestions[index].selectedOption = option
              setQuestions([...tempQuestions])
            }}
          >
            <Text
              style={{
                width: 25,
                height: 25,
                padding: 2,
                borderWidth: 1,
                borderColor: COLORS.background,
                textAlign: 'center',
                marginRight: 16,
                borderRadius: 25,
                color: COLORS.background,
              }}
            >
              {optionIndex + 1}
            </Text>
            <Text style={{ color: COLORS.background }}>{option}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
