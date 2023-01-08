export const stringToNumber = (str: string): number => {
    if (str.includes(",")) {
        return parseFloat(str.replace(",", "."))
    }
    return parseFloat(str)
}