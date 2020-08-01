import Axios from 'axios'

export const apiRequest = Axios.create({
    baseURL: "http://118.168.56.15/api"
})
