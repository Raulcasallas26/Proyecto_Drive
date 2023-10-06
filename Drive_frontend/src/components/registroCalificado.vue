<template>
    <q-layout view="lHh lpR lFf">
        <div class="q-pa-md row items-start q-gutter-md" id="cart">
            <h3>Registro Calificado</h3>
            <q-card class="my-card" flat bordered>
                <div class="q-pa-md row items-start q-gutter-md">
                    <q-card class="my-card" flat bordered>
                        <q-list>
                            <q-item clickable>
                                <q-item-section avatar>
                                    <q-icon color="primary" name="keyboard_arrow_right" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Bar XYZ</q-item-label>
                                    <q-item-label caption>Have a drink.</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable>
                                <q-item-section avatar>
                                    <q-icon color="primary" name="keyboard_arrow_right" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Bar XYZ</q-item-label>
                                    <q-item-label caption>Have a drink.</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable>
                                <q-item-section avatar>
                                    <q-icon color="primary" name="keyboard_arrow_right" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Bar XYZ</q-item-label>
                                    <q-item-label caption>Have a drink.</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                    </div>
                    <q-card-actions>
    <q-btn label="Right" icon="keyboard_arrow_right" color="primary" @click="open('right')" />
    <q-btn label="Right" icon="keyboard_arrow_right" color="primary" @click="open('right')" />

                        <q-space />

                        <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                            @click="expanded = !expanded" />
                    </q-card-actions>

                    <q-slide-transition>
                        <div v-show="expanded">
                            <q-separator />
                            <q-card-section class="text-subtitle2">
                                {{ lorem }}
                            </q-card-section>
                        </div>
                    </q-slide-transition>
            </q-card>
        </div>

    </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'


</script>
<style scoped>
.imagen {
    display: flex;
    height: 100vh;
    margin: 0;
    padding: 0;
    border: 1px solid #ccc;
    overflow: hidden;
    background-color: black;
    position: relative;
}

/* #card {
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 10%;
    display: block;
    align-items: center;
    justify-content: center;
    border: 3px solid rgba(29, 88, 32, 0.35);
    border-radius: 10px;
} */

#cart {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}

#img {
    max-width: 100%;
    max-height: 100%;
    height: 100vh;
    display: flex;
    margin-bottom: 0;
    border-radius: 2px;
    border: 0.5px solid #999;
    object-fit: cover;
    object-position: center;
}
</style> 