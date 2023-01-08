import {xmlToJson} from "../utils";
import {toProvinciaDto} from "../models/Provincia.model";
import {ApiResponseProvincia} from "../models";

export const useProvincias = () => {
    return fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/`)
        .then(xmlToJson)
        .then((json: ApiResponseProvincia) => toProvinciaDto(json))
}