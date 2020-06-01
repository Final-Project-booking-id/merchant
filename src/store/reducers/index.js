import { SET_QUEUES } from '../actions'

const appState = {
    test: "test",
    queues: []
}

export default function reducer(state = appState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_QUEUES:
            return { ...state, queues: payload }

        default:
            return state
    }
}