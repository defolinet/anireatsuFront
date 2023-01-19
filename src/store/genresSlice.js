import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getGenres = createAsyncThunk(
    'getGenres',
    async function(data, {rejectWithValue, dispatch}){
        try {
            const response = await axios.get('/genres')
            const genres = await response.data
            dispatch(genresCount(genres.count))
            genres.result.forEach(async (genr) =>  {
                try {
                    const genrResp = await axios.get(genr.url)
                    const genrData = await genrResp.data
                    dispatch(genresInfo(genrData))
                    
                } catch (e) {
                    console.log(e)
                }
            })
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
            state.genres = [...state.genres, action.payload]
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