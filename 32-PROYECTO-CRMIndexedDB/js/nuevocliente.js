(function () {
  let DB;
  const formulario = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();

    formulario.addEventListener('submit', validarCliente);
  });

  function validarCliente(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if (nombre === '' || email === '' || telefono === '' || empresa === '') {
      imprimirAlerta('Todos los campos son obligatorio', 'error');
      return;
    }

    // crear un objeto con la informaion

    const clienteObj = { nombre, email, telefono, empresa, id: Date.now() };

    crearNuevoCliente(clienteObj);
  }

  function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(['crm'], 'readwrite');

    const objectStore = transaction.objectStore('crm');

    objectStore.add(cliente);

    transaction.onerror = function () {
      imprimirAlerta('Hubo un error', 'error');
    };

    transaction.oncomplete = function () {
      imprimirAlerta('Cliente Agregado');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    };
  }
})();
