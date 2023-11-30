import home from "../components/home.vue"
import login from "../components/login.vue"
import guias from "../components/guias.vue";
import roles from "../components/rolesusu.vue";
import usuarios from "../components/usuarios.vue"
import ambientes from "../components/ambiente.vue"
import programas from "../components/programas.vue"
import proyectos from "../components/proyectos.vue"
import centrosforma from "../components/centroforma.vue"
import instructores from "../components/instructores.vue"
import investigacion from "../components/investigacion.vue"
import configuracion from "../components/configuracion.vue"
import nivelesforma from "../components/NivelesFormacion.vue"
import redConocimiento from "../components/redConocimiento.vue"
import materialesforma from "../components/materialesforma.vue";
import materialesApoyo from "../components/materialesApoyo.vue"
import registroCalificado from "../components/registroCalificado.vue";
import retroalimentacionRed from "../components/retroalimentacionRed.vue"
import desarrolloCurricular from "../components/DesarrolloCurricular.vue"
import instrumentosEvaluacion from "../components/instrumentosEvaluacion.vue"
import { createRouter, createWebHashHistory } from "vue-router"
import { useLoginStore } from "../stores/login";

const checkAuth = () => {
    const useLogin = useLoginStore()
    const token = useLogin.token
    console.log(token);

    if (!token) return false
    return true
}

const auth = (to, from, next) => {
    if (checkAuth) {
        const useLogin = useLoginStore()
        const role = useLogin.rol

        if (!to.meta.rol.includes(role)) {
            useLogin.logout()
            return next({ name: "login" })
        }
        next()
    } else {
        next({ name: "login" })
    }
}

const routes = [
    { path: "/", component: login, name: "login" },
    { path: "/home", component: home, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/roles", component: roles, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/guias", component: guias, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/usuarios", component: usuarios, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/programas", component: programas, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/ambientes", component: ambientes, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/proyectos", component: proyectos, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/niveles", component: nivelesforma, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/centroforma", component: centrosforma, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/instructores", component: instructores, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/configuracion", component: configuracion, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/investigacion", component: investigacion, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/redConocimento", component: redConocimiento, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/materialesforma", component: materialesforma, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/materialesApoyo", component: materialesApoyo, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/registroCalificado", component: registroCalificado, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/retroalimentacionRed", component: retroalimentacionRed, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/desarrolloCurricular", component: desarrolloCurricular, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
    { path: "/instrumentosEvaluacion", component: instrumentosEvaluacion, meta: { rol: ["Super", "Gestor", "Administrador", "Instructor"] }, beforeEnter: auth },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})