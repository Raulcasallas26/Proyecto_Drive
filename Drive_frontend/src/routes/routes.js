import home from "../components/home.vue" 
import programas from "../components/programas.vue"
import instructores from "../components/instructores.vue"
import login from "../components/login.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/home",component: home},
    {path:"/instructores",component: instructores},
    {path:"/programas",component: programas},
    {path:"/",component:login}
]
export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})