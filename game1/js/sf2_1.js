
var canvas, ctx, interval, interval_player;
let segundo_1s = 9;
let segundo_10s = 9;
let contadorFrames = 0;
let spritX_1rcontador = 158;
let spritX_2ocontador = 158;
let esPrimeraMuerte1p = false;
let esSegundaMuerte1p = false;
let esPrimeraMuerte2p = false;
let esSegundaMuerte2p = false;
let gameOver = false;
let paraContador = false;
let spriteDecoraciones = new Image();
spriteDecoraciones.src = 'img/decoraciones.png';
document.addEventListener('DOMContentLoaded', inicio);



function mostrarContador() {

    contadorFrames++;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    if (!paraContador) {
        //10 segundos
        if (contadorFrames % 1200 === 0) {
            segundo_10s--;
            if (segundo_10s >= -1) {
                switch (segundo_10s) {
                    case 0:
                        spritX_1rcontador = 15;
                        break
                        ;
                    case 1:
                        spritX_1rcontador = 31;
                        break;
                    case 2:
                        spritX_1rcontador = 47;
                        break;
                    case 3:
                        spritX_1rcontador = 63;
                        break;
                    case 4:
                        spritX_1rcontador = 79;
                        break;
                    case 5:
                        spritX_1rcontador = 94;
                        break;
                    case 6:
                        spritX_1rcontador = 111;
                        break;
                    case 7:
                        spritX_1rcontador = 127;
                        break;
                    case 8:
                        spritX_1rcontador = 142;
                        break;
                    case 9:
                        spritX_1rcontador = 158;
                        break;
                    default:
                        spritX_1rcontador = 15;
                        break;

                }

            } else {
                return;
            }
        }
        // Un segundo
        if (contadorFrames % 120 === 0) {
            segundo_1s--;
            if (segundo_1s >= 0) {
                switch (segundo_1s) {
                    case 0:
                        spritX_2ocontador = 15;
                        break
                        ;
                    case 1:
                        spritX_2ocontador = 31;
                        break;
                    case 2:
                        spritX_2ocontador = 47;
                        break;
                    case 3:
                        spritX_2ocontador = 63;
                        break;
                    case 4:
                        spritX_2ocontador = 79;
                        break;
                    case 5:
                        spritX_2ocontador = 94;
                        break;
                    case 6:
                        spritX_2ocontador = 111;
                        break;
                    case 7:
                        spritX_2ocontador = 127;
                        break;
                    case 8:
                        spritX_2ocontador = 142;
                        break;
                    case 9:
                        spritX_2ocontador = 158;
                        break;
                    default:
                        break;

                }

            } else {
                if (segundo_10s <= -1) {
                    return;
                }
                spritX_2ocontador = 158;
                segundo_1s = 9;
            }
        }
    }


    ctx.drawImage(spriteDecoraciones, spritX_1rcontador, 32,
        14, 15, 173, 34, 14, 15);
    ctx.drawImage(spriteDecoraciones, spritX_2ocontador, 32,
        14, 15, 188, 34, 14, 15);

}


