import { API_BASE_URL, USER, ERROR } from "./constant"
import axios from "axios"

const setStorage = (...props) => {
    props.map(obj => localStorage.setItem(obj.name, obj.payload))
}

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
            ...postNoAuth,
            url: `${API_BASE_URL}users`,
            data: JSON.stringify(user)
        })
    },
    loginUser: async (user) => {
        let response = await requestAPI({
            ...postNoAuth,
            url: `${API_BASE_URL}signin`,
            data: JSON.stringify(user),
        })
        if (response.status === 200) {
            setStorage({
                name: USER.TOKEN,
                payload: response.payload.token
            }, {
                name: USER.ID,
                payload: response.payload.userId
            })
            return { status: response.status }
        }
        return { status: response.status, payload: response.payload }
    },
    getUserbyId: (id = localStorage.getItem(USER.ID)) => {
        return requestAPI({
            ...getAuth,
            url: `${API_BASE_URL}users/${id}`,
        })
    },
    getUserWords: (id = localStorage.getItem(USER.ID)) => {
        return requestAPI({
            ...getAuth,
            url: `${API_BASE_URL}users/${id}/words`,
        })
    },
    getHardOrIsLearningOrRegularWords: (group = 0, page = 0, id = localStorage.getItem(USER.ID)) => {
      return requestAPI({
        ...getAuth,
        url: `${API_BASE_URL}users/${id}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter={"$or":[{"$or": [{"userWord.difficulty":"hard"}, {"userWord.optional.isLearning": true}]},{"userWord":null}]}`,
      })
    },
    addUserWord: (wordId, setting) => {
        let id = localStorage.getItem(USER.ID)
        return requestAPI({
            ...postAuth,
            url: `${API_BASE_URL}users/${id}/words/${wordId}`,
            data: JSON.stringify(setting)
        })
    },
    getUserWordbyId: (wordId) => {
        let id = localStorage.getItem(USER.ID)
        return requestAPI({
            ...getAuth,
            url: `${API_BASE_URL}users/${id}/words/${wordId}`,
        })
    },
    updateUserWordbyId: (wordId, setting) => {
        let id = localStorage.getItem(USER.ID)
        return requestAPI({
            ...putAuth,
            url: `${API_BASE_URL}users/${id}/words/${wordId}`,
            data: JSON.stringify(setting)
        })
    },
    deleteUserWordbyId: (wordId) => {
        let id = localStorage.getItem(USER.ID)
        return requestAPI({
            ...deleteAuth,
            url: `${API_BASE_URL}users/${id}/words/${wordId}`,
        })
    },
    getUserStat: () => {
        let id = localStorage.getItem(USER.ID)
        return requestAPI({
            ...getAuth,
            url: `${API_BASE_URL}users/${id}/statistics`,
        })
    },
    updateUserStat: (stat) => {
        let id = localStorage.getItem(USER.ID)
        return requestAPI({
            ...putAuth,
            url: `${API_BASE_URL}users/${id}/statistics`,
            data: JSON.stringify(stat),
        })
    },
    getUserSettings: () => {
        let id = localStorage.getItem(USER.ID)
        return requestAPI({
            ...getAuth,
            url: `${API_BASE_URL}users/${id}/settings`,
        })
    },
    updateUserSettings: (setting) => {
        let id = localStorage.getItem(USER.ID)
        return requestAPI({
            ...putAuth,
            url: `${API_BASE_URL}users/${id}/settings`,
            data: JSON.stringify(setting),
        })
    },
    getTrainingAggregatedWords: (group = 0, page = 0, words = 20) => {
        let id = localStorage.getItem(USER.ID)
        let filter = `{"$or": [{"$and":[{"$or": [{"userWord.difficulty":"hard"}, {"userWord.difficulty": "deleted"}]}]},{"userWord": null}]}`
        return requestAPI({
            url: `${API_BASE_URL}users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=${words}&filter=${filter}`,
            ...getAuth,

        })
    }
}

export default Object.freeze(interactAPI)
