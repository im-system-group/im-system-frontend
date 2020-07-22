import Axios from 'axios'

export const apiRequest = Axios.create({
    baseURL: "http://118.166.134.150/api"
})
