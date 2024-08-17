import { Colors } from '@/constants/Colors'
import { isArray } from 'lodash'
import { StyleSheet } from 'react-native'
import { Text } from './text'
interface SectionProps {
  title: string
  body: string | JSX.Element | string[]
}

export const Section = ({ body, title }: SectionProps) => {
  const getArrayElements = (array: string[]) =>
    array.map((item, index) => `${item}${index < array.length - 1 ? ', ' : ''}`)

  const renderBody = () => {
    if (typeof body === 'string') {
      return <Text variant="description">{body}</Text>
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
