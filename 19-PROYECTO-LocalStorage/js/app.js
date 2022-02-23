// Vaiables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event
eventListeners();

// funciones

function eventListeners() {
  // Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener('submit', agregarTweet);

  // Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    crearHTML();
  });
}

function agregarTweet(e) {
  e.preventDefault();
  //   textarea donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;

  //   validacion
  if (tweet === '') {
    mostrarError('No puede ir vacio');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet: tweet,
  };

  //   añadir al arreglo  de tweets
  tweets = [...tweets, tweetObj];

  // creando el html
  crearHTML();

  // reiniciar el formulario
  formulario.reset();
}

// mostrar mensaje error
function mostrarError(error) {
  const mensajeError = document.createElement('P');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  //   Insertarlo en el Contenido
  const constenido = document.querySelector('#contenido');
  constenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Muestra un listado de los tweets

function crearHTML() {
  if (tweets.length > 0) {
    limpiarHtml();
    tweets.forEach((tweet) => {
      // Crear el HTML
      const li = document.createElement('LI');

      // Agregar boton eliminar
      const btonEliminar = document.createElement('A');
      btonEliminar.classList.add('borrar-tweet');
      btonEliminar.textContent = 'X';

      // Añadir la funcion eliminar
      btonEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // anadir el texto
      li.innerText = tweet.tweet;

      // asignar el boton
      li.appendChild(btonEliminar);

      // insertarlo en el html
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agrega los Tweets actuales a Localstorege
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
// eliminando tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}

// Limpiar HTML
function limpiarHtml() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
