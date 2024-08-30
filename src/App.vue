<template>
  <v-app>
    <v-main>
      <div v-if="modeChoix == 'multiple'">
        <EmployeChoix 
          nombreMaximumRetour="50"
          modeChoix="multiple"
          @choixEmploye="receptionEmploye"
        >
        </EmployeChoix>
      </div>
      <div v-else>
        <EmployeChoix 
          nombreMaximumRetour="50"
          modeChoix="unique"
          @choixEmploye="receptionEmploye"
        >
        </EmployeChoix>
      </div>
    </v-main>

  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const urlParams = new URLSearchParams(window.location.search)
let modeChoix = ref('unique')
if (urlParams.has('mode')) {
  modeChoix = ref(urlParams.get('mode'))
}

const receptionEmploye = (idemploye, jsonData) => {
  console.log(`Réception employe(s). id: ${idemploye} \njson: ${jsonData}`)
  if (window.opener && typeof window.opener.receptionEmployes24 === 'function') {
    window.opener.receptionEmployes24(jsonData)
  }
}
</script>
