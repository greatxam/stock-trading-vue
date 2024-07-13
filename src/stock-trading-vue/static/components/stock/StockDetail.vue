<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AxiosInstance } from 'axios';

import { httpClientKey } from '../../plugins/http_client';
import { Stock } from '../../models';

const route = useRoute()
const httpClient = inject(httpClientKey) as AxiosInstance
const stock = ref<Stock>()

watchEffect (async () => {
    let url = `/stocks/${route.params.id}`
    stock.value = await httpClient.get(url)
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
        <h1 class="h2"><span class="badge text-bg-primary">{{ stock?.code }}</span> {{ stock?.name }}</h1>

        <div class="btn-toolbar mb-2 mb-md-0">
            <a href="/stocks" class="btn btn-outline-primary" role="button">
                <i class="bi bi-arrow-left-circle"></i>
            </a>
        </div>        
    </div>

    <div class="row text-center">
        <form class="col-4">
            <fieldset disabled>
                <!-- stock.code -->
                <div class="row mb-3">
                    <label for="stockCode" class="col-sm-2 col-form-label">Code</label>
                    <div class="col-sm-10">
                        <input :value="stock?.code" type="text" class="form-control" id="stockCode">
                    </div>
                </div>
                <!-- /stock.code -->

                <!-- /stock.name -->
                <div class="row mb-3">
                    <label for="stockName" class="col-sm-2 col-form-label">Code</label>
                    <div class="col-sm-10">
                        <input :value="stock?.name" type="text" class="form-control" id="stockName">
                    </div>
                </div>
                <!-- /stock.name -->

                <!-- /stock.name -->
                <div class="row mb-3">
                    <label for="stockPrice" class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-10">
                        <input :value="stock?.price" type="text" class="form-control" id="stockPrice">
                    </div>
                </div>
                <!-- /stock.name -->
            </fieldset>
        </form>
    </div>
</template>