let Player1 = function (x, y, width, height, img, imgDecoraciones) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.velocidadX = 4;
    this.gravedad = 4.8;
    this.imgDecoraciones = imgDecoraciones;
    this.frameDelay = 5;
    this.frameContador = 0;
    this.tamanybarra = 0;
    let sprite = new Image();
    sprite.src = this.img;
    this.muertePj = false;

    this.dibuja = function () {
        ctx.drawImage(sprite, this.sprite_x, this.sprite_y,
            this.sprite_w, this.sprite_h, this.x, this.y, this.sprite_w, this.sprite_h);
    }

    this.mover = function (jugador) {
        switch (jugador) {
            case 1:
                this.x += this.velocidadX;
                if (this.x > canvas.width - this.width) {
                    this.velocidadX -= this.velocidadX;
                } else {
                    if (this.x < 0) {
                        this.velocidadX -= this.velocidadX;
                    }
                }
                break;
            case 2:
                this.x -= this.velocidadX;
                if (this.x < 0) {
                    this.velocidadX -= this.velocidadX;
                } else {
                    if (this.x > canvas.width - this.width) {
                        this.velocidadX -= this.velocidadX;
                    }
                }
                break;
            default:
                break;

        }

    }


    let actualFrame = 0;

    this.animacion = function (nombreAnimacion) {

        if (this.frameContador >= this.frameDelay) {
            actualFrame = (actualFrame + 1) % nombreAnimacion.length;
            let frame = nombreAnimacion[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;
        } else {
            this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        if (esPrimeraMuerte1p) {
            return;
        }
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }
    this.victoriaP1 = function (nombreAnimacion) {
        if (actualFrame != nombreAnimacion.length - 1) {
            actualFrame = (actualFrame + 1) % nombreAnimacion.length;
            let frame = nombreAnimacion[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;
        } else {
            // this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    this.muerteP1 = function () {
        if (actualFrame != zangifMuerte.length - 1) {
            actualFrame = (actualFrame + 1) % zangifMuerte.length;
            let frame = zangifMuerte[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;
            this.muertePj = true;
            this.y = 150;
            this.frameContador = 0;
        } else {
            // this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
    }
    this.izquierda = function () {
        this.x -= this.velocidadX;

    }

    this.derecha = function () {
        this.x += this.velocidadX;
    }
    this.saltar = function () {
        if (this.y >= 180) {
            this.y -= this.gravedad * 40;
        }
    }
    this.descender = function () {
        if (this.y < (canvas.height - this.height)) {
            this.y += this.gravedad;
        }
    }

    this.agacharse = function () {
        this.height = this.height / 2;
        this.y = this.y + this.height;
        this.dibuja();
    }

    this.levantarse = function () {
        this.animacion();
        this.dibuja();
    }

    let spriteDecoraciones = new Image();
    spriteDecoraciones.src = this.imgDecoraciones;
    let victoriaPersonaje = false;
    this.dibujarObjetos = function () {
        //Barra
        ctx.drawImage(spriteDecoraciones, 16, 18,
            145, 11, 34, 20, 145, 11);
        //Barra roja
        ctx.drawImage(spriteDecoraciones, 16, 4,
            this.tamanybarra, 11, 34, 20, this.tamanybarra, 11);
        //Numero de personaje
        ctx.drawImage(spriteDecoraciones, 31, 100,
            7, 11, 2, 0, 7, 11);
        ctx.drawImage(spriteDecoraciones, 17, 124,
            10, 12, 10, 0, 10, 12);

        if (esPrimeraMuerte2p) {
            //Victoria 2
            ctx.drawImage(spriteDecoraciones, 344, 15,
                16, 17, 18, 16, 16, 17);
            // this.animacion(zangiefVictory);
            victoriaPersonaje = true;

        }
        if (esSegundaMuerte2p) {
            //Victoria 1
            ctx.drawImage(spriteDecoraciones, 344, 15,
                16, 17, 1, 16, 16, 17);
            victoriaPersonaje = true;

            // this.animacion(zangiefVictoryAlternate);
        }

        if (victoriaPersonaje) {
            //Nombre
            ctx.drawImage(spriteDecoraciones, 16, 71,
                63, 10, 150, 80, 63, 10);
            //W
            ctx.drawImage(spriteDecoraciones, 101, 125,
                11, 10, 215, 80, 11, 10);
            //I
            ctx.drawImage(spriteDecoraciones, 127, 113,
                5, 10, 226, 80, 5, 10);
            //N
            ctx.drawImage(spriteDecoraciones, 185, 113,
                11, 10, 232, 80, 11, 10);
            //S
            ctx.drawImage(spriteDecoraciones, 53, 125,
                10, 10, 243, 80, 10, 10);
        }
        //Nombre
        ctx.drawImage(spriteDecoraciones, 16, 71,
            63, 10, 40, 35, 63, 10);

    }

    this.quitarVida = function (mal) {
        if (this.tamanybarra < 145) {
            this.tamanybarra = this.tamanybarra + mal;
        }
        this.dibujarObjetos();
    }

}

let Zangif = new Player1(50, 92, 103, 110, 'img/zangif.png', 'img/decoraciones.png');


let player2 = function (x, y, width, height, img, imgDecoraciones) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.velocidadX = 4;
    this.gravedad = 4.8;
    this.imgDecoraciones = imgDecoraciones;
    this.muertePj = false;

    this.frameDelay = 5;
    this.frameContador = 0;
    this.tamanybarra = 145;
    let sprite = new Image();
    sprite.src = this.img;

    this.dibuja = function () {
        ctx.drawImage(sprite, this.sprite_x, this.sprite_y,
            this.sprite_w, this.sprite_h, this.x, this.y, this.sprite_w, this.sprite_h);

    }

    this.mover = function (jugador) {
        switch (jugador) {
            case 1:
                this.x += this.velocidadX;
                if (this.x > canvas.width - this.width) {
                    this.velocidadX -= this.velocidadX;
                } else {
                    if (this.x < 0) {
                        this.velocidadX -= this.velocidadX;
                    }
                }
                break;
            case 2:
                this.x -= this.velocidadX;
                if (this.x < 0) {
                    this.velocidadX -= this.velocidadX;
                } else {
                    if (this.x > canvas.width - this.width) {
                        this.velocidadX -= this.velocidadX;
                    }
                }
                break;
            default:
                break;

        }

    }

    let actualFrame = 0;
    this.animacion = function (nombreAnimacion) {
        if (this.frameContador >= this.frameDelay) {
            actualFrame = (actualFrame + 1) % nombreAnimacion.length;
            let frame = nombreAnimacion[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;
        } else {
            this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }
    this.victoriaP2 = function (nombreAnimacion) {
        if (actualFrame != nombreAnimacion.length - 1) {
            actualFrame = (actualFrame + 1) % nombreAnimacion.length;
            let frame = nombreAnimacion[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;
        } else {
            // this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    this.muerteP2 = function (nombreAnimacion) {
        if (actualFrame != bisonMuerte.length - 1) {
            actualFrame = (actualFrame + 1) % bisonMuerte.length;
            let frame = bisonMuerte[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;
            this.muertePj = true;
            this.y = 150;

            this.frameContador = 0;
        } else {
            // this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }
    this.izquierda = function () {
        this.x -= this.velocidadX;

    }

    this.derecha = function () {
        this.x += this.velocidadX;
    }
    this.saltar = function () {
        if (this.y >= 180) {
            this.y -= this.gravedad * 40;
        }
    }
    this.descender = function () {
        if (this.y < (canvas.height - this.height)) {
            this.y += this.gravedad;
        }
    }

    this.agacharse = function () {
        this.height = this.height / 2;
        this.y = this.y + this.height;
        this.dibuja();
        this.dibujarObjetos();
    }

    this.levantarse = function () {
        this.animacion();
    }
    let spriteDecoraciones = new Image();
    spriteDecoraciones.src = this.imgDecoraciones;
    let victoriaPersonaje = false;
    this.dibujarObjetos = function () {
        //Barra roja
        ctx.drawImage(spriteDecoraciones, 193, 4,
            145, 11, 205, 20, 145, 11);
        //Barra
        ctx.drawImage(spriteDecoraciones, 193, 18,
            this.tamanybarra, 11, 205, 20, this.tamanybarra, 11);
        //Numero de personaje    
        ctx.drawImage(spriteDecoraciones, 41, 100,
            10, 12, 362, 0, 10, 12);
        ctx.drawImage(spriteDecoraciones, 17, 124,
            10, 12, 373, 0, 10, 12);
        if (esPrimeraMuerte1p) {
            //Victoria 1
            ctx.drawImage(spriteDecoraciones, 344, 15,
                16, 17, 350, 16, 16, 17);
            victoriaPersonaje = true;
            // this.animacion(bisonVictory);
        }
        if (esSegundaMuerte1p) {
            // //Victoria 2
            ctx.drawImage(spriteDecoraciones, 344, 15,
                16, 17, 367, 16, 16, 17);
            victoriaPersonaje = true;

            // this.animacion(bisonVictoryAlternate);

        }
        if (victoriaPersonaje) {
            //Nombre
            ctx.drawImage(spriteDecoraciones, 290, 71,
                61, 10, 150, 80, 61, 10);
            //W
            ctx.drawImage(spriteDecoraciones, 101, 125,
                11, 10, 200, 80, 11, 10);
            //I
            ctx.drawImage(spriteDecoraciones, 127, 113,
                5, 10, 212, 80, 5, 10);
            //N
            ctx.drawImage(spriteDecoraciones, 185, 113,
                11, 10, 218, 80, 11, 10);
            //S
            ctx.drawImage(spriteDecoraciones, 53, 125,
                10, 10, 230, 80, 10, 10);
        }
        //nombre
        ctx.drawImage(spriteDecoraciones, 290, 71,
            61, 10, 305, 35, 61, 10);

    }

    this.quitarVida = function (mal) {
        if (this.tamanybarra <= 145 && this.tamanybarra > 0) {
            this.tamanybarra = this.tamanybarra - mal;
        }
        this.dibujarObjetos();
    }
}

let Bison = new player2(230, 100, 108, 96, 'img/Bison.png', 'img/decoraciones.png');
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        //Jugador 2
        case "ArrowUp":
            Bison.saltar();
            break;
        case "ArrowDown":
            if (!e.repeat) {
                Bison.agacharse();
            }
            break;
        case "ArrowLeft":
            Bison.izquierda();
            break;
        case "ArrowRight":
            Bison.derecha();
            break;
        //Jugador 1
        case "w":
            Zangif.saltar();
            break;
        case "s":
            if (!e.repeat) {
                Zangif.agacharse();
            }
            break;
        case "a":
            Zangif.izquierda();

            break;
        case "d":
            Zangif.derecha();
            break;
        case "z":
            Zangif.quitarVida(10);
            break;
        case "b":
            Bison.quitarVida(10);
            break;
        case "e":
            break;
        case "p":

            break;
        default:
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "ArrowDown":
            Bison.levantarse();
            break;
        case "s":
            Zangif.levantarse();
            break;
    }
});

let Stage = function (x, y, width, height, img, imgDecoraciones) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.imgDecoraciones = imgDecoraciones;
    this.frameDelay = 5;
    this.frameContador = 0;
    this.dibuja = function () {
        let sprite = new Image();
        sprite.src = this.img;
        ctx.drawImage(sprite, this.sprite_x, this.sprite_y,
            this.sprite_w, this.sprite_h, this.x, this.y, this.width, this.height);
    }

    let actualFrame = 0;

    this.animacion = function () {

        if (this.frameContador >= this.frameDelay) {
            actualFrame = (actualFrame + 1) % bisonEscena.length;
            let frame = bisonEscena[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;
        } else {
            this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        mostrarContador();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }
    let spriteDecoraciones = new Image();
    spriteDecoraciones.src = this.imgDecoraciones;
    this.dibujarObjetos = function () {
        if (Zangif.tamanybarra >= 145 && Bison.tamanybarra <= 0) {
            //Ko
            ctx.drawImage(spriteDecoraciones, 161, 1,
                32, 14, 173, 18, 32, 14);
        } else {
            //Ko
            ctx.drawImage(spriteDecoraciones, 161, 16,
                32, 14, 173, 18, 32, 14);
        }

        if (segundo_10s <= 0 && segundo_1s <= 0) {
            //TIME OVER
            ctx.drawImage(spriteDecoraciones, 352, 112,
                64, 30, 160, 80, 64, 30);

        }

    }

}


// let escena_bison = new stage(0, 0, 621, 224, 'img/bison_Background_sprite.png');
let escena_bison = new Stage(0, 0, 474, 224, 'img/zangif_sprite_background.png', 'img/decoraciones.png');

function inicio() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    principal();
}
// let victoriaP1 = false;
// let victoriaP2 = false;
function principal() {
    borrarCanvas();
    mostrarContador('img/decoraciones.png');
    escena_bison.dibuja();
    escena_bison.animacion();
    Bison.dibuja();
    Bison.dibujarObjetos();
    let animacion1p = "";
    if (esPrimeraMuerte1p) {
        animacion1p = bisonVictory;
        Bison.x = 280;
    } else {
        animacion1p = bisonReady;
        if (!Bison.muertePj) {
            Bison.animacion(animacion1p);
        }
    }
    if (esSegundaMuerte1p) {
        animacion1p = bisonVictoryAlternate;
        Bison.x = 250;
    }
    if (esPrimeraMuerte1p == true || esSegundaMuerte1p == true) {
        Bison.victoriaP2(animacion1p);
        Zangif.muerteP1();
        paraContador = true;
    }

    // Bison.descender();
    Zangif.dibuja();
    Zangif.dibujarObjetos();

    let animacion2p = "";
    if (esPrimeraMuerte2p) {
        animacion2p = ZangiefVictory;
        paraContador = true;

    } else {
        if (!Zangif.muertePj) {
            Zangif.animacion(ZangifReady);
        }
    }
    if (esSegundaMuerte2p) {
        animacion2p = ZangiefVictoryAlternate;
        Zangif.y = 50;
        paraContador = true;
    }
    if (esPrimeraMuerte2p == true || esSegundaMuerte2p == true) {
        Zangif.victoriaP1(animacion2p);
        Bison.muerteP2();
        paraContador = true;
    }
    escena_bison.dibujarObjetos();


    muerte();

    // Zangif.descender();
    interval = requestAnimationFrame(principal);
}



function muerte() {
    if (Zangif.tamanybarra >= 145) {
        // setInterval(() => {
        Zangif.tamanybarra = 0;
        // }, 2000);

        if (esPrimeraMuerte1p) {
            esSegundaMuerte1p = true;
        }
        esPrimeraMuerte1p = true;

    }
    if (Bison.tamanybarra <= 0) {
        // setInterval(() => {
        Bison.tamanybarra = 145;
        // }, 2000);
        if (esPrimeraMuerte2p) {
            esSegundaMuerte2p = true;
        }
        esPrimeraMuerte2p = true;
    }
}


function borrarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}