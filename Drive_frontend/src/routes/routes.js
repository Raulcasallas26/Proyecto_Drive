import home from "../components/home.vue" 
import programas from "../components/programas.vue"
import usuarios from "../components/usuarios.vue"
import login from "../components/login.vue"
import ambientes from "../components/ambiente.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/home",component: home},
    {path:"/usuarios",component: usuarios},
    {path:"/programas",component: programas},
    {path:"/ambientes",component: ambientes},
    {path:"/",component:login}
]
export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})