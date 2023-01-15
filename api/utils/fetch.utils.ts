import {Response} from "node-fetch";

export const xmlToJson = (value: Response): any => {
    if (value.ok) {
        return value.json()
    }
    return Promise.reject(value.statusText)
}
export const catchError = (err: any, res: any) => res.status(500).send({"errorMessage": err})