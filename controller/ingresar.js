const { response, request } = require('express') 
const {productos} = require('../helpers/almacenarProductos')

const ingresarProducto = (req,res=response)=>{
    res.render('ingresar',{productos})
}

module.exports = {
    ingresarProducto
}