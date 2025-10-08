<template>
  <v-container>
    <v-row no-gutters align="center">
      <v-col cols="auto">
        <v-btn icon size="small" @click="choixUnite" title="Choisir une unité organisationnelle">
          <v-icon size="small">mdi-sitemap</v-icon>
        </v-btn>

      </v-col>
      <v-col cols="auto" class="ml-2">
        unité organisationnelle:
      </v-col>
      <v-col cols="auto" class="ml-2">
        <strong>{{ critereUniteLibelle }}</strong>
      </v-col>
      <v-col cols="auto" class="ml-2">
        <v-btn icon size="small" @click="supprimeCritereUnite" title="Supprimer le critère d'unité organisationnelle">
          <v-icon size="small">mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="8" md="3">
        <v-text-field clearable v-model="txtCritere" ref="inpTxtCritere" autofocus label="nom / login / id"
          @input="onInputCritere"></v-text-field>
      </v-col>
      <v-col cols="8" md="2">
        <v-checkbox v-model="bEmployeDesactive" label="y.c. employés désactivés" @click="onInputCritere">
        </v-checkbox>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialogChoixUO" max-width="1280">
    <v-card>
      <v-card-text>
        <Suspense>
          <UniteOrgChoix :ssServer="ssServer" @choixUniteOrg="receptionUniteOrg"></UniteOrgChoix>
        </Suspense>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fermer" @click="closeChoixUO()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">
import type { VTextField } from 'vuetify/components'

import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { detectStringType } from '../employeChoix'
import UniteOrgChoix from './UniteOrgChoix.vue'

interface Props {
  modeChoix?: string
  nombreMaximumRetour?: number
  ssServer?: string
  ssPage?: string
}

const props = withDefaults(defineProps<Props>(), {
  modeChoix: 'unique',
  nombreMaximumRetour: 100,
  ssServer: '',
  ssPage: '/goeland/employe/axios/employe_liste.php'
})

interface UniteOrganisationnelle {
  id: number
  nom: string
  description: string
}

const critereUniteId = ref<number>(0)
const critereUniteLibelle = ref<string>('- toutes -')
const txtCritere = ref<string>('')
const bEmployeDesactive = ref<boolean>(false)
const inpTxtCritere = ref<VTextField | null>(null)
const dialogChoixUO = ref<boolean>(false)

let typingTimer: ReturnType<typeof setTimeout> | null = null
const typingInterval: number = 700
const onInputCritere = (value: string | null | undefined): void => {
  // console.log('oninput')

  // Nettoyer le timer précédent s'il existe
  if (typingTimer) {
    clearTimeout(typingTimer)
  }

  // Créer un nouveau timer
  typingTimer = setTimeout(() => {
    prepareRechercheEmployes()
  }, typingInterval)

  // Focus sur l'input avec vérification de sécurité
  const inputElement = inpTxtCritere.value?.$el?.querySelector('input') as HTMLInputElement | null
  inputElement?.focus()
}

const prepareRechercheEmployes = (): void => {
  const critere: string = txtCritere.value
  const typeCritere: string = detectStringType(txtCritere.value)
  console.log(`todo la suite ${typeCritere} ${critere}`)
}

const choixUnite = (): void => {
  dialogChoixUO.value = true
}

const receptionUniteOrg = (jsonData: string) => {
  dialogChoixUO.value = false
  console.log(`Réception unité organisationnelle \njson: ${jsonData}`)
  const uoChoisie: UniteOrganisationnelle = JSON.parse(jsonData)
  critereUniteId.value = uoChoisie.id
  critereUniteLibelle.value = uoChoisie.description
  if (critereUniteId.value > 1) {
    prepareRechercheEmployes()
  }

}

const supprimeCritereUnite = (): void => {
  critereUniteId.value = 0
  critereUniteLibelle.value = '- toutes -'
}

const closeChoixUO = (): void => {
  dialogChoixUO.value = false
  critereUniteId.value = 0
}

</script>

<style scoped></style>