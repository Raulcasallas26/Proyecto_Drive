import {ref} from "vue"

const urlBackend= "http://localhost:3500"

// local = ""
// render = "https://repositorio-sena.onrender.com"

//loading de esperar mientrar cargan las tablas de las paginas
let load = ref( false )



export{urlBackend, load }