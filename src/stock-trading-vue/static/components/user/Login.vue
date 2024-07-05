<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = '/stock_trading_api'

const username = ref<string>()
const password = ref<string>()
const rememberMe = ref<boolean>(false)

async function onSubmit(e: Event) {
    e.preventDefault()

    const headers = {
        'Authorization': 'Basic ' + import.meta.env.VITE_API_CREDENTIAL,
    }

    const data = {
        'grant_type': 'password',
        'username': username.value,
        'password': password.value
    }

    axios.post('/auth/token/', data, {'headers': headers})
        .then(function (response) {
            // TODO: store token in browser local storage
            if (rememberMe.value) {
                localStorage.setItem(
                    import.meta.env.VITE_API_CACHE_TOKEN_KEY, 
                    JSON.stringify(response.data))
            } else {
                sessionStorage.setItem(
                    import.meta.env.VITE_API_CACHE_TOKEN_KEY, 
                    JSON.stringify(response.data))
            }
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })  
}
</script>

<template>
    <div class="form-login position-relavite text-center">
        <form 
            @submit="onSubmit"
            class="position-absolute top-50 start-50 translate-middle col-8 col-sm-6 col-md-4 col-lg-4">
            <h1 class="h3 mb-3 fw-normal">Stock Trading Vue</h1>

            <!-- form.email -->
            <div class="form-floating">
                <input 
                    id="username" 
                    type="text" 
                    v-model="username"
                    placeholder="name@example.com"
                    class="form-control" >
                <label for="floatingInput">Email address</label>
            </div>
            <!-- /form.email -->

            <!-- form.password -->
            <div class="form-floating">
                <input 
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                    class="form-control">
                <label for="floatingPassword">Password</label>
            </div>
            <!-- /form.password -->

            <!-- form.remember_me -->
            <div class="form-check text-start my-3">
                <input 
                    id="rememberMe"
                    type="checkbox"
                    v-model="rememberMe"
                    class="form-check-input">
                <label class="form-check-label" for="rememberMe">
                    Remember me
                </label>
            </div>
            <!-- /form.remember_me -->

            <!-- form.submit -->
            <button
                type="submit"
                class="btn btn-primary w-100 py-2">Log in</button>
            <!-- /form.submit -->
        </form>
    </div>
</template>
