import { configureStore } from '@reduxjs/toolkit'
import animeSlice from './animeSlice'
import animesSlice from './animesSlice'
import genresSlice from './genresSlice'
import searchSlice from './searchSlice'
import userSlice from './userSlice'

export default configureStore({
    reducer: {
        genres: genresSlice,
        animes: animesSlice,
        search: searchSlice,
        anime: animeSlice,
        user: userSlice,
    }
})