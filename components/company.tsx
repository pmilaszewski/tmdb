import { Dimensions, StyleSheet } from 'react-native'
import { Image } from './image'
import { Text } from './text'
import { View } from './view'

interface CompanyProps {
  name: string
  logo: string
}

const { width } = Dimensions.get('screen')

export const Company = ({ name, logo }: CompanyProps) => {
  return (
    <View style={styles.main}>
      <Image
        style={styles.image}
        source={logo}
        contentFit="scale-down"
        alt={name}
      />
      <Text style={{ textAlign: 'center' }}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: width / 2 - 20,
    marginBottom: 16,
  },
  image: {
    width: 'auto',
    height: 64,
  },
})
