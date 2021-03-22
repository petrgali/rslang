import DUMMY_ACTION from "../types"

export const dummyAction = (data) => ({
    type: DUMMY_ACTION,
    payload: data,
})