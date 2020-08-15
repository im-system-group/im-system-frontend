import Axios from 'axios'

export const apiRequest = Axios.create({
    baseURL: "/api"
})
