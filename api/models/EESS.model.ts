import {RegionType} from "./shared.model";

export interface EESSDto {
    id: number;
    details: EESSDetails;
    precio: number;
}

export type Coord = {
    lat: number;
    lon: number;
}

export type EESSDetails = {
    cp: number;
    coord: Coord;
    localidad: RegionType;
    direccion: string;
    provincia: RegionType;
    municipio: RegionType;
    ccaa: string;
}