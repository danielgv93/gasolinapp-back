import {RegionType} from "./shared.model";
import {ApiResponseProvincia} from "./ApiResponse.Provincia";

export interface ProvinciaDto {
    id: number;
    nombre: string;
    ccaa: RegionType;
}

export const toProvinciaDto = (apiResponse: ApiResponseProvincia): ProvinciaDto[] => {
    return apiResponse.map((provincia) => {
        return {
            id: parseInt(provincia.IDPovincia),
            nombre: provincia.Provincia,
            ccaa: {
                id: parseInt(provincia.IDCCAA),
                nombre: provincia.CCAA
            }
        }
    })
}