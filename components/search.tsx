import { MoviePageData } from '@/api/types'
import { Colors } from '@/constants/Colors'
import { searchedValueAtom } from '@/jotai/atoms'
import { Ionicons } from '@expo/vector-icons'
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'
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
  const [value, setValue] = useState('')
  const setSearchedValue = useSetAtom(searchedValueAtom)

  const callApi = async (value: string) => {
    value !== '' && (await refetch())
  }

  // Added debounce to avoid calling api after every input value change
  const handleCallApi = useCallback(debounce(callApi, 500), [])
  const handleChangeFetchedValue = useCallback(
    debounce(setSearchedValue, 400),
    [],
  )

  const onChangeText = (value: string) => {
    setValue(value)
    handleChangeFetchedValue(value)
    handleCallApi(value)
  }

  return (
    <View>
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={t('search.placeholder')}
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
