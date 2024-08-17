import { Colors } from '@/constants/Colors'
import { isArray } from 'lodash'
import { Linking, StyleSheet } from 'react-native'
import { Text } from './text'
interface SectionProps {
  title: string
  body: string | JSX.Element | string[]
  link?: boolean
}

export const Section = ({ body, title, link }: SectionProps) => {
  const getArrayElements = (array: string[]) =>
    array.map((item, index) => `${item}${index < array.length - 1 ? ', ' : ''}`)

  const onPressLink = async () => {
    if (await Linking.canOpenURL(body as string)) {
      await Linking.openURL(body as string)
    }
  }

  const renderBody = () => {
    if (typeof body === 'string') {
      return (
        <Text
          variant={link ? 'link' : 'description'}
          onPress={link ? onPressLink : undefined}
        >
          {body}
        </Text>
      )
    } else if (isArray(body)) {
      return <Text variant="description">{getArrayElements(body)}</Text>
    } else {
      return body
    }
  }

  return (
    <>
      <Text variant="title" style={styles.title}>
        {title}
      </Text>
      {renderBody()}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    color: Colors.text,
    marginBottom: 8,
  },
})
