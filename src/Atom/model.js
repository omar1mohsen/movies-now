import { atom } from 'recoil'

export const showState = atom({
  key: 'showState',
  default: false ,
})

export const movieState = atom({
  key: 'movieState',
  default: null,
})
