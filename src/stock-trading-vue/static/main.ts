import { createApp } from 'vue'
import { createPinia } from 'pinia'

import StockTradingApp from './StockTradingApp.vue'
import router from './router/'
import httpClient from './plugins/http_client'

import 'bootstrap-icons/font/bootstrap-icons.scss'
import * as bootstrap from 'bootstrap'
import './assets/styles.scss'

const app = createApp(StockTradingApp)

app.use(router)
app.use(createPinia())
app.use(httpClient, null)

app.mount('#app')
