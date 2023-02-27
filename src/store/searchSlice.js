import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchedAnimes = createAsyncThunk(
    'getSearchedAnimes',
    async function (data, {dispatch}) {
        try {
            
            const response = await axios.get(`https://busy-erin-lion-suit.cyclic.app/anime?search=${data.toLowerCase().replace(/ /g, '')}&limit=6`)
            const animesData = await response.data
            console.log(response);
            dispatch(setSearchedAnimes(animesData.result))
        } catch (e) {
            console.log(e);
        }
    }
)


const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: {
        animes: [],
        value: '',
        status: '',
    },
    reducers: {
        setSearchedAnimes: (state, action) => {
            state.animes = action.payload
            console.log(state.animes);
        },
        changeValue: (state, action) => {
            state.value = action.payload
        },
        changeStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers: builder => 
        builder
            .addCase(getSearchedAnimes.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSearchedAnimes.fulfilled, (state) => {
                state.status = 'finish'
            })
})

export const {setSearchedAnimes, changeValue, changeStatus} = searchSlice.actions
export default searchSlice.reducer 