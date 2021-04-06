import { CRED_ACTION } from "../types"

export const getUserCredentials = ({ name, userId }) => ({
    type: CRED_ACTION,
    payload: { name: name, userId: userId },
})