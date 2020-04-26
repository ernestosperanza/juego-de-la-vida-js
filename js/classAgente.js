//-------------------------------------------------------------------------//
//                           Clase Agente o Turmita                        //
//-------------------------------------------------------------------------//

class Agente {
    constructor(x, y, estado) {

        this.x = x;
        this.y = y;

        this.estado = estado; // Vivo = 1, Muerto = 0
        this.estadoProx = this.estado; // estado en el siguiente ciclo

        this.vecinos = []; // Array donde guarda a los vecinos

    }

    // Metodo que añade a los vecinos //
    addVecinos() {

        let xVecino;
        let yVecino;

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {

                xVecino = (j + this.x + columnas) % columnas;
                yVecino = (i + this.y + filas) % filas;

                // Descartar el agente actual
                if (i != 0 || j != 0) {

                    this.vecinos.push(tablero[yVecino][xVecino]);

                }
            }
        }
    };

    // Programamos las leyes de Conway //
    nuevoCiclo() {
        let suma = 0;
        for (let i = 0; i < this.vecinos.length; i++) {
            if (this.vecinos[i].estado === 1) {
                suma++;
            }
        }

        // Aplicamos las normas
        this.estadoProx = this.estado; // Por defecto queda igual

        // Vida: tiene 3 vecinos
        if (this.estado === 0 && suma === 3) {
            this.estadoProx = 1;
        }

        // Muerte: menos de 2(soledad) o mas de 3 (inanicion)
        if (this.estado == 1 && (suma < 2 || suma > 3)) {
            this.estadoProx = 0;
        }
    };

    // Metodo que aplica la mutacion //
    mutacion() {
        this.estado = this.estadoProx;
    };

    // Metodo que dibuja en el tablero //
    dibuja() {

        var color;
        if (this.estado == 1) {
            color = colorV;
        } else {
            color = colorM;
        }

        ctx.fillStyle = color;
        ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
    };
}

//-------------------------------------------------------------------------//
//-------------------------------------------------------------------------//
