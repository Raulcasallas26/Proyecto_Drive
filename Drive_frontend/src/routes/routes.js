import home from "../components/home.vue" 
import login from "../components/login.vue"
import roles from "../components/rolesusu.vue";
import usuarios from "../components/usuarios.vue"
import ambientes from "../components/ambiente.vue"
import programas from "../components/programas.vue"
import proyectos from "../components/proyectos.vue"
import investigacion from "../components/investigacion.vue"
import redConocimiento from "../components/redConocimiento.vue"
import materialesApoyo from "../components/materialesApoyo.vue"
import registroCalificado from "../components/registroCalificado.vue";
import retroalimentacionRed from "../components/retroalimentacionRed.vue"
import instrumentosEvaluacion from "../components/instrumentosEvaluacion.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/",component:login},
    {path:"/home",component: home},
    {path:"/roles",component: roles},
    {path:"/usuarios",component: usuarios},
    {path:"/programas",component: programas},
    {path:"/ambientes",component: ambientes},
    {path:"/proyectos",component: proyectos},
    {path:"/investigacion",component: investigacion},
    {path:"/redConocimento",component: redConocimiento},
    {path:"/materialesApoyo",component: materialesApoyo},
    {path:"/registroCalificado",component: registroCalificado},
    {path:"/retroalimentacionRed",component: retroalimentacionRed},
    {path:"/instrumentosEvaluacion",component: instrumentosEvaluacion},
]
export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})