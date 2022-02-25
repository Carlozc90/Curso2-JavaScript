let DB;

document.addEventListener('DOMContentLoaded', () => {
  crmDB();

  setTimeout(() => {
    crearCliente();
  }, 5000);
});

function crmDB() {
  // Crear base de datos v1
  let crmDB = window.indexedDB.open('crm', 1);

  // si hay un error
  crmDB.onerror = function () {
    console.log('Hubo un eroror a la hora de crear la db');
  };

  // si te creo bien
  crmDB.onsuccess = function () {
    console.log('Base de datos Creada');

    DB = crmDB.result;
  };

  // configuracion de la base de datos
  crmDB.onupgradeneeded = function (e) {
    const db = e.target.result;

    const objectStore = db.createObjectStore('crm', {
      keyPath: 'crm',
      autoIncrement: true,
    });

    // definir las colimnas
    objectStore.createIndex('nombre', 'nombre', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('telefono', 'telefono', { unique: false });

    console.log('columnas creada');
  };
}

function crearCliente() {
  let transaction = DB.transaction(['crm'], 'readwrite');

  transaction.oncomplete = function () {
    console.log('transacion completada');
  };

  transaction.onerror = function () {
    console.log('hubo un error en la transaccion');
  };

  const objectStore = transaction.objectStore('crm');

  const nuevoCliente = {
    telefono: 19929292,
    nombre: 'juan',
    email: 'correo@correo.com',
  };

  const peticion = objectStore.add(nuevoCliente);
  const peticion = objectStore.put(nuevoCliente);

  console.log(peticion);
}
