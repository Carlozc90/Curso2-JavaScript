// Obtener localstore

const nombre = localStorage.getItem('nombre');
console.log(nombre);

const productoJson = localStorage.getItem('producto');
const productoOBJ = JSON.parse(productoJson);
console.log(productoOBJ);

const meses = localStorage.getItem('meses');
const mesesArray = JSON.parse(meses);
console.log(mesesArray);
