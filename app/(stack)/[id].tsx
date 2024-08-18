import { useFetchMovieDetails } from '@/api'
import { Chip, Company, Image, Rate, Section, Text, View } from '@/components'
import { Colors } from '@/constants/Colors'
import { dateFormat } from '@/constants/other'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { t } from 'i18next'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native'

export default function Details() {
  const { id } = useLocalSearchParams()
  const { back } = useRouter()
  const { data: detailsData, isFetching } = useFetchMovieDetails(id as string)

  if (isFetching) {
    return (
      <View style={styles.empty}>
        <Text variant="header">{t('generic.loading')}</Text>
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.darkBlue}
        />
      </View>
    )
  }

  if (!detailsData) {
    return (
      <View style={styles.empty}>
        <Text variant="header">{t('error.default')}</Text>
        <Pressable style={styles.button} onPress={back}>
          <Text>{t('generic.goBack')}</Text>
        </Pressable>
      </View>
    )
  }

  const { data } = detailsData

  return (
    <ScrollView style={styles.main}>
      <View>
        <Pressable style={styles.backIcon} onPress={back}>
          <Ionicons size={24} name="chevron-back" />
        </Pressable>
        <Image style={styles.image} source={data.backdrop_path} />
        <Rate rate={data.vote_average} variant="details" />
      </View>
      <View style={styles.body}>
        <Text variant="header">{data.title}</Text>
        <Text>{data.tagline}</Text>
        <Section
          title={t('details.genres')}
          body={
            <View style={styles.container}>
              {data.genres.map((genre, index) => (
                <Chip key={genre.id} value={genre.name} index={index} />
              ))}
            </View>
          }
        />
        <Section title={t('details.overview')} body={data.overview} />
        <Section
          title={t('details.releaseDate')}
          body={dayjs(data.release_date).format(dateFormat)}
        />
        <Section
          title={t('details.languages')}
          body={data.spoken_languages.flatMap(
            (language) => language.english_name,
          )}
        />
        <Section
          title={t('details.movieLength')}
          body={t('details.runtime', { value: data.runtime })}
        />
        <Section title={t('details.site')} body={data.homepage} link />
        <Section
          title={t('details.productionCompanies')}
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
