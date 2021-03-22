import { combineReducers } from "redux"
import { dummyReducer } from "../reducers/dummyReducer"

export const rootReducer = combineReducers({
    dummy: dummyReducer,
})

export default rootReducer