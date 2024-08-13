import { Text, View } from '@/components'
import { useRouter } from 'expo-router'
import { Button, StyleSheet } from 'react-native'

export default function Home() {
  const router = useRouter()

  const handleGoToDetails = () => {
    router.push('/(stack)/details-1')
  }

  return (
    <View style={styles.main}>
      <Text>Home</Text>
      <Text variant="header">Home</Text>
      <Text variant="description">Home</Text>
      <Text variant="title">Home</Text>
      <Text variant="error">Home</Text>
      <Button title="go to details" onPress={handleGoToDetails} />
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
