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
            ...postNoAuth.headers,
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
        async getWordbyId(id) {
            let { data } = await axios(`${API_BASE_URL}words/${id}`)
            return data
        },

        /* newUser schema sample 
        {
        "name": "string",
        "email": "string",
        "password": "string"
        }*/
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

        /* signin schema sample
        {
        "email": "string",
        "password": "string"
        }*/
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
        // USERS JWT required 
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
        // USERS/WORDS JWT required
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

        /*word setting schema sample 
        {
        "difficulty": "string", (hard, deleted)
        "optional": {}          (isLearning: bool)
        }*/
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
        /*word setting schema sample 
        {
        "difficulty": "string", (hard, deleted)
        "optional": {}          (isLearning: bool)
        }*/
        async updateUserWordbyId(wordId, setting) {
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
        },
        // USERS/Statistic JWT required
        async getUserStat() {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/statistics`, {
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
        /* user stat schema sample
        {
        "learnedWords": 0,
        "optional": {}
        }*/
        async updateUserStat(stat) {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/statistics`, {
                    ...putAuth,
                    data: JSON.stringify(stat)
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
        //USER/Setting JWT required
        async getUserSettings() {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/settings`, {
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
        /* user settings schema sample
        {
        "wordsPerDay": 0,
        "optional": {}
        }*/
        async updateUserSettings(setting) {
            let id = localStorage.getItem(USER.ID)
            try {
                let response = await axios(`${API_BASE_URL}users/${id}/settings`, {
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
        }
    }
}
export default interactAPI