import axios from 'axios'

const baseUrl = 'http://192.168.1.9:3000'


export const SET_QUEUES = 'SET_QUEUES'
export const SET_SERVICES = 'SET_SERVICES'

// export const VERIFY_QR = 


export const setQueues = (data) => {
    return {
        type: SET_QUEUES,
        payload: data
    }
}

export const setServices = (data) => {
    return {
        type: SET_SERVICES,
        payload: data
    }
}

export const fetchService = (id) => {
    return ((dispatch) => {
        axios({
            method: 'GET',
            url: baseUrl + `/service/${id}`,
        })
        .then(response => {
            dispatch(setServices(response.data))
        })
        .catch(err => {
            console.log(err)
        })
    })
}

export const fetchQueue = (id) => {
    return ((dispatch) => {
        axios({
            method: 'GET',
            url: baseUrl + `/queue/service/${id}`
        })
        .then(response => {
            console.log(response.data)
            dispatch(setQueues(response.data))
        })
        .catch(err => {
            console.log(err)
        })
    })
}

const verifyId = (token) => {
    return axios({
        method: 'post',
        url: baseUrl + '/verify',
        data: {
            token
        }
    })
        .then(response => {
            alert(`${response} received`);
        })
        .catch(err => {
            alert(err)
        })
}

export const updateStatus = (id, status) => {

}

