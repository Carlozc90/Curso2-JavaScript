const formulario = document.querySelector('#enviar-mail');

const btEnviar = document.querySelector('#enviar');
const btReset = document.querySelector('#resetBtn');

const inpMail = document.querySelector('#email');
const inpAsunto = document.querySelector('#asunto');
const inpMensaje = document.querySelector('#mensaje');

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
  // Cuandoo la app arranca
  //   document.addEventListener('DOMContentLoaded', iniciarApp);

  //   Campos del formulario
  inpMail.addEventListener('blur', validarFormulario);
  inpAsunto.addEventListener('blur', validarFormulario);
  inpMensaje.addEventListener('blur', validarFormulario);

  //   enviar Email
  formulario.addEventListener('submit', enviarEmail);
}

// Valida el Formulario
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    // elimina los errores DOM
    const error = document.querySelector('p.error');
    if (error) {
      error.remove();
    }

    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
  } else {
    // e.target.style.borderBottomColor = 'red';
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    mostrarError('todos los campos son obligatorio');
  }

  //   validar el email //

  //   BASICO
  //   if (e.target.type === 'email') {
  //     const resultado = e.target.value.indexOf('@');
  //     console.log(resultado);
  //     if (resultado < 0) {
  //       mostrarError('El email no es valido');
  //     }
  //   }

  //   EXPRESION REGULAR
  if (e.target.type === 'email') {
    if (er.test(e.target.value)) {
      const error = document.querySelector('p.error');
      if (error) {
        error.remove();
      }

      e.target.classList.remove('border', 'border-red-500');
      e.target.classList.add('border', 'border-green-500');
    } else {
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');
      mostrarError('Email no Valido');
    }
  }

  if (
    er.test(inpMail.value) &&
    inpAsunto.value !== '' &&
    inpMensaje.value !== ''
  ) {
    btEnviar.disabled = false;
    btEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement('P');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    'border',
    'border-red-500',
    'background-red-100',
    'text-red-500',
    'p-3',
    'mt-5',
    'error'
  );

  const errores = document.querySelectorAll('.error');

  if (errores.length === 0) {
    // formulario.appendChild(mensajeError);
    formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
  }
}

function enviarEmail(e) {
  e.preventDefault();
  const spiner = document.querySelector('#spinner');
  spiner.style.display = 'flex';
  setTimeout(() => {
    spiner.style.display = 'none';

    // mensaje que dice que se envio correctamente
    const parrafo = document.createElement('P');
    parrafo.textContent = 'El mensaje se envio Correcatmente';
    parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500');

    //   inseta el parrafo antes del spiner
    formulario.insertBefore(parrafo, spiner);
  }, 2000);
}
{
}
