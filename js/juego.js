// Definir las variables //
var ctx;
var fps = 30;
var canvas, tileX, tileY;
var canvasX = 600;
var canvasY = 600;

// Variables relacionadas con el tablero //
var tablero;
var filas = 150;
var columnas = 150;

// Colores a usar //
// Opcion 1 //
var negro = '#000000';
var blanco = '#FFFFFF';

// Opcion 2 //
var amarillo = '#F1C40F'; 
var verde = '#16A085';

// Opcion 3 //
var verdePillo = '#00FF00';


var colorM = negro;
var colorV = blanco;


var pausa = false;

//-------------------------------------------------------------------------//
//                 Crea el array 2D donde van los agentes                  //
//-------------------------------------------------------------------------//

function crearArray2D(filas, columnas) {
    let obj = new Array(filas);
    for (let y = 0; y < filas; y++) {
        obj[y] = new Array(columnas);
    }
    return obj;
}


function inicializaTablero(obj) {
    var estado;

    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {

            estado = Math.floor(Math.random() * 2);
            obj[y][x] = new Agente(x, y, estado);
        }
    }

    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            obj[y][x].addVecinos();
        }
    }
}


function dibujaTablero(obj) {

    // Dibujar los agentes
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            obj[y][x].dibuja();
        }
    }

    if (pausa === false) {
        // Calcular el siguiente ciclo
        for (let y = 0; y < filas; y++) {
            for (let x = 0; x < columnas; x++) {
                obj[y][x].nuevoCiclo();
            }
        }

        // Hacer la mutacion de los agentes
        for (let y = 0; y < filas; y++) {
            for (let x = 0; x < columnas; x++) {
                obj[y][x].mutacion();
            }
        }
    }


}

//-------------------------------------------------------------------------//
//            Inicializa el estado en el onload de la pagina               //
//-------------------------------------------------------------------------//

function inicializa() {

    // Asociar el canvas  //
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Ajustar tamaño //
    canvas.width = canvasX;
    canvas.height = canvasY;

    // Calcular tamaño de los tiles  //
    tileX = Math.floor(canvasX / filas);
    tileY = Math.floor(canvasY / columnas);

    // Creamos el Tablero //
    tablero = crearArray2D(filas, columnas);

    // Inicializa Tablero //
    inicializaTablero(tablero);

    // Ejecutar el bucle principal //
    setInterval(function () { principal(); }, 1000 / fps);
}

//-------------------------------------------------------------------------//
//                           Funcion Principal                             //
//-------------------------------------------------------------------------//

function principal() {

    // borrarCanvas;
    () => canvas.width = canvas.width; canvas.height = canvas.height;
    dibujaTablero(tablero);
    console.log('fotograma');

}

//-------------------------------------------------------------------------//
//                           Control de la UI                              //
//-------------------------------------------------------------------------//

function pausar() {
    if (pausa === false) {
        pausa = true;
        return;
    }
}

function activar() {
    if (pausa === true) {
        pausa = false;
    }
}

function reiniciar(){
    inicializaTablero(tablero, true);
}

function colorOpcionUno() {
    colorV = blanco;
    colorM = negro;
    inicializaTablero(tablero, true);
}

function colorOpcionDos() {
    colorV = amarillo;
    colorM = verde;
    inicializaTablero(tablero, true);
}

function colorOpcionTres() {
    colorV = verdePillo;
    colorM = negro;
    inicializaTablero(tablero, true);
}

//-------------------------------------------------------------------------//
//-------------------------------------------------------------------------//
