<template>
    <div class="q-pa-md">
        <q-table flat bordered title="Treats" :rows="rows" :columns="columns" row-key="id" :filter="filter"
            :loading="loading">

            <template v-slot:top>
                <q-btn style="background-color: green;" :disable="loading" label="Agregar" @click="addRow" />
                <q-btn v-if="rows.length !== 0" class="q-ml-sm" color="primary" :disable="loading" label="Remove row"
                    @click="removeRow" />
                <q-space />
                <q-input borderless dense debounce="300" color="primary" v-model="filter">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

        </q-table>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = [
    { name: 'nombre', align: 'center', label: 'Instructor', },
    { name: 'estado', label: 'Estado', align: 'center' },
    { name: 'email', label: 'E-mail', align: 'center' },
    { name: 'telefono', label: 'Telefono', align: 'center' },
]
const originalRows = [
]

const loading = ref(false)
const filter = ref('')
const rowCount = ref(10)
const rows = ref([...originalRows])
function addRow() {
    loading.value = true
    setTimeout(() => {
        const
            index = Math.floor(Math.random() * (rows.value.length + 1)),
            row = originalRows[Math.floor(Math.random() * originalRows.length)]

        if (rows.value.length === 0) {
            rowCount.value = 0
        }

        row.id = ++rowCount.value
        const newRow = { ...row } 
        rows.value = [...rows.value.slice(0, index), newRow, ...rows.value.slice(index)]
        loading.value = false
    }, 500)
}

function removeRow() {
    loading.value = true
    setTimeout(() => {
        const index = Math.floor(Math.random() * rows.value.length)
        rows.value = [...rows.value.slice(0, index), ...rows.value.slice(index + 1)]
        loading.value = false
    }, 500)
}
</script>