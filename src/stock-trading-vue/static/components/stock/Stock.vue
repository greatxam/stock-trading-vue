<script setup lang="ts">
import { inject, ref, computed, watchEffect } from 'vue';
import { AxiosInstance } from 'axios';
import { httpClientKey } from '../../plugins/http_client'
import { StockListResponse } from '../../models';

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

    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="[stockListResponse?.previous?'':'disabled']">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="p in pageCount" :key="p" class="page-item" :class="[currentPage==p?'disabled':'']">
                <a class="page-link" href="#" @click="changePage(p)">{{ p }}</a>
            </li>
            <li class="page-item" :class="[stockListResponse?.next?'':'disabled']">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
