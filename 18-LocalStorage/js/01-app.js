localStorage.setItem('nombre', 'juan');

sessionStorage.setItem('nombre', 'luis');

// convertir a un string
const producto = {
  nombre: 'Monitor 24 Pulgadas',
  precio: 300,
};
const meses = ['Enero', 'Febrero', 'Marzo'];

const mesesString = JSON.stringify(meses);
localStorage.setItem('meses', mesesString);

const productoString = JSON.stringify(producto);
localStorage.setItem('producto', productoString);
