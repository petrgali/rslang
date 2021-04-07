import { CRED_ACTION } from "../types"

export const getUserCredentials = ({ name, userId, avatar }) => ({
    type: CRED_ACTION,
    payload: { name: name, userId: userId, avatar: avatar },
})