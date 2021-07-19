import { useAxios } from './axios'


export function registerPlugins (app) {
    useAxios(app)
}