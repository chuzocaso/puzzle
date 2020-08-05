// Arreglo que contiene las intrucciones del juego 
var instrucciones = ["Usa las flechas del teclado para mover las piezas al lugar vacío",
    "Sólo podrás mover las piezas dentro de la imagen",
    "Aparecerá a tu lado izquierdo la última flecha que pulsaste",
    "Una vez completado el juego podrás apretar el botón para ver todos los movimientos que realizaste"
];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];
var movimientosEnFormatoFlecha = [];

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const grillaOriginal = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

/* Estas dos variables son para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro. 
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones usando
la función mostrarEnLista(). */

function mostrarInstrucciones(instrucciones) {
    for (let i = 0; i < instrucciones.length; i++) {
      mostrarEnLista(instrucciones[i], "lista-instrucciones")      
    }
}
//Función para mostrar todos los movimientos realizados al pulsar un botón
function mostrarMovimientos(movimientosEnFormatoFlecha) {
  for (let i = 0; i < movimientosEnFormatoFlecha.length; i++) {
    mostrarEnLista(movimientosEnFormatoFlecha[i], "lista-movimientos")      
  }
}

/* Función que agrega la última dirección al arreglo de movimientos
y utiliza actualizarUltimoMovimiento para mostrarlo en pantalla */
function agregarDireccion(ultimoMovimiento) {
  actualizarUltimoMovimiento(ultimoMovimiento);
}
/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora.*/
function chequearSiGano() {
    for (let i = 0; i < grilla.length; i++) {
      for (let j = 0; j < grilla[i].length; j++) {
        if (grilla[i][j] !== grillaOriginal[i][j]) {
          return false
        }
      }
    }
    return true
}

// Cartel que avisa que ganaste el juego
function mostrarCartelGanador() {
    alert("FELICITACIONES, HAS COMPLETADO EL JUEGO");
    botonDeMovimientos = document.getElementById("botonDeMovimientos");
    botonDeMovimientos.style.display = "block";
}

/* Función que intercambia dos posiciones en la grilla.*/
function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
  var pos1temp = grilla[filaPos1][columnaPos1];
  grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
  grilla[filaPos2][columnaPos2] = pos1temp;

}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
  if (columna < grilla[0].length && fila < grilla.length && columna>=0 && fila >= 0) {
    return true
  } else {
    console.log("Movimiento invalido")
  }
}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento. */
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia la abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }
    
  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

  /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia.*/

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

        actualizarUltimoMovimiento(direccion)
        movimientos.push(direccion);
        movimientosEnFormatoFlecha.push(cambiarPorFlecha(direccion))
    }
    
}

//Función para reemplazar el valor de los números por flechas

function cambiarPorFlecha(numero) {
  var flecha
  switch (numero) {
    case codigosDireccion.ARRIBA:
      flecha = '↑';
      break;
    case codigosDireccion.ABAJO:
      flecha = '↓';
      break;
    case codigosDireccion.DERECHA:
      flecha = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      flecha = '←';
      break;
  }
  return flecha
}


/* Objeto que permite reemplazar el uso de números confusos en el código. */
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM).*/
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
    case "borrar":
      ultimoMov.textContent = '';
      break;
  }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */

//Se modifica función para que sea más general y poder replicarla para crear lista de movimientos
function mostrarEnLista(elementoDeLista, id) {
  var ul = document.getElementById(id);
  var li = document.createElement("li");
  li.textContent = elementoDeLista;
  ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  
  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
  movimientos = [];
  movimientosEnFormatoFlecha = [];
  actualizarUltimoMovimiento("borrar");
}

/* Función que captura las teclas presionadas por el usuario. */
function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 500);
            }
            evento.preventDefault();
        }
    })
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();