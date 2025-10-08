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

export interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: UniteOrg[];
}

export async function getUnitesOrgListe(server: string = '', page: string, jsonCriteres: string = '{}'): Promise<ApiResponse> {
    console.log(jsonCriteres)
    const urluol: string = `${server}${page}`
    const params = new URLSearchParams([['jsoncriteres', jsonCriteres]])
    try {
        const response: AxiosResponse<UniteOrg[]> = await axios.get(urluol, { params })
        const respData: ApiResponse = {
            "success": true,
            "message": `ok`,
            "data": response.data
        }
        console.log(respData)
        return respData
    } catch (error) {
        return traiteAxiosError(error as AxiosError)
    }
}

function traiteAxiosError(error: AxiosError): ApiResponse {
    let msgErr: string = ''
    if (error.response) {
        msgErr = `${error.response.data}<br>${error.response.status}<br>${error.response.headers}`    
    } else if (error.request.responseText) {
        msgErr = error.request.responseText
    } else {
        msgErr = error.message
    }
    const respData: ApiResponse = {
        "success": false,
        "message": `ERREUR. ${msgErr}`,
    }
    return(respData)
}