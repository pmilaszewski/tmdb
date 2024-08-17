import { fetchMovies, fetchSearchedMovies } from '@/api'
import { PopularMovieItem } from '@/api/types'
import { Search, Text, View } from '@/components'
import { Colors } from '@/constants/Colors'
import { searchedValueAtom } from '@/jotai/atoms'
import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import dayjs from 'dayjs'
import { useRouter } from 'expo-router'
import { useAtomValue } from 'jotai'
import { useEffect, useMemo } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
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
    const dataToShow =
      searchedValue && searchData?.pages[0].data.results
        ? searchData?.pages
        : data?.pages

    return dataToShow?.flatMap((page) => page.data.results) ?? []
  }, [data, searchedValue, searchData])

  const fetchMore = async () => {
    if (searchedValue) {
      searchHasNextPage && (await searchFetchNextPage())
    } else {
      hasNextPage && (await fetchNextPage())
    }
  }

  useEffect(() => {
    console.log('item', flattenedData[0])
    console.log('final data len: ', flattenedData.length)
  }, [flattenedData])

  const renderItem = ({ item }: { item: PopularMovieItem }) => {
    return (
      <Pressable
        key={item.id}
        style={styles.item}
        onPress={() => handleGoToDetails(item.id)}
      >
        <Image
          style={styles.image}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_IMAGES_URL}${item.poster_path}`,
          }}
        />
        <View style={styles.stars}>
          <Ionicons name="star" style={styles.icon} size={16} />
          <Text>{item.vote_average.toFixed(1)}</Text>
        </View>
        <View style={styles.itemBottom}>
          <Text variant="title" numberOfLines={2}>
            {item.original_title}
          </Text>
          <Text variant="description">
            Release date{'\n'}
            {dayjs(item.release_date).format('DD MMM YYYY')}
          </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.main}>
      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Search refetch={searchRefetch} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ margin: PADDING }} variant="header">
          {searchedValue && searchData
            ? `Searched for "${searchedValue}"`
            : 'Popular movies'}
        </Text>
        {isLoading && <ActivityIndicator animating color={Colors.darkBlue} />}
      </View>
      <FlashList
        data={flattenedData}
        renderItem={renderItem}
        estimatedItemSize={ITEM_HEIGHT}
        onEndReached={fetchMore}
        numColumns={2}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          paddingHorizontal: PADDING,
        }}
      />
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
  icon: {
    color: Colors.lightBlue,
    marginRight: 4,
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
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 232,
    borderTopLeftRadius: 8,
    padding: 2,
  },
})
