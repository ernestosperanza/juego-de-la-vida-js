// Definir las variables
var canvas;
var ctx;
var fps = 30;

var canvasX = 600; // Px ancho
var canvasY = 600; // Px alto

var tileX, tileY;

// Variables relacionadas con el tablero 
var tablero;
var filas = 150;
var columnas = 150;

// Colores
var blanco = '#ffffff'
var negro = '#000000'


// Agente o turmita
var Agente = function(y, x, estado) {

    this.x = x;
    this.y = y;
    this.estado = estado; // Vivo = 1, Muerto = 0
    this.estadoProx = this.estado; // estado en el siguiente ciclo

    this.vecinos = []; // Array donde guarda a los vecinos

    // Metodo que añade a los vecinos
    this.addVecinos = function() {

        var xVecino;
        var yVecino;
        
		for(var i=-1; i<2; i++){
			for(var j=-1; j<2; j++){

                xVecino = (j + this.x + columnas) % columnas;
                yVecino = (i + this.y + filas) % filas;

                // Descartar el agente actual
                if (i != 0 || j != 0) {
                    
                    this.vecinos.push(tablero[yVecino][xVecino]);

                }
            }
        }
    }

    // Programamos las leyes de Conway
    this.nuevoCiclo = function() {
        var suma = 0;
        for(i = 0; i < this.vecinos.length; i++) {
            if(this.vecinos[i].estado === 1) {
                suma ++;
            }
        }

        // Aplicamos las normas
        this.estadoProx = this.estado; // Por defecto queda igual

        // Vida: tiene 3 vecinos
        if (this.estado === 0 && suma === 3) {
            this.estadoProx = 1;
        }

        // Muerte: menos de 2(soledad) o mas de 3 (inanicion)
        if(this.estado == 1 && (suma < 2 || suma > 3)) {
            this.estadoProx = 0;
        }


    }

    // Metodo que aplica la mutacion
    this.mutacion = function() {
        this.estado = this.estadoProx;
    }

    this.dibuja = function() {

        var color;
        if(this.estado == 1) { 
            color = blanco;
        } else {
            color = negro;
        }

        ctx.fillStyle = color;
        ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
    }

}


function crearArray2D( fil, col) {
    var obj = new Array(fil);
    for (y = 0; y < fil; y++) {
        obj[y] = new Array(col);
    }
    return obj;
}


function inicializaTablero(obj) {
    var estado;

    for(y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            estado = Math.floor(Math.random()*2);
            obj[y][x] = new Agente(y, x, estado);
        }
    }

    for(y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            obj[y][x].addVecinos();
        }
    }
}


function inicializa() {

    // Asociar el canvas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Ajustar tamaño
    canvas.width = canvasX;
    canvas.height = canvasY;

    // Calcular tamaño de los tiles
    tileX = Math.floor(canvasX / filas);
    tileY = Math.floor(canvasY / columnas);

    // Creamos el tablero
    tablero = crearArray2D(filas, columnas);

    // Inicializa tabero
    inicializaTablero(tablero);

    // Ejecutar el bucle principal
    setInterval(function(){principal();}, 1000/fps);
    
}


function dibujaTablero(obj) {

    // Dibujar los agentes
    for(y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            obj[y][x].dibuja();
        }
    }

    // Calcular el siguiente ciclo
    for(y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            obj[y][x].nuevoCiclo();
        }
    }

    // Hacer la mutacion de los agentes
    for(y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            obj[y][x].mutacion();
        }
    }
}


function borrarCanvas() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;

}


function principal() {

    borrarCanvas();
    dibujaTablero(tablero);

}
