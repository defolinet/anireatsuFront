import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchedAnimes = createAsyncThunk(
    'getSearchedAnimes',
    async function (data, {dispatch}) {
        try {
            const response = await axios.get(`anime?search=${data.toLowerCase()}&limit=6`)
            const animesData = await response.data
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
                // console.log(action);
                if(state.animes.length){
                    state.status = 'finish'
                } 
            })
})

export const {setSearchedAnimes, changeValue, changeStatus} = searchSlice.actions
export default searchSlice.reducer 