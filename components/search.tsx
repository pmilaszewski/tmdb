import { MoviePageData } from '@/api/types'
import { Colors } from '@/constants/Colors'
import { searchedValueAtom } from '@/jotai/atoms'
import { Ionicons } from '@expo/vector-icons'
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import type { TextInputProps } from 'react-native'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'

interface SearchProps extends TextInputProps {
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      InfiniteData<
        {
          data: MoviePageData
          nextPage: number | null
        },
        unknown
      >,
      Error
    >
  >
}

export const Search = ({ refetch, ...props }: SearchProps) => {
  const setSearchedValue = useSetAtom(searchedValueAtom)
  const [value, setValue] = useState('')

  const callApi = (searchedValue: string) => {
    console.log('call api', searchedValue)
    searchedValue !== '' && refetch()
    setSearchedValue(searchedValue)
  }

  // Added debounce to avoid calling api after every input value change
  const callApiHandler = useCallback(debounce(callApi, 1000), [])

  const onChangeText = (value: string) => {
    setValue(value)
  }

  useEffect(() => {
    callApiHandler(value)
  }, [value])

  return (
    <View>
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
      />
      {value && (
        <Pressable style={styles.clear} onPress={() => onChangeText('')}>
          <Ionicons name="close" size={20} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    fontSize: 16,
    color: Colors.darkBlue,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clear: {
    position: 'absolute',
    right: 1,
    top: 1,
    padding: 8,
  },
})

// export const Search = memo(_Search)
