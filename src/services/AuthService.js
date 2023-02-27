import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/login', {email, password})
    }

    static async registration(email, password, username, ava) {
        return $api.post('/registration', {email, password, username, ava})
    }

    static async edit(data) {
        return $api.put('/edit', data)
    }

    static async getUser(token) {
        return $api.get('/user', {token})
    }

    static async logout() {
        return $api.post('/logout')
    }

    static async delete(data) {
        return $api.delete(`/delete?email=${data.email}`)
    }
}