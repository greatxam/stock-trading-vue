<script setup lang="ts">
import { useUserStore } from './stores/user';
import DashboardView from './views/DashboardView.vue'
import LoginView from './views/LoginView.vue'

const user = useUserStore()
</script>

<template>
    <DashboardView v-if="user.isAuthenticated()" />
    <LoginView v-else />
</template>
