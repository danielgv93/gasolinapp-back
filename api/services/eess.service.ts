import {xmlToJson} from "../utils";

export const useEESS = (idProvincia: string, idProducto: string) => {
    return fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvinciaProducto/${idProvincia}/${idProducto}`)
        .then(xmlToJson)
}