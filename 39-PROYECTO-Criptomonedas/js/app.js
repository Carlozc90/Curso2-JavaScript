const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
  moneda: '',
  criptomoneda: '',
};

// Crear un Promise
const obtenerCriptomonedas = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

document.addEventListener('DOMContentLoaded', () => {
  consultarCripto();

  formulario.addEventListener('submit', submitFormulario);

  criptomonedasSelect.addEventListener('change', leerValor);
  monedaSelect.addEventListener('change', leerValor);
});

function consultarCripto() {
  const url =
    'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => obtenerCriptomonedas(resultado.Data))
    .then((criptomonedas) => selectCriptomonedas(criptomonedas))
    .catch((error) => console.log(error));
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;

    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;
    criptomonedasSelect.appendChild(option);
  });
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
  e.preventDefault();

  //   validar

  const { moneda, criptomoneda } = objBusqueda;

  if (moneda === '' || criptomoneda === '') {
    mostrarAlerta('Ambos Campos son obligatorios');
    return;
  }

  //   consutar la Api con los resultados
  consultarApi();
}

function mostrarAlerta(msg) {
  const alerta = document.querySelector('.error');
  if (!alerta) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');

    //   mensaje de error
    divMensaje.textContent = msg;
    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

function consultarApi() {
  const { moneda, criptomoneda } = objBusqueda;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  mostrarSpinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      mostrarCotizacionHtml(resultado.DISPLAY[criptomoneda][moneda]);
    })
    .catch((error) => console.log(error));
}

function mostrarCotizacionHtml(cotizacion) {
  limpiarHtml();

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

  const precio = document.createElement('P');
  precio.classList.add('precio');
  precio.innerHTML = `El Precio es: <span>${PRICE}</span>`;

  const precioAlto = document.createElement('P');
  precioAlto.innerHTML = `El Precio Alto es: <span>${HIGHDAY}</span>`;

  const precioBajo = document.createElement('P');
  precioBajo.innerHTML = `El Precio Bajo es: <span>${LOWDAY}</span>`;

  const ultimaHoras = document.createElement('P');
  ultimaHoras.innerHTML = `El Precio de las ultimas 24 horas es: <span>${CHANGEPCT24HOUR}</span>`;

  const ultimaUpdate = document.createElement('P');
  ultimaUpdate.innerHTML = `El Precio Bajo es: <span>${LASTUPDATE}</span>`;

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(ultimaHoras);
  resultado.appendChild(ultimaUpdate);
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner() {
  limpiarHtml();

  const spinner = document.createElement('DIV');
  spinner.classList.add('spinner');
  spinner.innerHTML = `<div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>`;

  resultado.appendChild(spinner);
}
