import axios from 'axios'

const baseUrl = 'http://192.168.88.8:3000'


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
            console.log(response.data)
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

export const verifyId = (token) => {
    return ((dispatch) => {
        axios({
            method: 'post',
            url: baseUrl + '/verify',
            data: {
                token
            }
        })
        .then(response => {
            delete response.data.iat
            delete response.data.updatedAt
            delete response.data.createdAt
            response.data.status = 'OnProgress'
            // alert(`Order from ${response.data.Customer.police_number} is now ${response.data.status}`);
            // console.log(response.data)
            return axios ({ method: 'patch', url: baseUrl + `/queue/${response.data.id}`, data: response.data })
        })
        .then(response => {
            alert(`Update! Order id ${response.data.id} is now ${response.data.status}`)
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    })
}

export const updateStatus = (id, status) => {

}

