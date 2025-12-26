import { createApp } from 'vue'
import App from './App.vue'

import router from '@/bases/router'
import store from '@/bases/store'
import '@/assets/css/global.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
