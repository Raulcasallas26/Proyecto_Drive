import {ref} from "vue"

const urlBackend= "https://repositorio-sena.onrender.com"

// local = "http://localhost:3500"
// render = ""

//loading de esperar mientrar cargan las tablas de las paginas
let load = ref( false )

let rolUser = ref ()

export{urlBackend, load }