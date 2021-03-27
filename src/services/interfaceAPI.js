import { API_BASE_URL, USER, ERROR } from "./constant"
import axios from "axios"

const setStorage = (...props) => {
    props.map(obj => localStorage.setItem(obj.name, obj.payload))
}

const interactAPI = () => {
    const postNoAuth = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const postAuth = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(USER.TOKEN)}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    const putAuth = {
        method: "PUT",
        headers: { ...postAuth.headers }
    }
    const deleteAuth = {
        method: "DELETE",
        headers: { ...postAuth.headers }
    }
    const getAuth = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(USER.TOKEN)}`,
            'Accept': 'application/json',
        }
    }
    return {
        // endpoints with no required registration
        async getWords(page = 0, group = 0) {
            let { data } = await axios(`${API_BASE_URL}words?page=${page}&group=${group}`)
            return data
        },
        async getWordbyId(id = 0) {
            let { data } = await axios(`${API_BASE_URL}words/${id}`)
            return data
        },

        // create new User 
        async newUser(user) {
            try {
                let response = await axios(`${API_BASE_URL}users`, {
                    ...postNoAuth,
                    data: JSON.stringify(user)
                })
                return {
                    status: response.status,
                    payload: response.data
                }
            } catch ({ message }) {
                let status = Number.parseInt(message.split(" ").pop())
                return {
                    status: status,
                    payload: ERROR[status]
                }
            }
        },

        // get JWT token to access to locked endpoints - email, password - are required
        async signin(user) {
            try {
                let response = await axios(`${API_BASE_URL}signin`, {
                    ...postNoAuth,
                    data: JSON.stringify(user)
                })
                setStorage({
                    name: USER.TOKEN,
                    payload: response.data.token
                }, {
                    name: USER.ID,
                    payload: response.data.userId
                })
                return {
                    status: response.status,
                    payload: response.data
                }
            } catch ({ message }) {
                let status = Number.parseInt(message.split(" ").pop())
                return {
                    status: status,
                    payload: ERROR[status]
                }
            }
        },

        // USERS endpoints with JWT required 
        async getUserbyId(id = localStorage.getItem(USER.ID)) {
            try {
                let response = await axios(`${API_BASE_URL}users/${id}`, {
                    ...getAuth,
                })
                return {
                    status: response.status,
                    payload: response.data
                }
            } catch ({ message }) {
                let status = Number.parseInt(message.split(" ").pop())
                return {
                    status: status,
                    payload: ERROR[status]
                }
            }
        },
        // where to save refresh token??
        async getNewToken() {

        },

        // WORDS endpoints with JWT required
        async getUserWords() {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/words`, {
                    ...getAuth,
                })
                return {
                    status: response.status,
                    payload: response.data
                }
            } catch ({ message }) {
                let status = Number.parseInt(message.split(" ").pop())
                return {
                    status: status,
                    payload: ERROR[status]
                }
            }
        },
        // ADD custom fileds to word
        async addUserWord(wordId, setting) {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/words/${wordId}`, {
                    ...postAuth,
                    data: JSON.stringify(setting)
                })
                return {
                    status: response.status,
                    payload: response.data
                }
            } catch ({ message }) {
                let status = Number.parseInt(message.split(" ").pop())
                return {
                    status: status,
                    payload: ERROR[status]
                }
            }
        },
        async getUserWordbyId(wordId) {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/words/${wordId}`, {
                    ...getAuth,
                })
                return {
                    status: response.status,
                    payload: response.data
                }
            } catch ({ message }) {
                let status = Number.parseInt(message.split(" ").pop())
                return {
                    status: status,
                    payload: ERROR[status]
                }
            }
        },
        async updateUserWord(wordId, setting) {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/words/${wordId}`, {
                    ...putAuth,
                    data: JSON.stringify(setting)
                })
                return {
                    status: response.status,
                    payload: response.data
                }
            } catch ({ message }) {
                let status = Number.parseInt(message.split(" ").pop())
                return {
                    status: status,
                    payload: ERROR[status]
                }
            }
        },
        async deleteUserWordbyId(wordId) {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/words/${wordId}`, {
                    ...deleteAuth,
                })
                return {
                    status: response.status,
                    payload: response.data
                }
            } catch ({ message }) {
                let status = Number.parseInt(message.split(" ").pop())
                return {
                    status: status,
                    payload: ERROR[status]
                }
            }
        }






    }
}
export default interactAPI