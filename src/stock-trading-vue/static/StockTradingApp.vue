<script setup lang="ts">
import DashboardView from './views/DashboardView.vue'
import LoginView from './views/LoginView.vue'

// TODO: authenticate user 
const is_authenticated = true;
</script>

<template>
    <DashboardView v-if="is_authenticated" />
    <LoginView v-else />
</template>
