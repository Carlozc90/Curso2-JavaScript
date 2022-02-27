const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar

  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    imprimirAlerta('Todos los Campos son obligatorios', 'error');
  }

  // Consultar la API
  consultarApi(ciudad, pais);
}

function imprimirAlerta(mensaje, tipo) {
  const alerta = document.querySelector('.alerta');

  if (!alerta) {
    const divMensaje = document.createElement('div');
    divMensaje.className =
      'px-4 py-3 rounded max-w-lg mx-auto mt-6 text-center border alerta';

    if (tipo === 'error') {
      divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    } else {
      divMensaje.classList.add(
        'bg-green-100',
        'border-green-400',
        'text-green-700'
      );
    }

    divMensaje.textContent = mensaje;

    formulario.appendChild(divMensaje);
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

function consultarApi(ciudad, pais) {
  const appId = '3d20ab61e01518f5db691e372d1389fc';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      //   limpiar resultado html
      limpiarResultado();

      console.log(datos);
      if (datos.cod === '404') {
        imprimirAlerta('Ciudad Incorrecta', 'error');
        return;
      }

      //   imprime la respuesta en el html
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const celsius = kelvinCoversion(temp);
  const celsiusMax = kelvinCoversion(temp_max);
  const celsiusMin = kelvinCoversion(temp_min);

  const nombreCiudad = document.createElement('P');
  nombreCiudad.innerHTML = `Clima en ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl');

  const actual = document.createElement('P');
  actual.innerHTML = `Celsius: ${celsius} &#8451`;
  actual.classList.add('font-bold', 'text-4xl');

  const actualMax = document.createElement('P');
  actualMax.innerHTML = `Max: ${celsiusMax} &#8451`;
  actualMax.classList.add('text-xl');

  const actualmin = document.createElement('P');
  actualmin.innerHTML = `Min: ${celsiusMin} &#8451`;
  actualmin.classList.add('text-xl');

  const resultadoDiv = document.createElement('DIV');
  resultadoDiv.classList.add('text-center', 'text-white');

  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(actualMax);
  resultadoDiv.appendChild(actualmin);
  resultado.appendChild(resultadoDiv);
}

function kelvinCoversion(temp) {
  const celcius = Number(temp - 273.15).toFixed(1);
  return celcius;
}

function limpiarResultado() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  limpiarResultado();
  const divSpinner = document.createElement('DIV');
  divSpinner.classList.add('sk-circle');
  divSpinner.innerHTML = `
    <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    </div> `;

  resultado.appendChild(divSpinner);
}
