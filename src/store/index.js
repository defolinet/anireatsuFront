import { configureStore } from '@reduxjs/toolkit'
import animesSlice from './animesSlice'
import genresSlice from './genresSlice'
import searchSlice from './searchSlice'

export default configureStore({
    reducer: {
        genres: genresSlice,
        animes: animesSlice,
        search: searchSlice
    }
})