<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderMenu from '../components/header/HeaderMenu.vue';
import SidebarMenu from '../components/sidebar/SidebarMenu.vue';
</script>

<template>
    <HeaderMenu />

    <div class="container-fluid">
        <div class="row">
            <SidebarMenu />

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<style src="../assets/dashboard.css"></style>
