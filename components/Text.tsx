import { Colors } from '@/constants/Colors'
import type { TextProps } from 'react-native'
import { Text as RNText, StyleSheet } from 'react-native'

interface CustomTextProps extends TextProps {
  variant?: 'default' | 'header' | 'title' | 'description' | 'error' | 'date'
}

export const Text = ({ variant = 'default', ...props }: CustomTextProps) => (
  <RNText {...props} style={[styles[variant], props.style]}>
    {props.children}
  </RNText>
)

const base: TextProps['style'] = {}

const styles = StyleSheet.create({
  default: {
    ...base,
    color: Colors.text,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 20,
  },
  header: {
    ...base,
    color: Colors.darkBlue,
    fontSize: 24,
    fontFamily: 'Montserrat-Black',
    lineHeight: 28,
  },
  title: {
    ...base,
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    lineHeight: 24,
  },
  description: {
    ...base,
    color: Colors.darkBlue,
    fontSize: 16,
    fontFamily: 'Montserrat-Italic',
    lineHeight: 20,
  },
  date: {
    ...base,
    color: Colors.lightBlue,
    fontSize: 12,
    fontFamily: 'Montserrat-Italic',
    lineHeight: 16,
  },
  error: {
    ...base,
    color: Colors.red,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 16,
  },
})
