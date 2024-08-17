import { Toast } from '@/components'
import { Colors } from '@/constants/Colors'
import { errorAtom } from '@/jotai/atoms'
import '@/lang/i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function RootLayout() {
  // loading fonts is required
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
  })
  const [error, setError] = useAtom(errorAtom)

  useEffect(() => {
    // removing error after hiding toast with information
    setTimeout(() => setError(null), 3500)
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.main}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.background}
        />
        <Stack>
          <Stack.Screen name="(stack)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        {error && <Toast text={error} />}
      </SafeAreaView>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})
