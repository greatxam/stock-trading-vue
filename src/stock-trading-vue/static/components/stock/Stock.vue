<script setup lang="ts">
import { onMounted, inject, reactive, ref } from 'vue';
import { AxiosInstance } from 'axios';
import { httpClientKey } from '../../plugins/http_client'
import { StockListResponse } from '../../models';

const httpClient = inject<AxiosInstance>(httpClientKey) as AxiosInstance
const stockListResponse = ref<StockListResponse>()

onMounted(() => {
    listStocks()
})

function listStocks() {
    httpClient.get('/stocks')
        .then(function (response) {
            stockListResponse.value = response.data as StockListResponse
            console.log(stockListResponse.value)
        })
        .catch(function (error) {
            console.log(error);
        })
}
</script>

<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Stock List</h1>
    </div>

    <div class="table-responsive small">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock of stockListResponse?.results" :key="stock.code">
                    <th scope="row">{{ stock.code }}</th>
                    <td>{{ stock.name }}</td>
                    <td>{{ stock.price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
