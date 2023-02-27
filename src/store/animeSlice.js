import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAnime = createAsyncThunk(
    'anime/animeName',
    async function(anime, {rejectWithValue, dispatch}) {
        try {
            const response = await axios.get(`https://busy-erin-lion-suit.cyclic.app/anime/${anime}`)
            const data = await response.data
            dispatch(setAnimeInfo(data))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    } 
)

const animeSlice = createSlice({
    name: 'animeSlice',
    initialState: {
        anime: {},
        status: ''
    },
    reducers: {
        setAnimeInfo: (state, action) => {
            state.anime = action.payload
        }
    },
    extraReducers: (builder) => 
        builder
            .addCase(getAnime.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAnime.fulfilled, (state) => {
                state.status = 'finish'
            })
            .addCase(getAnime.rejected, (state) => {
                state.status = 'error'
            })
})

export const {setAnimeInfo} = animeSlice.actions
export default animeSlice.reducer