<script setup lang="ts">
import { inject, ref, computed, watchEffect } from 'vue';
import { AxiosInstance } from 'axios';
import * as d3 from 'd3';

import { httpClientKey } from '../../plugins/http_client'
import { Trade, TradeListResponse, TransactionType } from '../../models';
import Pagination from '../Pagination.vue';

const httpClient = inject<AxiosInstance>(httpClientKey) as AxiosInstance
const tradeListResponse = ref<TradeListResponse>()
const trades = ref<Array<Trade>>()

const sortColumn = (col) => {
    if (columnOrder(col)) {
        trades.value = tradeListResponse.value?.results.sort((a, b) => d3.ascending(a[col], b[col]))
    } else {
        trades.value = tradeListResponse.value?.results.sort((a, b) => d3.descending(a[col], b[col]))
    }
}
const columnOrder = (col) => {
    trades.value = tradeListResponse.value?.results
    let a = trades.value?.slice(0, -trades.value.length+1)[0]
    let b = trades.value?.slice(-1)[0]
    if (!a || !b) {
        return false
    }
    return a[col]>b[col]?true:false
}

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
                    <th scope="col">
                        Type 
                    </th>
                    <th scope="col">
                        Code 
                    </th>
                    <th scope="col">
                        Name 
                    </th>
                    <th @click="sortColumn('price')" scope="col" class="text-end">
                        Price <i :class="'bi bi-caret-'+[columnOrder('price')?'up':'down']"></i>
                    </th>
                    <th @click="sortColumn('quantity')" scope="col" class="text-end">
                        Quantity <i :class="'bi bi-caret-'+[columnOrder('quantity')?'up':'down']"></i>
                    </th>
                    <th @click="sortColumn('amount')" scope="col" class="text-end">
                        Amount <i :class="'bi bi-caret-'+[columnOrder('amount')?'up':'down']"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trade of trades" :key="trade.id">
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

<style>
.table>thead>tr>th {
    cursor: pointer
}
</style>
