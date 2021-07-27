import Axios from 'axios'

export const apiRequest = Axios.create({
    //baseURL: "http://domain:8080/",
    //baseURL: "https://api.imsystem.site/",
    //baseURL: process.env.NODE_ENV !== 'production' ? "http://localhost:3001" : "https://api.imsystem.site/",
    baseURL: process.env.NODE_ENV !== 'production' ? "/api" : "https://api.imsystem.site/",
    //withCredentials: true
})