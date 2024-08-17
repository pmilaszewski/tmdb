import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import type { TextProps, ViewProps } from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from './text'
import { View } from './view'

interface RateProps {
  rate: number
  variant: 'list' | 'details'
}

export const Rate = ({ rate, variant }: RateProps) => {
  return (
    <View style={styles[`${variant}Stars`]}>
      <Ionicons
        name="star"
        style={styles[`${variant}Icon`]}
        size={variant === 'details' ? 24 : 16}
      />
      <Text style={styles[`${variant}CustomRateText`]}>{rate.toFixed(1)}</Text>
    </View>
  )
}

const iconBase: TextProps['style'] = {
  color: Colors.lightBlue,
  marginRight: 4,
}
const starsBase: ViewProps['style'] = {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  borderTopLeftRadius: 8,
}

const styles = StyleSheet.create({
  detailsStars: {
    ...starsBase,
    top: 224,
    padding: 4,
  },
  detailsIcon: {
    ...iconBase,
    marginTop: -2,
  },
  detailsCustomRateText: {
    fontSize: 24,
    lineHeight: 24,
    marginTop: 4,
    marginRight: 8,
  },
  listStars: {
    ...starsBase,
    top: 232,
    padding: 2,
  },
  listIcon: {
    ...iconBase,
  },
  listCustomRateText: {},
})
