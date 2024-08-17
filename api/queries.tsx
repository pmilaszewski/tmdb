import { errorAtom } from '@/jotai/atoms'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { MovieDetailsData, MoviePageData } from './types'

const defaultOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: process.env.EXPO_PUBLIC_API_AUTH_TOKEN ?? '',
  },
}

const handleError = (e: Error | any) => {
  if (e instanceof Error) {
    throw new Error(e.message)
  } else {
    const errorMessage = 'Something went wrong'
    throw new Error(errorMessage)
  }
}

const fetcherMovies = async (pageNumber: number) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/movie/popular?language=en-US&page=${pageNumber}`,
      defaultOptions,
    )
    const json = await response.json()

    const data = json as MoviePageData

    const nextPage = data.total_pages > pageNumber ? pageNumber + 1 : null

    return { data, nextPage }
  } catch (e) {
    return handleError(e)
  }
}

export const useFetchMovies = () => {
  const { data, fetchNextPage, error, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['movies'],
      queryFn: ({ pageParam = 1 }) => fetcherMovies(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    })
  const setErrorAtomValue = useSetAtom(errorAtom)

  error && setErrorAtomValue(error.message)

  return { isFetching, data, hasNextPage, fetchNextPage }
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
    return handleError(e)
  }
}

export const useFetchMovieDetails = (id: string) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ['details', id],
    queryFn: () => fetcherDetails(id),
  })

  const setErrorAtomValue = useSetAtom(errorAtom)

  error && setErrorAtomValue(error.message)

  return { isFetching, data }
}

const fetcherSearchedMovies = async (pageNumber: number, key: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/search/movie?include_adult=false&language=en-US&page=${pageNumber}&query=${key}`,
      defaultOptions,
    )
    const json = await response.json()

    const data = json as MoviePageData

    const nextPage = data.total_pages > pageNumber ? pageNumber + 1 : null

    return { data, nextPage }
  } catch (e) {
    return handleError(e)
  }
}

export const useFetchSearchedMovie = (key: string) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery({
      queryKey: ['search', key],
      queryFn: ({ pageParam = 1 }) => fetcherSearchedMovies(pageParam, key),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: false,
    })

  const setErrorAtomValue = useSetAtom(errorAtom)

  error && setErrorAtomValue(error.message)

  return { isFetching, data, hasNextPage, fetchNextPage, refetch }
}
