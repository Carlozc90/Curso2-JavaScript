// campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// editar
let editando;

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }

  editarCita(citaActualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    );
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    //   crear el div
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    // Si es de tipo error agrega una clase
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    // Insertar en el DOM
    document
      .querySelector('#contenido')
      .insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    //   tiempo de borrado

    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  impromirCitas({ citas }) {
    this.limpiarHtml();

    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      const divCita = document.createElement('DIV');
      divCita.className = 'cita p-3';
      divCita.dataset.id = id;

      //   Scripting de los elementos de la cita
      const mascotaParrafo = document.createElement('H2');
      mascotaParrafo.className = 'card-title font-weight-bolder';
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement('P');
      propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario: </span>${propietario}
      `;

      const telefonoParrafo = document.createElement('P');
      telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono: </span>${telefono}
      `;

      const fechaParrafo = document.createElement('P');
      fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha: </span>${fecha}
      `;

      const horaParrafo = document.createElement('P');
      horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora: </span>${hora}
      `;

      const sintomaParrafo = document.createElement('P');
      sintomaParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas: </span>${sintomas}
      `;

      //   boton para elimiar esta cita
      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-danger mr-2';
      btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`;
      btnEliminar.onclick = () => {
        eliminarCita(id);
      };

      //   añade un boton para editar
      const btnEditar = document.createElement('button');
      btnEditar.className = 'btn btn-info';
      btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`;
      btnEditar.onclick = () => cargaEditarCita(cita);

      // agregar los parrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomaParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      // agregar los citas html
      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHtml() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const ui = new UI();
const administrarCitas = new Citas();

// registrar eventos
eventListeners();
function eventListeners() {
  mascotaInput.addEventListener('change', datosCita);
  propietarioInput.addEventListener('change', datosCita);
  telefonoInput.addEventListener('change', datosCita);
  fechaInput.addEventListener('change', datosCita);
  horaInput.addEventListener('change', datosCita);
  sintomasInput.addEventListener('change', datosCita);

  formulario.addEventListener('submit', nuevaCita);
}

// objeto con la informacion de la cita
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};

// agrega datos al objeto cita
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

// valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
  e.preventDefault();

  // extraer la informacion de objeto de cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  //   validar
  if (
    mascota === '' ||
    propietario === '' ||
    telefono === '' ||
    fecha === '' ||
    hora === '' ||
    sintomas === ''
  ) {
    ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
    return;
  }

  // editar
  if (editando) {
    console.log('modo edit');
    ui.imprimirAlerta('Editado correctamente');

    //   pasar el objeto de la cita a edicion
    administrarCitas.editarCita({ ...citaObj });

    // regresa el texto del boton a su estado original
    formulario.querySelector('button[type="submit"]').textContent =
      'Crear Cita';

    //   quitar modo edicion
    editando = false;
  } else {
    console.log('modo cita');
    //   generar un id unico
    citaObj.id = Date.now();

    // creando una nueva cita
    administrarCitas.agregarCita({ ...citaObj });

    // mensaje de agregado correctamente
    ui.imprimirAlerta('Se agrego correctamente');
  }

  //   reinicia el formulario
  formulario.reset();
  //   reiniciar el objto
  reiniciarObj();

  //   mostrar el html de las citas
  ui.impromirCitas(administrarCitas);
}

function reiniciarObj() {
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
}

function eliminarCita(id) {
  //   eliminar la cita
  administrarCitas.eliminarCita(id);

  // muestre un mensaje
  ui.imprimirAlerta('La cita se elimino correctamente');

  // actualiza contenido cita
  ui.impromirCitas(administrarCitas);
}

// carga editar cita
function cargaEditarCita(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  // Lllena los inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  //   llenar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  //   Cambiar el texto del boton
  formulario.querySelector('button[type="submit"]').textContent =
    'Guardar Cambios';

  editando = true;
}
