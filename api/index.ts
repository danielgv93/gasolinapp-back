import express from 'express'
import {ApiResponseEESS, toEESSDto} from "./models";
import {ProvinciaDto} from "./models/Provincia.model";
import {catchError, readFile} from "./utils";
import {useEESS} from "./services/eess.service";

const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 3030;

app.use(cors())

app.get("/api/provincias", (req, res) => {
    const provincias = readFile<ProvinciaDto[]>("api/db/provincias.json")
    res.send(provincias)
})
app.get("/api/productos", (req, res) => {
    const productos = readFile<unknown[]>("api/db/productos.json");
    res.send(productos)
})

app.get("/api/provincias/:search", (req, res) => {
    const {search} = req.params
    const provinciasFiltered = readFile<ProvinciaDto[]>("api/db/provincias.json")
        .filter((provincia) => provincia.nombre.toLowerCase().includes(search.toLowerCase()));
    res.send(provinciasFiltered)
    }
)


app.get("/api/eess/:provincia/:producto", (req, res) => {
    const {producto, provincia} = req.params
    useEESS(provincia, producto)
        .then((json: ApiResponseEESS) => {
            if (json.ResultadoConsulta !== "OK") {
                return Promise.reject(json.ResultadoConsulta ?? "No results for the parameters provided")
            }
            const eessArray = toEESSDto(json)
            const averagePrecio = eessArray
                .map(eess => eess.precio)
                .reduce((acc, precio) => acc + precio, 0) / eessArray.length
            res.send({precio: averagePrecio})
        })
        .catch((err) => catchError(err, res))
})



app.use((req, res) => {
    res.status(404).send({"errorMessage": "api endpoint not found"})
});

app.listen(PORT, () => console.log(`Serve port at ${PORT}`))