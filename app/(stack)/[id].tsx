import { fetchMovieDetails } from '@/api'
import { Chip, Company, Image, Rate, Section, Text, View } from '@/components'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native'

export default function Details() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { data: detailsData, isFetching } = fetchMovieDetails(id as string)

  const handleGoBack = () => {
    router.back()
  }

  if (!detailsData) {
    return (
      <View style={styles.empty}>
        <Text variant="header">Something went wrong</Text>
        <Pressable style={styles.button} onPress={handleGoBack}>
          <Text>Go back</Text>
        </Pressable>
      </View>
    )
  }

  if (isFetching) {
    return (
      <View style={styles.empty}>
        <Text variant="header">Loading...</Text>
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.darkBlue}
        />
      </View>
    )
  }

  const { data } = detailsData

  return (
    <ScrollView style={styles.main}>
      <View>
        <Pressable style={styles.backIcon} onPress={handleGoBack}>
          <Ionicons size={24} name="chevron-back" />
        </Pressable>
        <Image style={styles.image} source={data.backdrop_path} />
        <Rate rate={data.vote_average} variant="details" />
      </View>
      <View style={styles.body}>
        <Text variant="header">{data.title}</Text>
        <Text>{data.tagline}</Text>
        <Section
          title={'Genres'}
          body={
            <View style={styles.container}>
              {data.genres.map((genre, index) => (
                <Chip key={genre.id} value={genre.name} index={index} />
              ))}
            </View>
          }
        />
        <Section title="Overview" body={data.overview} />
        <Section
          title="Release date"
          body={dayjs(data.release_date).format('DD MMM YYYY')}
        />
        <Section
          title="Languages"
          body={data.spoken_languages.flatMap(
            (language) => language.english_name,
          )}
        />
        <Section
          title="Production companies"
          body={
            <View style={styles.container}>
              {data.production_companies.map((company) => (
                <Company
                  key={company.id}
                  name={company.name}
                  logo={company.logo_path}
                />
              ))}
            </View>
          }
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    height: 256,
    width: '100%',
  },
  backIcon: {
    padding: 8,
    borderRadius: 100,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: Colors.white,
  },
  body: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loader: {
    marginTop: 16,
  },
})
