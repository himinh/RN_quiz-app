import { FlatList } from 'react-native'
import { CategoryItem } from './CategoryItem'

export const Categories = ({ categories, term, setTerm }) => {
  return (
    <FlatList
      data={categories}
      renderItem={({ item, index }) => (
        <CategoryItem
          name={item.name}
          imageUrl={item.imageUrl}
          index={index}
          active={item.name === term}
          handlePress={() => setTerm(item.name)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={category => category.name}
    />
  )
}
