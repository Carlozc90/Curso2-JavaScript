let cliente = {
  mesa: '',
  hora: '',
  pedido: [],
};

const categorias = {
  1: 'Comida',
  2: 'Bebidas',
  3: 'Postres',
};

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardaCliente);

function guardaCliente() {
  const mesa = document.querySelector('#mesa').value;
  const hora = document.querySelector('#hora').value;

  // revisar si los campos son vacios

  const camposVacios = [mesa, hora].some((campo) => campo === '');

  if (camposVacios) {
    const existe = document.querySelector('.existe');

    if (!existe) {
      const alerta = document.createElement('DIV');
      alerta.classList.add(
        'existe',
        'invalid-feedback',
        'd-block',
        'text-center'
      );
      alerta.textContent = 'Todos los campos son obligatorios';
      document.querySelector('.modal-body form').appendChild(alerta);

      setTimeout(() => {
        alerta.remove();
      }, 3000);
    }
  } else {
    // asignar datos del formulario a cliente
    cliente = { ...cliente, mesa, hora };
    // Ovultar Modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    // mostrar las secciones
    mostrarSecciones();

    // Obtener Platillos de la API de Json-Server
    obtenerPlatillos();
  }
}

function mostrarSecciones() {
  const seccionesOcultas = document.querySelectorAll('.d-none');
  seccionesOcultas.forEach((seccion) => seccion.classList.remove('d-none'));
}

function obtenerPlatillos() {
  const url = 'http://localhost:4000/platillos';
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => mostrarPlatillos(resultado))
    .catch((error) => console.log(error));
}

function mostrarPlatillos(platillos) {
  const contenido = document.querySelector('#platillos .contenido');

  platillos.forEach((platillo) => {
    const row = document.createElement('DIV');
    row.classList.add('row', 'py-3', 'border-top');

    const nombre = document.createElement('DIV');
    nombre.classList.add('col-md-4');
    nombre.textContent = platillo.nombre;

    const precio = document.createElement('DIV');
    precio.classList.add('col-md-3', 'fw-bold');
    precio.textContent = `$${platillo.precio}`;

    const categoria = document.createElement('DIV');
    categoria.classList.add('col-md-3');
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement('INPUT');
    inputCantidad.type = 'number';
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = `producto-${platillo.id}`;
    inputCantidad.classList.add('form-control');

    // Funcion que detecta la cantidad y el platillo que se esta agregando
    inputCantidad.onchange = function () {
      const cantidad = parseInt(inputCantidad.value);
      agregarPlatillo({ ...platillo, cantidad });
    };

    const agregar = document.createElement('DIV');
    agregar.classList.add('col-md-2');
    agregar.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregar);

    contenido.appendChild(row);
  });
}

function agregarPlatillo(producto) {
  // extraer el pedido actual
  let { pedido } = cliente;
  // revisar que la cantidad sea mayor a 0
  if (producto.cantidad > 0) {
    // comprueba si el elemento ya existe en el array
    if (pedido.some((articulo) => articulo.id === producto.id)) {
      // el articulo ya existe, Actualizar la cantidad
      const pedidoActualizado = pedido.map((articulo) => {
        if (articulo.id === producto.id) {
          articulo.cantidad = producto.cantidad;
        }
        return articulo;
      });
      // se asigna el nuevo arry a cliente.pedido
      cliente.pedido = [...pedidoActualizado];
    } else {
      // El Articulo no existe, lo agregamos al array de pedido
      cliente.pedido = [...pedido, producto];
    }
  } else {
    // eliminar elementos cuando la cantidad es 0
    const resultado = pedido.filter((articulo) => articulo.id !== producto.id);
    cliente.pedido = [...resultado];
  }

  // Limpiar el codigo HTML previo
  limpiarHTML();

  if (cliente.pedido.length) {
    // mostrar el resumen
    actualizarResumen();
  } else {
    msjPedidoVacio();
  }
}

