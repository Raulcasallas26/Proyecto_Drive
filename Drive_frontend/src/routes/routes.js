import principal from "../components/principal.vue"
import login from "../components/login.vue"
import tiket from "../components/tiket.vue"
import rutas from "../components/rutas.vue"
import usuarios from "../components/usuarios.vue"
import usuario from "../components/usuario.vue"
import buses from "../components/buses.vue"
import ventas from "../components/venta.vue"
import conductor from "../components/conductor.vue"
import cliente from "../components/clientes.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes=[
    {path:"/", component:principal},
    {path:"/login", component:login},
    {path:"/tickets", component:tiket},
    {path:"/rutas", component:rutas},
    {path:"/conduc",component:conductor},
    {path:"/usuarios", component:usuarios},
    {path:"/usuario", component:usuario},
    {path:"/buses", component:buses},
    {path:"/ventas", component:ventas},
    {path:"/cliente", component:cliente},
    ]
export const router = createRouter({
    history:createWebHashHistory(),
    routes
})