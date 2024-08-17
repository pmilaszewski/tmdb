import { atom } from 'jotai'

export const searchedValueAtom = atom('')

export const errorAtom = atom<Error | string | null>(null)
