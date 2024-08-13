import { Colors } from '@/constants/Colors'
import type { ViewProps } from 'react-native'
import { View as RNView, StyleSheet } from 'react-native'

export const View = (props: ViewProps) => {
  return (
    <RNView {...props} style={[styles.main, props.style]}>
      {props.children}
    </RNView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background,
  },
})
