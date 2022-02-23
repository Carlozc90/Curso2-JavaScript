// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos

eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

  formulario.addEventListener('submit', agregarGasto);
}

// Classes
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }

  calcularRestante() {
    const gastado = this.gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    this.restante = this.presupuesto - gastado;

    console.log(this.restante);
  }

  deleteGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id != id);
    console.log(this.gastos);
    this.calcularRestante();
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('text-center', 'alert');

    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

    // mensaje error
    divMensaje.textContent = mensaje;

    // insertar html
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  mostrarGasto(gastos) {
    //   Limpiar HTML
    this.limpiarHtml();

    // interar sobres los gastos

    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      // crear un li
      const li = document.createElement('LI');
      li.className =
        'list-group-item d-flex justify-content-between aling-items-center';
      //   li.setAttribute('data-id', id);
      li.dataset.id = id;

      //   agregar gasto
      li.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad} </span>`;

      // boton para borrar el gasto
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times;';
      btnBorrar.onclick = () => {
        eliminarGasto(id);
      };
      li.appendChild(btnBorrar);

      // agregar el html del gasto
      gastoListado.appendChild(li);
    });
  }

  limpiarHtml() {
    while (gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }

  actualizarRestante(rest) {
    document.querySelector('#restante').textContent = rest;
  }

  comprobarPresupuesto(pree) {
    const { presupuesto, restante } = pree;

    const restanteDiv = document.querySelector('.restante');

    // Comprobar 25%
    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove('alert-succes', 'alert-warning');
      restanteDiv.classList.add('alert-danger');
      console.log('ya gastaste el 75%');
    } else if (presupuesto / 2 > restante) {
      restanteDiv.classList.remove('alert-succes');
      restanteDiv.classList.add('alert-warning');
    } else {
      restanteDiv.classList.remove('alert-danger', 'alert-danger');
      restanteDiv.classList.add('alert-succes');
    }

    if (restante <= 0) {
      ui.imprimirAlerta('El Presupuesto se ha agotado', 'error');
      formulario.querySelector('button[type="submit"]').disabled = true;
    }
  }
}

// Instanciar
const ui = new UI();
let presupuesto;

// Funciones

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('Cual es tu presupuesto');

  if (
    presupuestoUsuario === '' ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  //   presupuesto valido
  presupuesto = new Presupuesto(presupuestoUsuario);

  //   insertando presupuesto
  ui.insertarPresupuesto(presupuesto);
}

// añade gastos
function agregarGasto(e) {
  e.preventDefault();

  // leer los datos del formulario
  const nombre = document.querySelector('#gasto').value;
  const cantidad = Number(document.querySelector('#cantidad').value);

  // validar

  if (nombre === '' || cantidad === '') {
    ui.imprimirAlerta('Campos son obligatorios', 'error');
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta('cantidad no validad', 'error');
    return;
  }

  //   generar un objeto con el gasto
  const gasto = { nombre, cantidad, id: Date.now() };

  //   añade un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  //   mensaje bien
  ui.imprimirAlerta('Gasto Agregado Correctamente');

  //   Imprimir los gastos
  const { gastos, restante } = presupuesto;
  ui.mostrarGasto(gastos);

  ui.actualizarRestante(restante);

  ui.comprobarPresupuesto(presupuesto);

  //   reinicia el formulario
  formulario.reset();
}

function eliminarGasto(id) {
  // elimina del objeto
  presupuesto.deleteGasto(id);
  //   elimina del html
  const { gastos, restante } = presupuesto;
  ui.mostrarGasto(gastos);

  ui.actualizarRestante(restante);

  ui.comprobarPresupuesto(presupuesto);
}
