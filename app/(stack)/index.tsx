import { fetchMovies, fetchSearchedMovies } from '@/api'
import { PopularMovieItem } from '@/api/types'
import { Image, Rate, Search, Text, View } from '@/components'
import { Colors } from '@/constants/Colors'
import { searchedValueAtom } from '@/jotai/atoms'
import { FlashList } from '@shopify/flash-list'
import dayjs from 'dayjs'
import { useRouter } from 'expo-router'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
} from 'react-native'

const { width } = Dimensions.get('screen')

const PADDING = 20
const ITEM_HEIGHT = 256 + 56 + 32 + 16 // image + title + 2x description + margin

export default function Home() {
  const router = useRouter()
  const searchedValue = useAtomValue(searchedValueAtom)
  const { isFetching, data, hasNextPage, fetchNextPage } = fetchMovies()
  const {
    data: searchData,
    isFetching: isSearchFetching,
    refetch: searchRefetch,
    hasNextPage: searchHasNextPage,
    fetchNextPage: searchFetchNextPage,
  } = fetchSearchedMovies(searchedValue)

  const isLoading = isFetching || isSearchFetching

  const handleGoToDetails = (id: number) => {
    router.push(`/(stack)/${id}`)
  }

  const flattenedData = useMemo(() => {
    const dataToShow = searchedValue ? searchData?.pages : data?.pages

    return dataToShow?.flatMap((page) => page.data.results) ?? []
  }, [data, searchedValue, searchData])

  const fetchMore = async () => {
    if (searchedValue) {
      searchHasNextPage && (await searchFetchNextPage())
    } else {
      hasNextPage && (await fetchNextPage())
    }
  }

  const renderItem = ({ item }: { item: PopularMovieItem }) => {
    return (
      <Pressable
        key={item.id}
        style={styles.item}
        onPress={() => handleGoToDetails(item.id)}
      >
        <Image style={styles.image} source={item.poster_path} />
        <Rate rate={item.vote_average} variant="list" />
        <View style={styles.itemBottom}>
          <Text variant="title" numberOfLines={2}>
            {item.title}
          </Text>
          <Text variant="date">
            Release date{'\n'}
            {dayjs(item.release_date).format('DD MMM YYYY')}
          </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.main}>
      <View style={styles.search}>
        <Search refetch={searchRefetch} />
      </View>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator animating color={Colors.darkBlue} size="large" />
        </View>
      ) : (
        <>
          <Text style={{ margin: PADDING }} variant="header">
            {searchedValue && searchData
              ? `Searched for "${searchedValue}"`
              : 'Popular movies'}
          </Text>
          <FlashList
            data={flattenedData}
            renderItem={renderItem}
            estimatedItemSize={ITEM_HEIGHT}
            onEndReached={fetchMore}
            numColumns={2}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={
              <View>
                <Text>No results</Text>
              </View>
            }
            contentContainerStyle={{
              paddingHorizontal: PADDING,
            }}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 256,
    width: '100%',
  },
  itemBottom: {
    backgroundColor: Colors.darkBlue,
    padding: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  item: {
    height: ITEM_HEIGHT,
    width: (width - (PADDING * 2 + 16)) / 2,
    marginBottom: 16,
    marginLeft: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
})
