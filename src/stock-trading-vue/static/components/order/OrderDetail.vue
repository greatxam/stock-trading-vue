<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AxiosInstance } from 'axios';

import { httpClientKey } from '../../plugins/http_client';
import { Order } from '../../models';

const route = useRoute()
const httpClient = inject(httpClientKey) as AxiosInstance
const order = ref<Order>()

watchEffect (async () => {
    let url = `/orders/${route.params.id}`
    order.value = await httpClient.get(url)
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
        <h1 class="h2"><span class="badge text-bg-primary">{{ order?.type?'Sell':'Buy' }}</span> {{ order?.stock.code }}</h1>

        <div class="btn-toolbar mb-2 mb-md-0">
            <a href="/orders" class="btn btn-outline-primary" role="button">
                <i class="bi bi-arrow-left-circle"></i>
            </a>
        </div>        
    </div>

    <div class="row">
        <form class="col-4">
            <fieldset disabled>
                <!-- order.stock -->
                <div class="row mb-3">
                    <label for="orderStock" class="col-sm-3 col-form-label">Stock</label>
                    <div class="col-sm-9">
                        <input :value="order?.stock.code" type="text" class="form-control" id="orderStock">
                    </div>
                </div>
                <!-- /order.stock -->

                <!-- /order.quantity -->
                <div class="row mb-3">
                    <label for="orderQuantity" class="col-sm-3 col-form-label">Quantity</label>
                    <div class="col-sm-9">
                        <input :value="order?.quantity" type="text" class="form-control" id="orderQuantity">
                    </div>
                </div>
                <!-- /order.quantity -->

                <!-- /order.price -->
                <div class="row mb-3">
                    <label for="orderPrice" class="col-sm-3 col-form-label">Price</label>
                    <div class="col-sm-9">
                        <input :value="order?.price" type="text" class="form-control" id="orderPrice">
                    </div>
                </div>
                <!-- /order.price -->

                <!-- /order.amount -->
                <div class="row mb-3">
                    <label for="orderAmount" class="col-sm-3 col-form-label">Amount</label>
                    <div class="col-sm-9">
                        <input :value="order?.amount" type="text" class="form-control" id="orderAmount">
                    </div>
                </div>
                <!-- /order.amount -->
            </fieldset>
        </form>
    </div>
</template>
