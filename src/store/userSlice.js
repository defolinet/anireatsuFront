import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";

export const registration = createAsyncThunk(
    'auth/registration',
    async function (data, {dispatch, rejectWithValue}) {
        try {
            const response = await AuthService.registration(data.email, data.password, data.username, data.ava)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
        } catch (e) {
            console.log(e);
            return rejectWithValue(e.response.data)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async function (data, {dispatch, rejectWithValue}) {
        try {
            const response = await AuthService.login(data.email, data.password)
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
        } catch (e) {
            console.log(e.response?.data?.message);
            return rejectWithValue(e.message)
        }
    }
)

export const refresh = createAsyncThunk(
    'auth/refresh',
    async function (data, {dispatch, rejectWithValue}) {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
        } catch (e) {
            console.log(e.response?.data?.message);
            return rejectWithValue(e.message)
        }
    }
)

export const userEdit = createAsyncThunk(
    'auth/edit',
    async function (data, {dispatch, rejectWithValue}) {
        try {
            const response = await AuthService.edit(data)
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
        } catch (e) {
            console.log(e.response?.data?.message);
            return rejectWithValue(e.message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async function (data, {dispatch, rejectWithValue}) {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            dispatch(setAuth(false))
            dispatch(setUser({}))
        } catch (e) {
            console.log(e.response?.data?.message);
            return rejectWithValue(e.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'auth/delete',
    async function (data, {dispatch, rejectWithValue}) {
        try {
            await AuthService.delete(data);
            localStorage.removeItem('token');
            dispatch(setAuth(false))
            dispatch(setUser({}))
        } catch (e) {
            console.log(e.response?.data?.message);
            return rejectWithValue(e.message)
        }
    }
)

export const getRecentAnimes = createAsyncThunk(
    'user/animes',
    async function(data, {dispatch, rejectWithValue}) {
        try {   
            const response = await axios.get(
                `https://busy-erin-lion-suit.cyclic.app/anime?${data?.searchById ? `searchById=${data?.searchById.join(',')}&` : ''}`
            )
            const animesData = await response.data
            dispatch(setRecentAnimes(animesData.result))
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)

export const getFavouriteAnimes = createAsyncThunk(
    'user/animes',
    async function(data, {dispatch, rejectWithValue}) {
        try {   
            const response = await axios.get(
                `https://busy-erin-lion-suit.cyclic.app/anime?${data?.searchById ? `searchById=${data?.searchById.join(',')}&` : ''}`
            )
            const animesData = await response.data
            dispatch(setFavouriteAnimes(animesData.result))
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: {},
        isAuth: false,
        recentAnimes: [],
        favouriteAnimes: [],
        status: '',
        registerStatus: '',
        loginStatus: '',
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setRecentAnimes: (state, action) => {
            state.recentAnimes = action.payload
        },
        setFavouriteAnimes: (state, action) => {
            state.favouriteAnimes = action.payload
        },
        clearUserAnimes: (state, action) => {
            if (action.payload.isClearRecent) {
                state.recentAnimes = []
            }

            if (action.payload.isClearFavourites) {
                state.favouriteAnimes = []
            }
        },
        retryRegister: (state, action) => {
            state.registerStatus = ''
        },
        retryLogin: (state, action) => {
            state.loginStatus = ''
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(refresh.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(refresh.fulfilled, (state) => {
                state.status = 'finish'
            })
            .addCase(refresh.rejected, (state) => {
                state.status = 'error'
            })
            .addCase(registration.pending, (state) => {
                state.registerStatus = 'loading'
            })
            .addCase(registration.fulfilled, (state) => {
                state.registerStatus = 'finish'
            })
            .addCase(registration.rejected, (state, rej) => {
                state.registerStatus = rej
            })
            .addCase(login.pending, (state) => {
                state.loginStatus = 'loading'
            })
            .addCase(login.fulfilled, (state) => {
                state.loginStatus = 'finish'
            })
            .addCase(login.rejected, (state, rej) => {
                state.loginStatus = rej
            })
})

export const {setAuth, setUser, setRecentAnimes, setFavouriteAnimes, clearUserAnimes, retryRegister, retryLogin} = userSlice.actions
export default userSlice.reducer