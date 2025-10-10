import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'
export interface UniteOrg {
  iduniteorg: number;
  iduoparente: number | null;
  nomuniteorg: string;
  descriptionuniteorg: string;
  bcache: number;
  codeordre: string;
}

export interface Employe {
  idemploye: number
  nom: string
  prenom: string
  bactif: number
  login?: string
  unite?: string
  directionabr?: string
  serviceabr?: string
  unitetree?: string
}

export interface ApiResponseUL {
  success: boolean
  message: string
  data?: UniteOrg[]
}

export interface ApiResponseEL {
  success: boolean
  message: string
  data?: Employe[]
}

// Interface générique pour les réponses API
interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T[]
}

export async function getUnitesOrgListe(server: string = '', page: string, jsonCriteres: string = '{}'): Promise<ApiResponseUL> {
  if (import.meta.env.DEV) {console.log(jsonCriteres)}
  const urluol: string = `${server}${page}`
  const params = new URLSearchParams([['jsoncriteres', jsonCriteres]])
  try {
    const response: AxiosResponse<UniteOrg[]> = await axios.get(urluol, { params })
    const respData: ApiResponseUL = {
      "success": true,
      "message": `ok`,
      "data": response.data
    }
    if (import.meta.env.DEV) {console.log(respData)}
    return respData
  } catch (error) {
    return traiteAxiosError(error as AxiosError)
  }
}

export async function getEmployesListe(server: string = '', page: string, jsonCriteres: string = '{}'): Promise<ApiResponseEL> {
  if (import.meta.env.DEV) {console.log(jsonCriteres)}
  const url: string = `${server}${page}`
  const params = new URLSearchParams([['jsoncriteres', jsonCriteres]])
  try {
    const response: AxiosResponse<Employe[]> = await axios.get(url, { params })
    const respData: ApiResponseEL = {
      "success": true,
      "message": `ok`,
      "data": response.data
    }
    if (import.meta.env.DEV) {console.log(respData)}
    return respData
  } catch (error) {
    return traiteAxiosError(error as AxiosError)
  }
}

function traiteAxiosError<T>(error: AxiosError): ApiResponse<T> {
  let msgErr: string = ''
  if (error.response) {
    msgErr = `${error.response.data}<br>${error.response.status}<br>${error.response.headers}`
  } else if (error.request.responseText) {
    msgErr = error.request.responseText
  } else {
    msgErr = error.message
  }
  const respData: ApiResponse<T> = {
    "success": false,
    "message": `ERREUR. ${msgErr}`,
  }
  return respData
}