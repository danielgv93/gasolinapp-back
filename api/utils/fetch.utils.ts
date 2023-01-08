export const xmlToJson = (response: Response) => {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(response.statusText)
}
export const catchError = (err: any, res: any) => res.status(500).send({"errorMessage": err})