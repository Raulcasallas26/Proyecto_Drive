import { createApp } from 'vue'
import { router } from ".//routes/routes.js"
import {createPinia} from 'pinia'
import { Quasar } from 'quasar'
import './style.css'
import App from './App.vue'

//import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
//import Quasar css
import 'quasar/src/css/index.sass';

const myApp= createApp (App)
const pinia = createPinia()

myApp.use(Quasar,{
    plugins:{},//import Quasar plugins and add here
})

myApp.use(router)
myApp.use(pinia)
myApp.mount('#app')
