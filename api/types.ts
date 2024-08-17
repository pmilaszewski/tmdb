export type PopularMovieItem = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MoviePageData = {
  page: number
  results: PopularMovieItem[]
  total_pages: number
  total_results: number
}

export type PopularMoviePage = {
  data: MoviePageData
  nextPage: number
}

export type PopularMoviesData = {
  pageParams: number[]
  pages: PopularMoviePage
}

type Genre = {
  id: number
  name: string
}

type ProductionCompany = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

type ProductionContry = {
  id: number
  name: string
}

type SpokenLanguages = {
  english_name: string
  iso_639_1: string
  name: string
}

export type MovieDetailsData = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: Object
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionContry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguages[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
