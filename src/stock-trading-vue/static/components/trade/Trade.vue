<script setup lang="ts">
import { inject, ref, computed, watchEffect } from 'vue';
import { AxiosInstance } from 'axios';

import { httpClientKey } from '../../plugins/http_client'
import { TradeListResponse, TransactionType } from '../../models';
import Pagination from '../Pagination.vue';

const httpClient = inject<AxiosInstance>(httpClientKey) as AxiosInstance
const tradeListResponse = ref<TradeListResponse>()

const currentPage = ref<number>(1)
const pageCount = computed(() => {
    if (tradeListResponse.value) {
        return Math.floor(tradeListResponse.value?.count / import.meta.env.VITE_API_PAGE_SIZE)
            + ((tradeListResponse.value?.count % import.meta.env.VITE_API_PAGE_SIZE)? 1:0)
    }
    return 0
})
const changePage = (page) => currentPage.value = page

watchEffect (async () => {
    let url = `/trades?page=${currentPage.value}`
    tradeListResponse.value = await httpClient.get(url)
        .then(function (response) {
            console.log(response.data)
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
        <h1 class="h2">Trade History</h1>
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
                </tr>
            </thead>
            <tbody>
                <tr v-for="trade of tradeListResponse?.results" :key="trade.id">
                    <th scope="row" :class="'text-'+(trade.type?'danger':'success')">{{ TransactionType[trade.type] }}</th>
                    <td>{{ trade.stock?.code }}</td>
                    <td>{{ trade.stock?.name }}</td>
                    <td class="text-end">{{ trade.price }}</td>
                    <td class="text-end">{{ trade.quantity }}</td>
                    <td class="text-end">{{ trade.amount }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <Pagination 
        :current-page="currentPage" 
        :page-count="pageCount"
        @change-page="changePage"/>
</template>
