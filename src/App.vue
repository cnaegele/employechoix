<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row dense>
          <v-col>
            <h3>Choix employés</h3>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-radio-group v-model="modeChoix" inline>
              <v-radio label="Choix unique" value="unique"></v-radio>
              <v-radio label="Choix multiple" value="multiple"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense><v-col>JSON Réception employé(s) : <br></br>{{ strjson }}</v-col></v-row>
      </v-container>
      <v-divider thickness="5px"></v-divider>
      <EmployeChoix :ssServer="ssServer" @choixEmploye="receptionEmploye" :modeChoix="modeChoix"></EmployeChoix>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EmployeChoix from './components/EmployeChoix.vue';

const modeChoix = ref<string>('unique')
const strjson = ref<string>('')
const ssServer = ref<string>('')
if (import.meta.env.DEV) {
  ssServer.value = 'https://mygolux.lausanne.ch'
}

const receptionEmploye = (jsonData: string) => {
  strjson.value = jsonData
}  
</script>
