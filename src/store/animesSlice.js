import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAnimes = createAsyncThunk(
    'getAnimes',
    async function(data, {rejectWithValue, dispatch}){
        // dispatch(animesLoading(true))
        try {
            const response = await axios.get(
                `https://busy-erin-lion-suit.cyclic.app/anime?${data?.sSearch ? `search=${data?.sSearch}&` : ''}${data?.searchById ? `searchById=${data?.searchById.join(',')}&` : ''}${data?.sGenres ? `genres=${data?.sGenres.join(',')}&` : ''}${data?.sSort ? `sort=${data?.sSort.by}&` : ''}${data?.sSort ? `as=${data?.sSort.as}&` : ''}${data?.sOffset ? `offset=${data?.sOffset}&` : ''}${data?.sDate ? `date=${data?.sDate.join(',')}&` : ''}`
            )
            const animesData = await response.data
            dispatch(animesCount(animesData.count))
            dispatch(animesLimit(animesData.result.length))
            dispatch(oldestYear(animesData.oldest))
            dispatch(newestYear(animesData.newest))
            dispatch(animesInfo(animesData.result))
            
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const animesSlice = createSlice({
    name: 'animesSlice',
    initialState: {
        animes: [],
        animesLimit: 16,
        animesCount: 0,
        oldestYear: 0,
        newestYear: 0,
        params: {
            sSearch: '',
            sGenres: [],
            sOffset: 0,
            sSort: {
                by: '',
                as: 'increase'
            },
            sDate: [0, 0]
        },
        status: ''
    },
    reducers: {
        animesInfo: (state, action) => {
            state.animes =  action.payload
        },
        animesCount: (state, action) => {
            state.animesCount = action.payload
        },
        animesLimit: (state, action) => {
            state.animesLimit = action.payload
        },
        animesLoading: (state, action) => {
            state.isLoading = action.payload
        },
        animesClear: (state) => {
            state.animes = []
        },
        oldestYear: (state, action) => {
            if(state.oldestYear !== action.payload){
                state.oldestYear = action.payload
            }
        },
        newestYear: (state, action) => {
            if(state.newestYear !== action.payload){
                state.newestYear = action.payload
            }
        },
        animesParams: (state, action) => {
            state.params = {...state.params, ...action.payload}
        },
        paramsClear: (state) => {
            state.params.sGenres = []
            state.params.sSort.by = ''
            state.params.sSort.ascending = 'increase'
            state.params.sDate = [state.oldestYear, state.newestYear]
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAnimes.pending, (state) => {
                state.status = 'loading'
            }) 
            .addCase(getAnimes.fulfilled, (state) => {
                state.status = 'finish'
            }) 
            .addCase(getAnimes.rejected, (state) => {
                state.status = 'error'
            })
})

export const {animesInfo, animesCount, animesLoading, animesClear, animesLimit, oldestYear, newestYear, animesParams, paramsClear} = animesSlice.actions
export default animesSlice.reducer