import Axios from 'axios'

export const apiRequest = Axios.create({
    baseURL: "http://36.225.179.90/api"
})
