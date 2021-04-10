import { CRED_ACTION } from "../types";

const initialState = {
    name: "",
    userId: "",
    avatar: ""
}

export const credentialsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CRED_ACTION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
