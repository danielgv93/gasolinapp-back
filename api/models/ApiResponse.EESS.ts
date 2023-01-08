import {EESSDto} from "./EESS.model";
import {stringToNumber} from "../utils";


export interface ApiResponseEESS {
    Fecha: Date;
    ListaEESSPrecio: ApiListaEESSPrecio[];
    Nota: string;
    ResultadoConsulta: string;
}

export interface ApiListaEESSPrecio {
    IDEESS: string;
    Horario: string;
    Direccion: string;
    "C.P.": string;
    Latitud: string;
    "Longitud (WGS84)": string;
    IDCCAA: string;
    IDProvincia: string;
    Provincia: string;
    IDMunicipio: string;
    Municipio: string;
    Localidad: string;
    Remision: string;
    Rótulo: string;
    TipoVenta: string;
    Margen: string;
    PrecioProducto: string;

}

export const toEESSDto = (apiResponse: ApiResponseEESS): EESSDto[] => {
    return apiResponse.ListaEESSPrecio.map((eess) => {
        return {
            id: parseInt(eess.IDEESS),
            details: {
                cp: parseInt(eess["C.P."]),
                coord: {
                    lat: parseFloat(eess.Latitud),
                    lon: parseFloat(eess["Longitud (WGS84)"])
                },
                localidad: {
                    id: parseInt(eess.IDMunicipio),
                    nombre: eess.Localidad
                },
                direccion: eess.Direccion,
                provincia: {
                    id: parseInt(eess.IDProvincia),
                    nombre: eess.Provincia
                },
                municipio: {
                    id: parseInt(eess.IDMunicipio),
                    nombre: eess.Municipio
                },
                ccaa: eess.IDCCAA
            },
            precio: stringToNumber(eess.PrecioProducto)
        }
    })
}
