<script setup lang="ts">
import { inject, ref, computed, watchEffect } from 'vue';
import { AxiosInstance } from 'axios';

import { httpClientKey } from '../../plugins/http_client'
import { Order, OrderkListResponse, TransactionType } from '../../models';
import Pagination from '../Pagination.vue';

const emits = defineEmits<{
    (e: 'alertMessage', message: string, type: string)
}>()

const httpClient = inject<AxiosInstance>(httpClientKey) as AxiosInstance
const ordersListResponse = ref<OrderkListResponse>()

const currentPage = ref<number>(1)
const pageCount = computed(() => {
    if (ordersListResponse.value) {
        return Math.floor(ordersListResponse.value?.count / import.meta.env.VITE_API_PAGE_SIZE)
            + ((ordersListResponse.value?.count % import.meta.env.VITE_API_PAGE_SIZE)? 1:0)
    }
    return 0
})
const changePage = (page) => currentPage.value = page

const onDelete = (async (id, index) => {
    const order = ordersListResponse.value?.results[index] as Order
    const confirmationMessage = `Are you sure you want to delete order to ${TransactionType[order.type]} ${order.stock?.code}`
    if (!confirm(confirmationMessage)) return

    const url = `/orders/${id}`
    await httpClient.delete(url)
    .then(function (response) {
        const message = "Successfully deleted an order."
        emits('alertMessage', message, 'success')

        // remove delete object from array
        ordersListResponse.value?.results.splice(index, 1)
    })
    .catch(function (error) {
        // TODO: refresh token
        console.log(error)
    })
})

watchEffect (async () => {
    let url = `/orders?page=${currentPage.value}`
    ordersListResponse.value = await httpClient.get(url)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            // TODO: refresh token
            console.log(error)
        })
})
</script>

<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Open Orders</h1>
    </div>

    <div class="table-responsive small">
        <table class="table table-striped table-sm align-middle">
            <thead>
                <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col" class="text-end">Price</th>
                    <th scope="col" class="text-end">Quantity</th>
                    <th scope="col" class="text-end">Amount</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) of ordersListResponse?.results" :key="order.id">
                    <th scope="row" :class="'text-'+(order.type?'danger':'success')">{{ TransactionType[order.type] }}</th>
                    <td>{{ order.stock?.code }}</td>
                    <td>{{ order.stock?.name }}</td>
                    <td class="text-end">{{ order.price }}</td>
                    <td class="text-end">{{ order.quantity }}</td>
                    <td class="text-end">{{ order.amount }}</td>
                    <td class="text-center">
                        <a :href="'/orders/'+order.id" class="btn btn-outline-primary btn-sm" role="button">
                            <i class="bi bi-eye"></i>
                        </a>
                        <span class="m-1"></span>
                        <a @click="onDelete(order.id, index)" href="#" class="btn btn-outline-danger btn-sm" role="button">
                            <i class="bi bi-trash"></i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <Pagination 
        :current-page="currentPage" 
        :page-count="pageCount"
        @change-page="changePage"/>
</template>
