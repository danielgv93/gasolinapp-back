import {fetch, xmlToJson} from "../utils";
import { AbortController } from "node-abort-controller";

export const useEESS = (idProvincia: string, idProducto: string) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 10000);
    return fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvinciaProducto/${idProvincia}/${idProducto}`, {signal})
        .then(xmlToJson)
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch request timed out');
                throw new Error("Fetch request timed out")
            } else {
                console.log('Other fetch error:', error);
            }
        })
}