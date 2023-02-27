import axios from 'axios'

export const API_URL = 'https://busy-erin-lion-suit.cyclic.app/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bareer ${localStorage.getItem('token')}`
    return config;
})

export default $api;