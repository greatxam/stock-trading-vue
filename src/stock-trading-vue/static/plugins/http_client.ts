import type { InjectionKey } from 'vue';
import axios, { AxiosInstance } from 'axios'

import { useUserStore } from '../stores/user';

export const httpClientKey = Symbol() as InjectionKey<AxiosInstance>

export default {
    install: (app, options) => {
        // user store
        const user = useUserStore()

        // create axios instance
        const httpClient = axios.create({
            baseURL: import.meta.env.VITE_API_URL + '/' + import.meta.env.VITE_API_VERSION,
        })

        // intercept http request before sending
        httpClient.interceptors.request.use(function (config) {
            if (!config.headers.Authorization) {
                const accessToken = user.getAccessToken()
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
