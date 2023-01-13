import express from 'express'
import {ApiResponseEESS, toEESSDto} from "./models";
import {catchError} from "./utils";
import {useProvincias} from "./services/provincia.service";
import {useEESS} from "./services/eess.service";

const cors = require('cors');
const app = express()

app.use(cors())

app.get("/api/provincias", (req, res) => {
    useProvincias()
        .then((json) => res.send(json))
        .catch((err) => catchError(err, res))
})
app.get("/api/productos", (req, res) => {
    fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/`)
        .then(response => response.json())
        .then((json) => res.send(json))
        .catch((err) => catchError(err, res))
})

app.get("/api/provincias/:search", (req, res) => {
    const {search} = req.params
    useProvincias()
        .then((json) => {
            const privinciasFiltered = json.filter((provincia) => provincia.nombre.toLowerCase().includes(search.toLowerCase()));
            res.send(privinciasFiltered)
        })
        .catch((err) => catchError(err, res))
    }
)


app.get("/api/eess/:provincia/:producto", (req, res) => {
    const {producto, provincia} = req.params
    useEESS(provincia, producto)
        .then((json: ApiResponseEESS) => {
            if (json.ResultadoConsulta !== "OK") {
                return Promise.reject("No results for the parameters provided")
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

app.listen(5000, () => console.log("Serve port at 5000"))