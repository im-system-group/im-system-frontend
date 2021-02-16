import Axios from 'axios'

export const apiRequest = Axios.create({
    baseURL: "http://domain:8080/",
    //withCredentials: true
})