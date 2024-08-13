import { View } from '@/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Button, StyleSheet, Text } from 'react-native'

export default function Details() {
  const { id } = useLocalSearchParams()

  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <View style={styles.main}>
      <Text>Menu: {id}</Text>
      <Button title="go back" onPress={handleGoBack} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
