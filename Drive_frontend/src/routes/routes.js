import home from "../components/home.vue" 
import login from "../components/login.vue"
import usuarios from "../components/usuarios.vue"
import ambientes from "../components/ambiente.vue"
import programas from "../components/programas.vue"
import proyectos from "../components/proyectos.vue"
import investigacion from "../components/investigacion.vue"
import redConocimiento from "../components/redConocimiento.vue"
import materialesApoyo from "../components/materialesApoyo.vue"
import instrumentosEvaluacion from "../components/instrumentosEvaluacion.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/",component:login},
    {path:"/home",component: home},
    {path:"/usuarios",component: usuarios},
    {path:"/programas",component: programas},
    {path:"/ambientes",component: ambientes},
    {path:"/proyectos",component: proyectos},
    {path:"/investigacion",component: investigacion},
    {path:"/redConocimento",component: redConocimiento},
    {path:"/materialesApoyo",component: materialesApoyo},
    {path:"/instrumentosEvaluacion",component: instrumentosEvaluacion},
]
export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})