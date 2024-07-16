<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderMenu from '../components/header/HeaderMenu.vue';
import SidebarMenu from '../components/sidebar/SidebarMenu.vue';
import { ref } from 'vue';

const alertType = ref<string>()
const alertMessage = ref<string>()

const onAlertMessage = ((message: string, type: string = 'success') => {
    alertMessage.value = message
    alertType.value = type
})
</script>

<template>
    <HeaderMenu />

    <div class="container-fluid">
        <div class="row">
            <SidebarMenu />

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="row mt-4" v-if="alertMessage">
                    <div :class="'alert alert-'+alertType" role="alert">
                        {{ alertMessage }}
                    </div>
                </div>

                <RouterView @alert-message="onAlertMessage" />
            </main>
        </div>
    </div>
</template>

<style src="../assets/dashboard.css"></style>
