import { createApp } from 'vue'
import StockTradingApp from './StockTradingApp.vue'
import router from './router/'

import 'bootstrap-icons/font/bootstrap-icons.scss'
import * as bootstrap from 'bootstrap'
import './assets/styles.scss'

const app = createApp(StockTradingApp)

app.use(router)

app.mount('#app')
