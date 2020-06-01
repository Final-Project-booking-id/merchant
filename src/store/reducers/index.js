import { SET_QUEUES, SET_SERVICES } from '../actions'

const appState = {
    merchantId: 1,
    services: [],
    queues: []
}

export default function reducer(state = appState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_QUEUES:
            return { ...state, queues: payload }
        case SET_SERVICES:
            return { ...state, services: payload }
        default:
            return state
    }
}