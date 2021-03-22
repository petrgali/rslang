import { DUMMY_ACTION } from "../types";

const initialState = {
    dummy: "",
}

export const dummyReducer = (state = initialState, action) => {
    switch (action.type) {
        case DUMMY_ACTION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}