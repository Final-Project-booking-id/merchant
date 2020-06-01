

export const SET_QUEUES = 'SET_QUEUES'


export const setQueues = (data) => {
    return {
        type: SET_QUEUES,
        payload: data
    }
}