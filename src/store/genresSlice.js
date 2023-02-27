import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getGenres = createAsyncThunk(
    'getGenres',
    async function(data, {rejectWithValue, dispatch}){
        try {
            const response = await axios.get('https://busy-erin-lion-suit.cyclic.app/genres')
            const genres = await response.data
            dispatch(genresInfo(genres))
        } catch (e) {
            console.log(e)
        }
    }
)

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState: {
        genres: [],
        genresCount: 0,
        isLoading: false
    },
    reducers: {
        genresInfo: (state, action) => {
            state.genres = action.payload
        },
        genresCount: (state, action) => {
            state.genresCount = action.payload
        },
        clearGenres: (state) => {
            state.genres = []
        },
    }
})

export const {genresInfo, genresCount, clearGenres} = genresSlice.actions
export default genresSlice.reducer