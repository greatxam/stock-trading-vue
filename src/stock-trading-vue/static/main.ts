import { createApp } from 'vue'
import StockTradingApp from './StockTradingApp.vue'
import router from './router/'
import axios from 'axios'

import 'bootstrap-icons/font/bootstrap-icons.scss'
import * as bootstrap from 'bootstrap'
import './assets/styles.scss'

axios.defaults.baseURL = import.meta.env.VITE_API_PROXY

const app = createApp(StockTradingApp)

app.use(router)

app.mount('#app')
