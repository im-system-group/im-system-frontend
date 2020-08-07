import Axios from 'axios'

export const apiRequest = Axios.create({
    baseURL: "http://118.160.116.104/api"
})
