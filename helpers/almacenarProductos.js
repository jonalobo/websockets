const productos = []

const agregarProducto = (data) => {
    productos.push(data)
}

module.exports = {
    agregarProducto,
    productos
}