import Axios from 'axios'

export const apiRequest = Axios.create({
    baseURL: "http://111.250.156.96/api"
})
