import { atom } from 'jotai'

export const searchedValueAtom = atom('')

export const errorAtom = atom<string | null>(null)
