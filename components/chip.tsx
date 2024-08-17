import { Colors } from '@/constants/Colors'
import { StyleSheet, View } from 'react-native'
import { Text } from './text'

interface ChipProps {
  value: string
  index: number
}

export const Chip = ({ value, index }: ChipProps) => {
  return (
    <View style={styles(index).main}>
      <Text>{value}</Text>
    </View>
  )
}

const styles = (index: number) =>
  StyleSheet.create({
    main: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      backgroundColor: index % 2 === 0 ? Colors.lightBlue : Colors.lightGreen,
      borderRadius: 100,
      marginRight: 8,
      marginTop: 8,
    },
  })
