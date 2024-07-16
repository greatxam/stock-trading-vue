<script setup lang="ts">
import { inject, ref, computed, watchEffect } from 'vue';
import { AxiosInstance } from 'axios';

import { httpClientKey } from '../../plugins/http_client'
import { StockListResponse } from '../../models';
import Pagination from '../Pagination.vue';

const httpClient = inject<AxiosInstance>(httpClientKey) as AxiosInstance
const stockListResponse = ref<StockListResponse>()

const currentPage = ref<number>(1)
const pageCount = computed(() => {
    if (stockListResponse.value) {
        return Math.floor(stockListResponse.value?.count / import.meta.env.VITE_API_PAGE_SIZE)
            + ((stockListResponse.value?.count % import.meta.env.VITE_API_PAGE_SIZE)? 1:0)
    }
    return 0
})
const changePage = (page) => currentPage.value = page

watchEffect (async () => {
    let url = `/stocks?page=${currentPage.value}`
    stockListResponse.value = await httpClient.get(url)
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
        <h1 class="h2">Stock List</h1>
    </div>

    <div class="table-responsive small">
        <table class="table table-striped table-sm align-middle">
            <thead>
                <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col" class="text-end">Price</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock of stockListResponse?.results" :key="stock.id">
                    <th scope="row">{{ stock.code }}</th>
                    <td>{{ stock.name }}</td>
                    <td class="text-end">{{ stock.price }}</td>
                    <td class="text-center">
                        <a :href="'/stocks/'+stock.id" class="btn btn-outline-primary btn-sm" role="button">
                            <i class="bi bi-eye"></i>
                        </a>
                        <span class="m-1"></span>
                        <a :href="'/orders/buy/'+stock.id" class="btn btn-outline-success btn-sm" role="button">
                            <i class="bi bi-cash"></i>
                        </a>
                        <span class="m-1"></span>
                        <a :href="'/orders/sell/'+stock.id" class="btn btn-outline-danger btn-sm" role="button">
                            <i class="bi bi-cash-coin"></i>
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
