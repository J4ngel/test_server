const express = require('express')
const cors = require('cors')
const app = express()

//configurar express
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

//configurar de rutas
app.all('/', (req, res)=>{
    //El codigo para esa peticion
    res.send('Hola esta es la respuesta de mi petición raíz')
})

app.get('/getProducts', (req, res)=>{
    console.log("PETICION /GETPRODUCTS REALIZADA")
    
    const read_products = [
        {"id": "1A", "nombre": "Cocacola", "precio": "4200", "cantidad":3},
        {"id": "2B", "nombre": "Doritos", "precio": "3500", "cantidad":10},
        {"id": "3C", "nombre": "Gomitas", "precio": "2750", "cantidad":7},
    ]

    res.status(200).json({status: "OK", products: read_products})
})

app.get('/searchProduct', (req, res)=>{
    console.log("PETICION /SEARCHPRODUCT REALIZADA")
    if (Object.keys(req.query).length === 0) {
        res.status(400).json({error: "Se requiere ID o nombre del producto"})
    }

    let product = {}

    if (req.query.hasOwnProperty('ID')) {
        if (req.query.ID === "1A") {
           product = {"id": "1A", "nombre": "Cocacola", "precio": "4200", "cantidad":3}
        }else if (req.query.ID === "2B"){
           product = {"id": "2B", "nombre": "Doritos", "precio": "3500", "cantidad":10}
        }else if (req.query.ID === "3C") {
           product = {"id": "3C", "nombre": "Gomitas", "precio": "2750", "cantidad":7}
        } else {
            res.status(404).json({error: "Producto No encontrado"})
        }    
    }else if (req.query.hasOwnProperty('name')) {
        if (req.query.name === "Cocacola") {
            product = {"id": "1A", "nombre": "Cocacola", "precio": "4200", "cantidad":3}
         }else if (req.query.name === "Doritos"){
            product = {"id": "2B", "nombre": "Doritos", "precio": "3500", "cantidad":10}
         }else if (req.query.name === "Gomitas") {
            product = {"id": "3C", "nombre": "Gomitas", "precio": "2750", "cantidad":7}
         } else {
             res.status(404).json({error: "Producto No encontrado"})
         }  
    } else {
        res.status(400).json({error: "Se requiere ID o nombre del producto"})
    }
    
    res.status(200).json({status: "OK", product: product})
})

app.post('/createUser', (req, res) => {
    console.log("PETICION /CREATEUSER REALIZADA")
    console.log(req.body)
    if (!req.body.hasOwnProperty('nombre') || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        res.status(400).json({error:"Para crear un usuario se requiere contraseña, nombre y correo electronico"})
    }
    res.status(201).json({status:"OK", msj: "Usuario creado con éxito"})
})
//Iniciar escucha del puerto
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})