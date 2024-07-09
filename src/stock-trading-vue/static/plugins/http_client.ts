import type { InjectionKey } from 'vue';
import axios, { AxiosInstance } from 'axios'

export const httpClientKey = Symbol() as InjectionKey<AxiosInstance>

export default {
    install: (app, options) => {
        // create axios instance
        const httpClient = axios.create({
            baseURL: import.meta.env.VITE_API_URL + '/' + import.meta.env.VITE_API_VERSION,
        })

        // intercept http request before sending
        httpClient.interceptors.request.use(function (config) {
            if (!config.headers.Authorization) {
                const accessToken = getCachedToken().access_token
                if (accessToken) {
                    // set access token
                    config.headers.Authorization = 'Bearer ' + accessToken
                }
            }
    
            return config;
        }, function (error) {
            return Promise.reject(error);
        })

        app.provide(httpClientKey, httpClient)
    }
}

function getCachedToken() {
    let cacheToken = localStorage.getItem(import.meta.env.VITE_API_CACHE_TOKEN_KEY)
    if (!cacheToken) {
        cacheToken = sessionStorage.getItem(import.meta.env.VITE_API_CACHE_TOKEN_KEY)
    }

    return JSON.parse(cacheToken || '{}')
}
