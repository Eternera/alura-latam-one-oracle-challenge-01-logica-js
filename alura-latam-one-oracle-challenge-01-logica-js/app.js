// Variables globales
let numeroUsuario = 0;
let intentos = 1;
let numeroMaximoPosible = 100; // Rango por defecto
let numeroSecreto = Math.floor(Math.random() * numeroMaximoPosible) + 1;
let maximosIntentos = 6;

// Elementos HTML
const mensaje = document.getElementById("mensaje");
const pista = document.getElementById("pista");
const numeroInput = document.getElementById("numero");
const intentosSpan = document.getElementById("intentos");
const adivinarButton = document.getElementById("adivinar");
const rangoInput = document.getElementById("rango"); // Input para seleccionar el rango máximo

// Función para inicializar el juego con el rango
function iniciarJuego() {
  // Obtenemos el rango máximo de números ingresado por el usuario
  numeroMaximoPosible = parseInt(rangoInput.value);

  // Validamos el rango ingresado
  if (isNaN(numeroMaximoPosible) || numeroMaximoPosible <= 1) {
    mensaje.textContent = "Por favor, ingresa un número válido mayor a 1.";
    return;
  }

  // Generamos un nuevo número secreto basado en el rango seleccionado
  numeroSecreto = Math.floor(Math.random() * numeroMaximoPosible) + 1;

  // Reiniciamos los intentos y actualizamos la interfaz
  intentos = 1;
  intentosSpan.textContent = intentos;
  mensaje.textContent = `¡Juego comenzado! Adivina el número entre 1 y ${numeroMaximoPosible}.`;
  pista.textContent = "";
}

// Función para comprobar el número ingresado por el usuario
function comprobarNumero() {
  numeroUsuario = parseInt(numeroInput.value);
  if (
    isNaN(numeroUsuario) ||
    numeroUsuario < 1 ||
    numeroUsuario > numeroMaximoPosible
  ) {
    mensaje.textContent = `Por favor, ingresa un número válido entre 1 y ${numeroMaximoPosible}.`;
    return;
  }

  intentos++;
  intentosSpan.textContent = intentos;

  if (numeroUsuario === numeroSecreto) {
    mensaje.textContent = `¡Correcto! El número secreto era: ${numeroSecreto}. Lo lograste en ${intentos} ${
      intentos === 1 ? "vez" : "veces"
    }.`;
    adivinarButton.disabled = true; // Deshabilitamos el botón
    numeroInput.disabled = true; // Deshabilitamos el input
  } else {
    if (numeroUsuario > numeroSecreto) {
      pista.textContent = "El número secreto es menor.";
    } else {
      pista.textContent = "El número secreto es mayor.";
    }
  }

  // Verificar si se superaron los intentos máximos
  if (intentos >= maximosIntentos) {
    mensaje.textContent = `¡Perdiste! El número secreto era: ${numeroSecreto}.`;
    adivinarButton.disabled = true;
    numeroInput.disabled = true;
  }
}

// Agregar eventos
adivinarButton.addEventListener("click", comprobarNumero);
rangoInput.addEventListener("change", iniciarJuego); // Llamamos a iniciarJuego cuando el rango cambie

// Inicializamos el juego
iniciarJuego();
