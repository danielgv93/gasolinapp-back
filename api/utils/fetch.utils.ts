

export const xmlToJson = (value: any): any => {
    if (value.ok) {
        return value.json()
    }
    return Promise.reject(value.statusText)
}
export const catchError = (err: any, res: any) => res.status(500).send({"errorMessage": err})

// @ts-ignore
export const fetch = (url: RequestInfo, init?: RequestInit) =>  import("node-fetch").then(({ default: fetch }) => fetch(url, init));