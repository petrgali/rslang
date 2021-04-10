import { combineReducers } from "redux"
import { credentialsReducer } from "./loginReducer"

export const rootReducer = combineReducers({
    credentials: credentialsReducer,
})

export default rootReducer