import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import { createPinia } from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import { router } from "./routes/routes.js"

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify
  }, 
})
app.use(router)
app.use(pinia)
pinia.use(createPersistedState({
  storage:sessionStorage
}))
app.mount('#app')