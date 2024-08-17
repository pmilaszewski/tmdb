import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Text } from './text'

const toastDuration = 3000
const animationDuration = 500

type ToastProps = {
  text?: string
}

const DEFAULT_VALUE = 'Ooops! Something went wrong!'

export const Toast = ({ text = DEFAULT_VALUE }: ToastProps) => {
  const [isActive, setIsActive] = useState(false)
  const margin = useSharedValue(-100)

  const animatedStyle = useAnimatedStyle(() => ({
    bottom: margin.value,
  }))

  const show = () => {
    setIsActive(true)
    margin.value = withTiming(56, { duration: animationDuration })
  }

  const hide = () => {
    setIsActive(false)
    margin.value = withTiming(-100, { duration: animationDuration })
  }

  useEffect(() => {
    show()

    return () => {
      hide()
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      setTimeout(hide, toastDuration)
    }
  }, [isActive])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Ionicons
        name="alert"
        color={Colors.red}
        size={16}
        style={{ marginRight: 8 }}
      />
      <Text variant="error">{text}</Text>
    </Animated.View>
  )
}

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    zIndex: 999,
    backgroundColor: Colors.white,
    position: 'absolute',
    flexDirection: 'row',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
