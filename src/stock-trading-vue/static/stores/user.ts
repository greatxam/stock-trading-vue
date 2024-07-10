import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia";
import { Token } from "../models";

export const useUserStore = defineStore('user', () => {
    const token = useStorage(import.meta.env.VITE_API_CACHE_TOKEN_KEY, {} as Token) 
        || useStorage(import.meta.env.VITE_API_CACHE_TOKEN_KEY, {} as Token, sessionStorage)

    const getAccessToken = () => {
        return token.value.access_token
    }

    const setToken = (newToken: Token, local: boolean = false) => {
        const storage = local? localStorage : sessionStorage
        useStorage(import.meta.env.VITE_API_CACHE_TOKEN_KEY, newToken, storage)

        token.value = newToken
    }
    
    const isAuthenticated = () => getAccessToken()? true : false

    return { isAuthenticated, getAccessToken, setToken }
})
