import { API_BASE_URL, USER, ERROR } from "./constant"
import axios from "axios"

const setStorage = (...props) => {
    props.map(obj => localStorage.setItem(obj.name, obj.payload))
}

const getHeaders = {
    defaultHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    postNoAuth: () => {
        return {
            method: "POST",
            headers: getHeaders.defaultHeaders
        }
    },
    postAuth: () => {
        return {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(USER.TOKEN)}`,
                ...getHeaders.defaultHeaders,
            }
        }
    },
    putAuth: () => {
        return {
            method: "PUT",
            'Authorization': `Bearer ${localStorage.getItem(USER.TOKEN)}`,
            ...getHeaders.defaultHeaders
        }
    },
    deleteAuth: () => {
        return {
            method: "DELETE",
            'Authorization': `Bearer ${localStorage.getItem(USER.TOKEN)}`,
            ...getHeaders.defaultHeaders
        }
    },
    getAuth: () => {
        return {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(USER.TOKEN)}`,
                'Accept': 'application/json',
            }
        }
    }
}
const requestAPI = async (options) => {
    try {
        let response = await axios(options)
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

const interactAPI = {
    getWords: (page = 0, group = 0) => {
        return requestAPI({
            url: `${API_BASE_URL}words?page=${page}&group=${group}`,
        })
    },
    getWordbyId: (id) => {
        return requestAPI({
            url: `${API_BASE_URL}words/${id}`,
        })
    },
    registerUser: (user) => {
        return requestAPI({
            ...getHeaders.postNoAuth(),
            url: `${API_BASE_URL}users`,
            data: JSON.stringify(user)
        })
    },
    avatarUpload: () => {
        return requestAPI({
            url: `${API_BASE_URL}avatar/`,
            ...getHeaders.postNoAuth()
        })
    },
    loginUser: async (user) => {
        let response = await requestAPI({
            ...getHeaders.postNoAuth(),
            url: `${API_BASE_URL}signin`,
            data: JSON.stringify(user),
        })
        if (response.status === 200) {
            setStorage({
                name: USER.TOKEN,
                payload: response.payload.token
            }, {
                name: USER.REFRESH_TOKEN,
                payload: response.payload.refreshToken
            }, {
                name: USER.ID,
                payload: response.payload.userId
            }, {
                name: USER.NAME,
                payload: response.payload.name
            })
            return { status: response.status, payload: response.payload }
        }
        return { status: response.status, payload: response.payload }
    },
    getUserbyId: (id) => {
        return requestAPI({
            ...getHeaders.getAuth(),
            url: `${API_BASE_URL}users/${id}`,
        })
    },
    getUserWords: (id) => {
        return requestAPI({
            ...getHeaders.getAuth(),
            url: `${API_BASE_URL}users/${id}/words`,
        })
    },
    getHardOrIsLearningOrRegularWords: (id, group = 0, page = 0) => {
        return requestAPI({
            ...getHeaders.getAuth(),
            url: `${API_BASE_URL}users/${id}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter={"$or":[{"$or": [{"userWord.difficulty":"hard"}, {"userWord.optional.isLearning": true}]},{"userWord":null}]}`,
        })
    },
    addUserWord: (id, wordId, setting,) => {
        return requestAPI({
            ...getHeaders.postAuth(),
            url: `${API_BASE_URL}users/${id}/words/${wordId}`,
            data: JSON.stringify(setting)
        })
    },
    getUserWordbyId: (id, wordId) => {
        return requestAPI({
            ...getHeaders.getAuth(),
            url: `${API_BASE_URL}users/${id}/words/${wordId}`,
        })
    },
    updateUserWordbyId: (id, wordId, setting) => {
        return requestAPI({
            ...getHeaders.putAuth(),
            url: `${API_BASE_URL}users/${id}/words/${wordId}`,
            data: JSON.stringify(setting)
        })
    },
    deleteUserWordbyId: (id, wordId) => {
        return requestAPI({
            ...getHeaders.deleteAuth(),
            url: `${API_BASE_URL}users/${id}/words/${wordId}`,
        })
    },
    getUserStat: (id) => {
        return requestAPI({
            ...getHeaders.getAuth(),
            url: `${API_BASE_URL}users/${id}/statistics`,
        })
    },
    updateUserStat: (id, stat) => {
        return requestAPI({
            ...getHeaders.putAuth(),
            url: `${API_BASE_URL}users/${id}/statistics`,
            data: JSON.stringify(stat),
        })
    },
    getUserSettings: (id) => {
        return requestAPI({
            ...getHeaders.getAuth(),
            url: `${API_BASE_URL}users/${id}/settings`,
        })
    },
    updateUserSettings: (id, setting) => {
        return requestAPI({
            ...getHeaders.putAuth(),
            url: `${API_BASE_URL}users/${id}/settings`,
            data: JSON.stringify(setting),
        })
    },
    getTrainingAggregatedWords: (id, group = 0, page = 0, words = 20) => {
        let filter = `{"$or": [{ "userWord": {"$exists": true}}, {"userWord": null}]}`
        return requestAPI({
            url: `${API_BASE_URL}users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=${words}&filter=${filter}`,
            ...getHeaders.getAuth(),

        })
    },
    getDeletedWords: (id, page = 0, words = 3600) => {
        let filter = `{ "$and": [{ "userWord.difficulty": "deleted" }] }`
        return requestAPI({
            url: `${API_BASE_URL}users/${id}/aggregatedWords?page=${page}&wordsPerPage=${words}&filter=${filter}`,
            ...getHeaders.getAuth(),
        })
    },
    getDeletedWordsbyGroup: (id, group = 0, page = 0, words = 20) => {
        let filter = `{ "$and": [{ "userWord.difficulty": "deleted" }] }`
        return requestAPI({
            url: `${API_BASE_URL}users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=${words}&filter=${filter}`,
            ...getHeaders.getAuth(),
        })
    },
    getHardWords: (id, page = 0, words = 3600) => {
        let filter = `{ "$and": [{ "userWord.difficulty": "hard" }] }`
        return requestAPI({
            url: `${API_BASE_URL}users/${id}/aggregatedWords?page=${page}&wordsPerPage=${words}&filter=${filter}`,
            ...getHeaders.getAuth(),
        })
    },
    getHardWordsbyGroup: (id, group = 0, page = 0, words = 20) => {
        let filter = `{ "$and": [{ "userWord.difficulty": "hard" }] }`
        return requestAPI({
            url: `${API_BASE_URL}users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=${words}&filter=${filter}`,
            ...getHeaders.getAuth(),
        })
    },
    getLearningWords: (id, page = 0, words = 3600) => {
        let filter = `{"$or": [{ "userWord.optional": {"isLearning": true}}, {"userWord.difficulty": "hard"}]}`
        return requestAPI({
            url: `${API_BASE_URL}users/${id}/aggregatedWords?page=${page}&wordsPerPage=${words}&filter=${filter}`,
            ...getHeaders.getAuth(),
        })
    },
    getLearningWordsbyGroup: (id, group = 0, page = 0, words = 20) => {
        let filter = `{"$or": [{ "userWord.optional": {"isLearning": true}}, {"userWord.difficulty": "hard"}]}`
        return requestAPI({
            url: `${API_BASE_URL}users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=${words}&filter=${filter}`,
            ...getHeaders.getAuth(),
        })
    },
}

export default Object.freeze(interactAPI)
