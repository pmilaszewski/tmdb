import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { MovieDetailsData, PopularMoviePageData } from './types'

const defaultOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: process.env.EXPO_PUBLIC_API_AUTH_TOKEN ?? '',
  },
}

const fetcherMovies = async (pageNumber: number) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/movie/popular?language=en-US&page=${pageNumber}`,
      defaultOptions,
    )
    const json = await response.json()

    const data = json as PopularMoviePageData

    return { data, nextPage: pageNumber + 1 }
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
    else throw new Error('Something went wrong')
  }
}

export const fetchMovies = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['movies'],
      queryFn: ({ pageParam = 1 }) => fetcherMovies(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    })

  return { isFetching, error, data, hasNextPage, fetchNextPage }
}

const fetcherDetails = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/movie/${id}?language=en-US`,
      defaultOptions,
    )
    const json = await response.json()

    const data = json as MovieDetailsData

    return { data }
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
    else throw new Error('Something went wrong')
  }
}

export const fetchMovieDetails = (id: string) => {
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['details'],
    queryFn: () => fetcherDetails(id),
  })

  return { isFetching, data, error, refetch }
}
