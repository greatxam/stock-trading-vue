<script setup lang="ts">
import DashboardView from './views/DashboardView.vue'
import LoginView from './views/LoginView.vue'

// TODO: authenticate user
const accessToken = JSON.parse(sessionStorage.getItem(import.meta.env.VITE_API_CACHE_TOKEN_KEY))
const is_authenticated = false;
</script>

<template>
    <DashboardView v-if="is_authenticated" />
    <LoginView v-else />
</template>
