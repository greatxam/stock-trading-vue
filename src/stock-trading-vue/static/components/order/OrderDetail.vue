<script setup lang="ts">
import { computed, inject, reactive, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AxiosInstance } from 'axios';

import { httpClientKey } from '../../plugins/http_client';
import { Order, TransactionStatus, TransactionType } from '../../models';

const emits = defineEmits<{
    (e: 'alertMessage', message: string, type: string)
}>()
const router = useRouter()
const route = useRoute()
const httpClient = inject(httpClientKey) as AxiosInstance

const enabledForm = ref<boolean>(false)
const order: Order = reactive({
    id: undefined,
    type: TransactionType.BUY,
    status: TransactionStatus.PENDING,
    stock: undefined,
    quantity: 0,
    price: 0,
    amount: 0
})

const isFormDisabled = computed<boolean | undefined>(() => {
    return (enabledForm.value || !order.id)?undefined:true
})
const enableEdit = (() => {
    enabledForm.value = !enabledForm.value
})

const onSave = (async (e: Event) => {
    e.preventDefault()

    await httpClient.post('/orders/', {
        type: order.type,
        stock: order.stock?.id,
        price: order.price,
        quantity: order.quantity,
        amount: order.amount
    })
    .then(function (response) {
        order.id = response.data.id

        const message = `Successfully place an order to ${TransactionType[order.type]} ${order.stock?.code}.`
        emits('alertMessage', message, 'success')
        router.push('/orders')
    })
})

watchEffect (async () => {
    if (route.params.id) {
        let url = `/orders/${route.params.id}`
        await httpClient.get(url)
            .then(function (response) {
                // update reactive order properties
                order.id = response.data.id
                order.type = response.data.type
                order.status = response.data.status
                order.stock = response.data.stock
                order.price = response.data.stock?.price
                order.quantity = response.data.quantity
                order.amount = response.data.amount
            })
            .catch(function (error) {
                // TODO: refresh token
                console.log(error)
            })
    }

    if(route.params.stockId) {
        let url = `/stocks/${route.params.stockId}`
        await httpClient.get(url)
            .then(function (response) {
                order.type = TransactionType.BUY
                if (route.params.type.toLowerCase() === 'sell')
                    order.type = TransactionType.SELL
                order.stock = response.data
                order.price = response.data.price
            })
            .catch(function (error) {
                // TODO: refresh token
                console.log(error)
            })
    }
})

watch(order, (newOrder) => {
    order.amount = newOrder.quantity * newOrder.price
})
</script>

<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">
            <span :class="'badge text-bg-'+ (order.type?'danger':'success')">{{ TransactionType[order.type] }}</span> {{ order.stock?.code }}
            <button
                @click="enableEdit"
                v-if="order.id"
                type="button"
                class="btn btn-outline-primary btn-sm">
                <i class="bi bi-pencil"></i>
            </button>
        </h1>

        <div class="btn-toolbar mb-2 mb-md-0">
            <a :href="isFormDisabled?'/orders':'/stocks'" class="btn btn-outline-primary" role="button">
                <i class="bi bi-arrow-left-circle"></i>
            </a>
        </div>
    </div>

    <div class="row">
        <form @submit="onSave" class="col-4">
            <fieldset :disabled="isFormDisabled">
                <!-- order.stock -->
                <div class="row mb-3">
                    <label for="orderStock" class="col-sm-3 col-form-label">Stock</label>
                    <div class="col-sm-9">
                        <input 
                            disabled
                            :value="order.stock?.code"
                            id="orderStock"
                            type="text" 
                            class="form-control">
                    </div>
                </div>
                <!-- /order.stock -->

                <!-- /order.quantity -->
                <div class="row mb-3">
                    <label for="orderQuantity" class="col-sm-3 col-form-label">Quantity</label>
                    <div class="col-sm-9">
                        <input 
                            v-model.lazy="order.quantity"
                            id="orderQuantity"
                            type="number" 
                            min="1"
                            class="form-control text-end">
                    </div>
                </div>
                <!-- /order.quantity -->

                <!-- /order.price -->
                <div class="row mb-3">
                    <label for="orderPrice" class="col-sm-3 col-form-label">Price</label>
                    <div class="col-sm-9">
                        <input
                            v-model.lazy="order.price"
                            id="orderPrice"
                            type="number"
                            class="form-control text-end">
                    </div>
                </div>
                <!-- /order.price -->

                <!-- /order.amount -->
                <div class="row mb-3">
                    <label for="orderAmount" class="col-sm-3 col-form-label">Amount</label>
                    <div class="col-sm-9">
                        <input
                            disabled
                            v-model.lazy="order.amount"
                            id="orderAmount"
                            type="number"
                            class="form-control text-end">
                    </div>
                </div>
                <!-- /order.amount -->
            </fieldset>

            <div class="row mb-3 text-end">
                <div class="col-sm-12">
                    <button 
                        v-if="!isFormDisabled" 
                        type="submit" 
                        class="btn btn-outline-success">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
