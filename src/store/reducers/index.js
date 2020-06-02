import { SET_QUEUES, SET_SERVICES, SET_HISTORY } from '../actions'

const appState = {
    merchantId: 1,
    merchant: {
        "name": "car wash 99",
        "email": "carwash99@mail.com",
        "password": "carwash99",
        "address": "-6.220918,107.018009",
        "open_time": "Sat May 30 2020 08:00:00",
        "close_time": "Sat May 30 2020 17:30:00"
    },
    services: [],
    queues: [],
    history: []
}

export default function reducer(state = appState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_QUEUES:
            return { ...state, queues: payload }
        case SET_SERVICES:
            return { ...state, services: payload }
        case SET_HISTORY:
            return { ...state, history: payload }
        default:
            return state
    }
}