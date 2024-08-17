import { blurhash } from '@/constants/blurhash'
import type { ImageProps } from 'expo-image'
import { Image as EXImage } from 'expo-image'

export const Image = (props: ImageProps) => (
  <EXImage
    contentFit="cover"
    {...props}
    source={`${process.env.EXPO_PUBLIC_API_IMAGES_URL}${props.source}`}
    placeholder={{ blurhash }}
    transition={500}
  />
)
