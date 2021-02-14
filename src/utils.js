import Axios from 'axios'

export const apiRequest = Axios.create({
    baseURL: "https://api.a5768549testdomain.club/",
    //withCredentials: true
})