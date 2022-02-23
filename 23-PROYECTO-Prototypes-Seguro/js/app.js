function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {
  /*
    1= Americano 1.15
    2= Asiatico 1.05
    3= Europeo 1.35

    Cada año menor se reduce el 3%
  */

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  //   leer el año
  const diferencia = new Date().getFullYear() - this.year;

  //   cada año que la diferencia es mayor, el costo va a reducir 3%
  cantidad -= (diferencia * 3 * cantidad) / 100;

  //   si el seguro es basico se multiplica por un 30% mas
  //   si el seguro es completo se multiplica por un 50% mas

  if (this.tipo === 'basico') {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
  //   console.log(cantidad);
};

function UI() {}

document.addEventListener('DOMContentLoaded', () => {
  ui.llenarSelect();
});

UI.prototype.llenarSelect = () => {
  const max = new Date().getFullYear();
  const min = max - 20;
  const yearQ = document.querySelector('#year');

  for (let i = max; i > min; i--) {
    const opcion = document.createElement('OPTION');
    opcion.value = i;
    opcion.textContent = i;
    yearQ.appendChild(opcion);
  }
};
// Muestra alerta en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement('DIV');

  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }

  div.classList.add('mensaje', 'mt-10');
  div.textContent = mensaje;

  //   insertar en el html
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.insertBefore(div, document.querySelector('#resultado'));

  setTimeout(() => {
    div.remove();
  }, 2000);
};

UI.prototype.mostrarResultado = (seguro, total) => {
  const { marca, year, tipo } = seguro;
  // crear el resultado
  const div = document.createElement('DIV');
  div.classList.add('mt-10');
  let textoMarca;

  switch (marca) {
    case '1':
      textoMarca = 'Americano';
      break;
    case '2':
      textoMarca = 'Asiatico';
      break;
    case '3':
      textoMarca = 'Europeo';
      break;

    default:
      break;
  }

  div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Tipo de Seguro: <span class="font-normal capitalize"> ${tipo}</span> </p>
        <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca}</span> </p>
        <p class="font-bold">Año: <span class="font-normal"> ${year}</span> </p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span> </p>
    `;
  const resultadoDiv = document.querySelector('#resultado');

  //   mostrar el spinner
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';

  setTimeout(() => {
    //   borra el piner
    spinner.style.display = 'none';
    // muestra el resultado
    resultadoDiv.appendChild(div);
  }, 2000);
};

// instanciar UI
const ui = new UI();

eventListener();
function eventListener() {
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  //   leer la marca seleccionada
  const marca = document.querySelector('#marca').value;

  // leer el año seleccionado
  const year = document.querySelector('#year').value;

  // leear el tipo seguro
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === '' || year === '' || tipo === '') {
    ui.mostrarMensaje('Todos los campos son obligatorio', 'error');
    return;
  }

  ui.mostrarMensaje('Cotizando...', 'exito');

  //   oculatar las cotizaciones previas
  const resultados = document.querySelector('#resultado div');
  if (resultados != null) {
    resultados.remove();
  }

  //   instaciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  // utilizar el prototype que va a cotizar
  console.log(total);
  ui.mostrarResultado(seguro, total);
}
