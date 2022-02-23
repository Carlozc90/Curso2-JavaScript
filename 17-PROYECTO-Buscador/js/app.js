// Variables
const resultado = document.querySelector('#resultado');

const marcaQ = document.querySelector('#marca');
const yearQ = document.querySelector('#year');
const minimoQ = document.querySelector('#minimo');
const maximoQ = document.querySelector('#maximo');
const puertasQ = document.querySelector('#puertas');
const transmisionQ = document.querySelector('#transmision');
const colorQ = document.querySelector('#color');

const max = new Date().getFullYear();
const min = max - 10;

// Generar un Objeto con la busqueda

const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
};

// eventos
document.addEventListener('DOMContentLoaded', () => {
  // Muestra los autos al cargar
  mostrarAutos(autos);

  // llena los opciones de años
  llenaSelect();
});

// Event listener para los select
marcaQ.addEventListener('change', (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});
yearQ.addEventListener('change', (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});
minimoQ.addEventListener('change', (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});
maximoQ.addEventListener('change', (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});
puertasQ.addEventListener('change', (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});
transmisionQ.addEventListener('change', (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});
colorQ.addEventListener('change', (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

// funciones
function mostrarAutos(car) {
  car.forEach((auto) => {
    const autoHTML = document.createElement('P');

    autoHTML.textContent = `
      ${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Trasmision: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}
    `;

    // insertar en el html
    resultado.appendChild(autoHTML);
  });
}

function llenaSelect() {
  for (let i = max; i > min; i--) {
    // console.log(i);

    const opcion = document.createElement('OPTION');

    opcion.value = i;
    opcion.textContent = i;

    yearQ.appendChild(opcion);
  }
}

function filtrarAuto() {
  limpiarAuto();
  const resl = autos
    .filter(marcaFilter)
    .filter(filtarYear)
    .filter(filtarMin)
    .filter(filtarMax)
    .filter(filtarDoor)
    .filter(filtarTras)
    .filter(filtarColor);

  console.log(resl);

  // mostrar resultado
  if (resl.length) {
    mostrarAutos(resl);
  } else {
    noResultado();
  }
}

function limpiarAuto() {
  // foma lenta-
  // contenedorCarrito.innerHTML = '';

  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function marcaFilter(au) {
  const { marca } = datosBusqueda;
  if (marca) {
    return au.marca === marca;
  }
  return au;
}

function filtarYear(au) {
  const { year } = datosBusqueda;
  if (year) {
    return au.year === year;
  }
  return au;
}

function filtarMin(au) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return au.precio >= minimo;
  }
  return au;
}

function filtarMax(au) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return au.precio <= maximo;
  }
  return au;
}

function filtarDoor(au) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return au.puertas === puertas;
  }
  return au;
}

function filtarTras(au) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return au.transmision === transmision;
  }
  return au;
}

function filtarColor(au) {
  const { color } = datosBusqueda;
  if (color) {
    return au.color === color;
  }
  return au;
}

function noResultado() {
  const noResultado = document.createElement('DIV');
  noResultado.classList.add('alerta', 'error');
  noResultado.textContent = 'No Hay Resulatdo';
  resultado.appendChild(noResultado);
}
