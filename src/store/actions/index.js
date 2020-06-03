import axios from 'axios'
import io from 'socket.io-client'
import { Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native'
let socket;

// const navigation = useNavigation()

const baseUrl = 'http://192.168.88.8:3000'


export const SET_QUEUES = 'SET_QUEUES'
export const SET_SERVICES = 'SET_SERVICES'
export const SET_HISTORY = 'SET_HISTORY'
export const SET_CAMERA_MODAL = 'SET_CAMERA_MODAL'

// export const VERIFY_QR = 

export const setCameraModal = (data) => {
    return {
        type: SET_CAMERA_MODAL,
        payload: data
    }
}

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

export const setHistory = (data) => {
    return {
        type: SET_HISTORY,
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

export const fetchHistory = (id) => {
    return ((dispatch) => {
        axios({
            method: 'GET',
            url: baseUrl + `/queue/serviceHistory/${id}`
        })
            .then(response => {
                console.log(response.data)
                dispatch(setHistory(response.data))
            })
            .catch(err => {
                console.log(err)
            })
    })
}

export const verifyId = (token) => {
    return ((dispatch) => {
        return new Promise((resolve, reject) => {
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
                resolve()
                return axios({ method: 'patch', url: baseUrl + `/queue/${response.data.id}`, data: response.data })
            })
            .then(response => {
                dispatch(setCameraModal("QR Scanned successfully"))
                // alert(`Update! Order id ${response.data.id} is now ${response.data.status}`)
                console.log(response.data)
            })
            .catch(err => {
                dispatch(setCameraModal("Not their turn yet!"))
                // if(err.response.data.errors[0].message === "Not your queue's turn") {
                //     Alert.alert(
                //         "Forbidden!",
                //         "Not this user turn yet.",
                //         [
                //             {
                //                 text: "Back",
                //                 onPress: () => {
                //                     // navigation.navigate("Service")
                //                 }
                //             }
                //         ]
                //     )
                // }
                // alert(JSON.stringify(err.response.data.errors[0].message))
                console.log(err)
                reject()
            })
    })
        
    })
}

export const updateStatus = (id, queue) => {
    return ((dispatch) => {
        socket = io(baseUrl)
        axios({
            method: 'patch',
            url: baseUrl + `/queue/${id}`,
            data: queue
        })
            .then(response => {
                // alert(`Update! Order id ${response.data.id} is now ${response.data.status}`)
                // console.log(response.data)
                socket.emit("Client", 'updated')
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
    })
}