function actualizarResumen() {
  const contenido = document.querySelector('#resumen .contenido');

  const resumen = document.createElement('DIV');
  resumen.classList.add('col-md-6', 'card', 'py-5', 'px-3', 'shadow');

  // Informacion de la mesa
  const mesa = document.createElement('P');
  mesa.textContent = 'Mesa: ';
  mesa.classList.add('fw-bold');

  const mesaSpan = document.createElement('SPAN');
  mesaSpan.textContent = cliente.mesa;
  mesaSpan.classList.add('fw-normal');

  // Informacon de la hora
  const hora = document.createElement('P');
  hora.textContent = 'hora: ';
  hora.classList.add('fw-bold');

  const horaSpan = document.createElement('SPAN');
  horaSpan.textContent = cliente.hora;
  horaSpan.classList.add('fw-normal');

  // agregar a los elementos padre
  mesa.appendChild(mesaSpan);
  hora.appendChild(horaSpan);

  // titulo de la seccion
  const heading = document.createElement('H3');
  heading.textContent = 'Platillos Consumidos';
  heading.classList.add('my-4', 'text-center');

  // Interar sobre el array de pedidos
  const grupo = document.createElement('UL');
  grupo.classList.add('list-group');

  const { pedido } = cliente;
  pedido.forEach((articulo) => {
    const { nombre, cantidad, precio, id } = articulo;
    const lista = document.createElement('LI');
    lista.classList.add('list-group-item');

    const nombreEl = document.createElement('H4');
    nombreEl.classList.add('my-4');
    nombreEl.textContent = nombre;

    // cantidad del articulo
    const cantidadEl = document.createElement('P');
    cantidadEl.classList.add('fw-bold');
    cantidadEl.textContent = 'Cantidad: ';

    const cantidadValor = document.createElement('SPAN');
    cantidadValor.classList.add('fw-normal');
    cantidadValor.textContent = cantidad;

    // Precio del articulo
    const precioEl = document.createElement('P');
    precioEl.classList.add('fw-bold');
    precioEl.textContent = 'Precio: ';

    const precioValor = document.createElement('SPAN');
    precioValor.classList.add('fw-normal');
    precioValor.textContent = `$${precio}`;

    // Subtotal del articulo
    const subTotalEl = document.createElement('P');
    subTotalEl.classList.add('fw-bold');
    subTotalEl.textContent = 'Subtotal: ';

    const subtotalValor = document.createElement('SPAN');
    subtotalValor.classList.add('fw-normal');
    subtotalValor.textContent = calcularSubtotal(precio, cantidad);

    // Boton para eliminar
    const btnEliminar = document.createElement('BUTTON');
    btnEliminar.classList.add('btn', 'btn-danger');
    btnEliminar.textContent = 'Eliminar del Pedido';

    // Funcion para eliminar del pedido
    btnEliminar.onclick = function () {
      eliminarProducto(id);
    };

    // Agregar valores a sus contenedores
    cantidadEl.appendChild(cantidadValor);
    precioEl.appendChild(precioValor);
    subTotalEl.appendChild(subtotalValor);

    // Agregar Elimentos al LI
    lista.appendChild(nombreEl);
    lista.appendChild(cantidadEl);
    lista.appendChild(precioEl);
    lista.appendChild(subTotalEl);
    lista.appendChild(btnEliminar);

    // agregar lista al grupo principal
    grupo.appendChild(lista);
  });

  // agregar al contenido
  resumen.appendChild(heading);
  resumen.appendChild(mesa);
  resumen.appendChild(hora);
  resumen.appendChild(grupo);

  contenido.appendChild(resumen);

  // mostrar Formulario de Propinas
  formularioPropinas();
}

function limpiarHTML() {
  const contenido = document.querySelector('#resumen .contenido');

  while (contenido.firstChild) {
    contenido.removeChild(contenido.firstChild);
  }
}

function calcularSubtotal(precio, cantidad) {
  return `$ ${precio * cantidad}`;
}

function eliminarProducto(id) {
  const { pedido } = cliente;
  const resultado = pedido.filter((articulo) => articulo.id !== id);
  cliente.pedido = [...resultado];

  // Limpiar el codigo HTML previo
  limpiarHTML();

  if (cliente.pedido.length) {
    // mostrar el resumen
    actualizarResumen();
  } else {
    msjPedidoVacio();
  }

  // El producto se elimino por lo tanto regresamos la cantidad a 0 en el formulario
  const productoEliminado = `#producto-${id}`;
  const inputEliminado = document.querySelector(productoEliminado);
  inputEliminado.value = 0;
}

function msjPedidoVacio() {
  const contenido = document.querySelector('#resumen .contenido');
  const texto = document.createElement('P');
  texto.classList.add('text-center');
  texto.textContent = 'A??ade los elementos del pedido';

  contenido.appendChild(texto);
}

function formularioPropinas() {
  const contenido = document.querySelector('#resumen .contenido');

  const formulario = document.createElement('DIV');
  formulario.classList.add('col-md-6', 'formulario');

  const divFormulario = document.createElement('DIV');
  divFormulario.classList.add('card', 'py-5', 'px-3', 'shadow');

  const heading = document.createElement('H3');
  heading.classList.add('my-4');
  heading.textContent = 'Propina';

  // Radio Button 10%
  const radio10 = document.createElement('INPUT');
  radio10.type = 'radio';
  radio10.name = 'propina';
  radio10.value = '10';
  radio10.classList.add('form-check-input');

  const radio10label = document.createElement('LABEL');
  radio10label.textContent = '10%';
  radio10label.classList.add('form-check-label');

  const radio10Div = document.createElement('DIV');
  radio10Div.classList.add('form-check');

  radio10Div.appendChild(heading);
  radio10Div.appendChild(radio10label);

  // agregar al div principal
  divFormulario.appendChild(heading);
  divFormulario.appendChild(radio10Div);

  // agregar al
  formulario.appendChild(divFormulario);

  contenido.appendChild(formulario);
}
