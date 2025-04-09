
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
let derrotaPj = false;
let isCrossover = false;
spriteDecoraciones.src = 'img/decoraciones.png';
document.addEventListener('DOMContentLoaded', inicio);


function menuPrincipal() {

}

let mapas = function (x, y, width, height, img, imgDecoraciones) {
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
    this.inmortale = false;

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
        // if (esPrimeraMuerte1p) {
        //     return;
        // }
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }
    this.victoriaP1 = function (nombreAnimacion, posicionActual) {
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
        this.x = posicionActual;
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    this.muerteP1 = function (nombreAnimacion, posicionActual) {
        if (actualFrame != nombreAnimacion.length - 1) {
            actualFrame = (actualFrame + 1) % nombreAnimacion.length;
            let frame = nombreAnimacion[actualFrame];
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
        this.x = posicionActual;
        this.dibuja();
        this.dibujarObjetos();
    }

    //zangif golpe punyo
    this.golpe = function (nombreAnimacion) {
        if (actualFrame != nombreAnimacion.length - 1) {
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

    this.patada = function (nombreAnimacion) {
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
        if (esPrimeraMuerte1p) {
            return;
        }
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    this.golpeEspecial = function () {
        if (actualFrame != zangifGolpeEspecial.length - 1) {
            actualFrame = (actualFrame + 1) % zangifGolpeEspecial.length;
            let frame = zangifGolpeEspecial[actualFrame];
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

    this.caminar = function (nombreAnimacion, esIzquierda) {
        if (this.frameContador >= 4) {
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

        if (esIzquierda == 0) {
            this.x -= this.velocidadX;
        } else {
            this.x += this.velocidadX;
        }
    }

    this.izquierda = function () {
        this.x -= this.velocidadX;
    }

    this.derecha = function () {
        this.x += this.velocidadX;
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
            if (!this.muertePj) {
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



    this.inmortal = function () {
        if (this.inmortale) {
            ctx.fillStyle = '#45c2ea';
            ctx.fillRect(205, 21, 144, 9);
            this.muertePj = false
            //no morir

            // ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
        }
    }

    this.gettingHit = function (nombreAnimacion) {
        if (this.frameContador >= 3) {
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
    }
}

let Zangif = new Player1(50, 92, 103, 110, 'img/zangif.png', 'img/decoraciones.png');
let Mario = new Player1(150, 133, 25, 36, 'img/mario.png', 'img/decoraciones.png');


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
    this.inmortale = false;
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
    this.victoriaP2 = function (nombreAnimacion, posicionActual) {
        if (actualFrame != nombreAnimacion.length - 1) {
            actualFrame = (actualFrame + 1) % nombreAnimacion.length;
            let frame = nombreAnimacion[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;
            this.x = posicionActual;
            this.frameContador = 0;
        } else {
            // this.frameContador++;
        }
        // console.log(posicionActual);
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    this.muerteP2 = function (nombreAnimacion, posicionActual) {
        if (actualFrame != nombreAnimacion.length - 1) {
            actualFrame = (actualFrame + 1) % nombreAnimacion.length;
            let frame = nombreAnimacion[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;
            this.muertePj = true;
            this.y = 150;
            this.x = posicionActual;

            this.frameContador = 0;
        } else {
            // this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    //bison golpe punyo
    this.golpe = function (nombreAnimacion) {
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
        if (esPrimeraMuerte1p) {
            return;
        }
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    this.patada = function (nombreAnimacion) {
        if (actualFrame != nombreAnimacion.length - 1) {
            actualFrame = (actualFrame + 1) % nombreAnimacion.length;
            let frame = nombreAnimacion[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;

            if (actualFrame === zangifPatada.length - 1) {
                animacionActivaZangief = null;
            }
        } else {
            // this.frameContador++;
        }

        // Dibujar el frame actual
        this.dibuja();
        this.dibujarObjetos();
        if (esPrimeraMuerte1p) {
            return;
        }
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    //bison golpe especial
    this.golpeEspecial = function () {
        if (actualFrame != bisonGolpeEspecial.length - 1) {
            actualFrame = (actualFrame + 1) % bisonGolpeEspecial.length;
            let frame = bisonGolpeEspecial[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;

            this.x -= this.velocidadX;
            if (this.x < 0) {
                this.x = 0;
            }
        } else {
            // this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        if (esPrimeraMuerte1p) {
            return;
        }
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }


    this.caminar = function (nombreAnimacion, esIzquierda) {
        if (this.frameContador >= 3) {
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

        if (esIzquierda == 0) {
            this.x -= this.velocidadX;
        } else {
            this.x += this.velocidadX;
        }
    }

    this.izquierda = function () {
        this.x -= this.velocidadX;
    }

    this.derecha = function () {
        this.x += this.velocidadX;
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
            if (!this.muertePj) {
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


    this.inmortal = function () {
        if (this.inmortale) {
            ctx.fillStyle = '#45c2ea';
            ctx.fillRect(35, 21, 138, 9);
            //no morir
            // ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
        }
    }

    this.gettingHit = function (nombreAnimacion) {
        if (actualFrame != nombreAnimacion.length - 1) {
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
    }
}
let Luffy = new player2(250, 125, 34, 43, 'img/luffy.png', 'img/decoraciones.png');
let cambioEscenario = false;
let Bison = new player2(230, 100, 108, 96, 'img/Bison.png', 'img/decoraciones.png');
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        //Jugador Bison
        case "ArrowLeft":
            Bison.caminar(bisonCaminando, 0);
            Luffy.caminar(luffyCaminar, 0);
            break;
        case "ArrowRight":
            Bison.caminar(bisonCaminando, 1);
            Luffy.caminar(luffyCaminar, 1);
            break;
        case "o":
            // Bison.gettingHit();
            break;


        //Jugador Zangif
        case "a":
            Zangif.caminar(zangifCaminando, 0);
            Mario.caminar(marioCaminar, 0);
            break;
        case "d":
            Zangif.caminar(zangifCaminando, 1);
            Mario.caminar(marioCaminar, 1);
            break;
        case "z":
            // Zangif.quitarVida(10);
            break;
        case "b":
            // Bison.quitarVida(10);
            so_rounds.play();
            break;
        case "l":
            cambioEscenario = true;
            break;
        case "k":
            cambioEscenario = false;
            break;
        case "c":
        // Zangif.gettingHit();
        // posicio x y canvas y width height del rectangulo
        default:
            break;
    }
});

let godBuffer = [];

document.addEventListener('keypress', (e) => {

    godBuffer.push(e.key);
    if (godBuffer.length > 3) {
        godBuffer.shift();
    }

    if (godBuffer.join('') === 'god') {
        console.log('inmortal');
        Bison.inmortale = !Bison.inmortale;
        Zangif.inmortale = !Zangif.inmortale;

        godBuffer = [];
    }

});
let animacionActivaZangief = null;
let animacionActivaBison = null;
let animacionActivaLuffy = null;
let animacionActivaMario = null;
let golpeBison = false;
let golpeEspecialBison = false;
let golpeZangif = false;
let golpeEspecialZangif = false;
let bisonGolpeando = 0;
let zangifGolpeando = 0;
let luffyGolpe = false;
let marioGolpe = false;
let luffyGolpeando = 0;
let marioGolpeando = 0;
document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "m":
            bisonGolpeando = (Bison.x + Bison.width) + 90;
            luffyGolpeando = (Luffy.x + Luffy.width) + 30;
            setTimeout(() => {
                golpeBison = false;

                luffyGolpe = false;
            }, 400);
            break;
        case "n": // Patada
            bisonGolpeando = (Bison.x + Bison.width) + 90;
            luffyGolpeando = (Luffy.x + Luffy.width) + 30;
            setTimeout(() => {
                golpeBison = false;
                luffyGolpe = false;

            }, 400);
            break;
        case "t": // Golpe especial
            golpeBison = false;
            golpeEspecialBison = false;
            break;
        case "q": // Patada
            zangifGolpeando = (Zangif.x + Zangif.width) - 90;
            marioGolpeando = (Mario.x + Mario.width) - 50;
            setTimeout(() => {
                marioGolpe = false;
                golpeZangif = false;

            }, 500);
            break;
        case "e": // Golpe
            zangifGolpeando = (Zangif.x + Zangif.width) - 90;
            marioGolpeando = (Mario.x + Mario.width) - 50;
            setTimeout(() => {
                marioGolpe = false;
                golpeZangif = false;

            }, 500);
            break;
        case "r": // Golpe especial
            golpeZangif = false;
            golpeEspecialZangif = false;
            zangifGolpeando = (Zangif.x + Zangif.width) - 90;
            break;
        default:

    }
});

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        // Animaciones de Zangif
        case "q": // Patada
            animacionActivaZangief = 'patada';
            animacionActivaMario = 'patada';
            golpeZangif = true;

            Zangif.frameContador = 0;
            Zangif.actualFrame = 0;
            marioGolpeando = (Mario.x + Mario.width) + 50;
            marioGolpe = true;
            zangifGolpeando = (Zangif.x + Zangif.width) + 90;
            so_fights.play();

            break;
        case "e": // Golpe
            animacionActivaZangief = 'golpe';
            animacionActivaMario = 'golpe';
            golpeZangif = true;
            zangifGolpeando = (Zangif.x + Zangif.width) + 90;

            Zangif.frameContador = 0;
            Zangif.actualFrame = 0;
            marioGolpeando = (Mario.x + Mario.width) + 50;
            marioGolpe = true;
            so_cops.play();
            break;
        case "r": // Golpe especial
            animacionActivaZangief = 'golpeEspecial';
            animacionActivaMario = 'golpeEspecial';
            golpeEspecialZangif = true;
            golpeZangif = true;
            zangifGolpeando = (Zangif.x + Zangif.width) + 90;

            Zangif.frameContador = 0;
            Zangif.actualFrame = 0;

            break;

        // Animaciones de Bison
        case "m": // Golpe
            golpeBison = true;
            animacionActivaBison = 'golpe';
            animacionActivaLuffy = 'golpe';
            bisonGolpeando = (Bison.x + Bison.width) - 90;

            Bison.frameContador = 0;
            Bison.actualFrame = 0;
            luffyGolpe = true;
            luffyGolpeando = (Luffy.x + Luffy.width) - 30;
            so_cops.play();
            break;
        case "n": // Patada
            golpeBison = true;
            animacionActivaBison = 'patada';
            animacionActivaLuffy = 'patada';
            bisonGolpeando = (Bison.x + Bison.width) - 90;
            luffyGolpe = true;
            luffyGolpeando = (Luffy.x + Luffy.width) - 30;
            Bison.frameContador = 0;
            Bison.actualFrame = 0;

            so_fights.play();
            break;
        case "t": // Golpe especial
            animacionActivaBison = 'golpeEspecial';
            animacionActivaLuffy = 'golpeEspecial';
            golpeEspecialBison = true;
            golpeBison = true;
            bisonGolpeando = (Bison.x + Bison.width) - 90;
            Bison.frameContador = 0;
            Bison.actualFrame = 0;

            break;
        default:
            break;
    }
});


document.addEventListener('keyup', (e) => {
    // Detener la animación activa de Zangif
    setTimeout(() => {
        if (e.key === "q" || e.key === "e" || e.key === "r") {
            animacionActivaZangief = null;
            animacionActivaMario = null;
        }
        if (e.key === "m" || e.key === "n" || e.key === "t") {
            animacionActivaBison = null;
            animacionActivaLuffy = null;
        }
    }, 500);


    // Detener la animación activa de Bison

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


let escena_ken = new Stage(0, 0, 621, 224, 'img/Ken_Background_sprite.png', 'img/decoraciones.png');
let escena_bison = new Stage(0, 0, 474, 224, 'img/zangif_sprite_background.png', 'img/decoraciones.png');
let escena_crossover = new Stage(0, 0, 474, 224, 'img/mapAlvida.png', 'img/decoraciones.png');


function inicio() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    crossover();
}


function crossover() {
    borrarCanvas();
    mostrarContador('img/decoraciones.png');
    isCrossover = true;
    escena_crossover.dibuja();
    escena_crossover.animacion(mapaCrossover);

    if (esPrimeraMuerte1p && derrotaPj) {
    } else {
        if (!Mario.muertePj) {
            Mario.animacion(marioReady);
        }
    }

    if (esPrimeraMuerte2p) {
        if (derrotaPj) {
            Mario.victoriaP1(marioVictoria, Mario.x);
            Luffy.muerteP2(luffyMuerte, Luffy.x);
            paraContador = true;
        }
    }

    if (esPrimeraMuerte2p && derrotaPj) {
        // animacionLuffy = luffyVictory;
        paraContador = true;
    } else {
        if (!Luffy.muertePj) {
            Luffy.animacion(luffyReady);
        }
    }
    if (esSegundaMuerte2p) {
        // animacionLuffy = luffyVictoryAlternate;
        Luffy.y = 50;
        paraContador = true;
    }
    if (esPrimeraMuerte1p) {
        if (derrotaPj) {
            Luffy.victoriaP2(luffyVictoria, Luffy.x);
            Mario.muerteP1(marioMuerte, Mario.x);
            paraContador = true;
        } else {
            Luffy.animacion(luffyReady);
        }
    }

    Mario.dibuja();
    Mario.dibujarObjetos();

    Luffy.dibuja();
    Luffy.dibujarObjetos();

    switch (animacionActivaLuffy) {
        case 'patada':
            Luffy.patada(luffyPatada);
            break;
        case 'golpe':
            Luffy.golpe(luffyPunyo);
            break;
        case 'golpeEspecial':
            break;
        default:
            break;
    }
    switch (animacionActivaMario) {
        case 'patada':
            Mario.patada(marioPatada);
            break;
        case 'golpe':
            Mario.golpe(marioPunyo);
            break;
        case 'golpeEspecial':
            break;
        default:
            break;
    }

    escena_crossover.dibujarObjetos();
    colision();
    muerte();
    interval = requestAnimationFrame(crossover);
}



function principal() {
    borrarCanvas();
    mostrarContador('img/decoraciones.png');
    isCrossover = false;
    // console.log(paraContador);
    if (!cambioEscenario) {
        escena_bison.dibuja();
        escena_bison.animacion(bisonEscena);
    } else {
        escena_ken.dibuja();
        escena_ken.animacion(escenari);
    }


    let animacion1p = "";
    if (esPrimeraMuerte1p && derrotaPj) {
        animacion1p = bisonVictory;
    } else {
        if (!Bison.muertePj) {
            Bison.animacion(bisonReady);
        }
    }
    if (esSegundaMuerte1p) {
        animacion1p = bisonVictoryAlternate;
    }
    if (esPrimeraMuerte1p == true || esSegundaMuerte1p == true) {
        if (derrotaPj) {
            Bison.victoriaP2(animacion1p, Bison.x);
            Zangif.muerteP1(zangifMuerte, Zangif.x);
            paraContador = true;

        }
    }

    // Bison.descender();
    Zangif.dibuja();
    Zangif.dibujarObjetos();

    Bison.dibuja();
    Bison.dibujarObjetos();

    let animacion2p = "";

    if (esPrimeraMuerte2p && derrotaPj) {
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
        if (derrotaPj) {
            Zangif.victoriaP1(animacion2p, Zangif.x);
            Bison.muerteP2(bisonMuerte, Bison.x);
            paraContador = true;
        } else {
            Zangif.animacion(ZangifReady);
        }

    }

    // Llamar a la animación activa de Zangif
    switch (animacionActivaZangief) {
        case 'patada':
            Zangif.patada(zangifPatada);
            break;
        case 'golpe':
            Zangif.golpe(zangifPunyo);
            break;
        case 'golpeEspecial':
            Zangif.golpeEspecial();
            break;
        default:
            break;
    }


    // Llamar a la animación activa de Bison
    switch (animacionActivaBison) {
        case 'patada':
            Bison.patada(bisonPatada);
            break;
        case 'golpe':
            Bison.golpe(bisonPunyo);
            break;
        case 'golpeEspecial':
            Bison.golpeEspecial();
            break;
        default:
            break;
    }

    colision();
    escena_bison.dibujarObjetos();


    Bison.inmortal();

    Zangif.inmortal();

    muerte();



    interval = requestAnimationFrame(principal);
}



function reiniciarJuego() {
    console.log("Reiniciar Juego");
    Bison.muertePj = false;
    Zangif.muertePj = false;
    derrotaPj = false;
    // Guardar la victoria del ganador en el almacenamiento local
    if (esPrimeraMuerte1p || esSegundaMuerte1p) {
        localStorage.setItem('winner', 'Bison');
    } else if (esPrimeraMuerte2p || esSegundaMuerte2p) {
        localStorage.setItem('winner', 'Zangif');
    }

    inicio();
}

function muerte() {
    console.log("Muerte");
    derrotaPj = true;
    if (!isCrossover) {
        if (!Zangif.inmortale && Zangif.tamanybarra >= 145) {
            Zangif.tamanybarra = 0;

            if (esPrimeraMuerte1p) {
                esSegundaMuerte1p = true;
            }
            esPrimeraMuerte1p = true;

            victoria.play();
            derrotaPj = false;

            setTimeout(reiniciarJuego, 3000);
        }

        if (!Bison.inmortale && Bison.tamanybarra <= 0) {
            Bison.tamanybarra = 145;

            if (esPrimeraMuerte2p) {
                esSegundaMuerte2p = true;
            }
            esPrimeraMuerte2p = true;

            victoria.play();
            derrota.play();

            setTimeout(reiniciarJuego, 3000);
        }
    } else {
        if (!Luffy.inmortale && Luffy.tamanybarra <= 0) {
            Luffy.tamanybarra = 145;

            if (esPrimeraMuerte2p) {
                esSegundaMuerte2p = true;
            }
            esPrimeraMuerte2p = true;

            victoria.play();
            derrota.play();

            // setTimeout(reiniciarJuego, 3000);
        }

        if (!Mario.inmortale && Mario.tamanybarra >= 145) {
            Mario.tamanybarra = 0;

            if (esPrimeraMuerte1p) {
                esSegundaMuerte1p = true;
            }
            esPrimeraMuerte1p = true;

            victoria.play();
            derrotaPj = false;

            // setTimeout(reiniciarJuego, 3000);
        }
    }



}


function borrarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function colision() {
    if (golpeBison || luffyGolpe) {
        console.log(Zangif.x + Zangif.width);
        console.log(bisonGolpeando);
        if (!isCrossover) {
            if (animacionActivaBison == 'golpeEspecial') {
                bisonGolpeando = (Bison.x - Bison.width) + 10;
            }
            if (bisonGolpeando <= (Zangif.x + Zangif.width)) {
                setTimeout(() => {
                    Zangif.gettingHit(zangiefGettingHit);
                }
                    , 200);
                if (golpeEspecialBison) {
                    Zangif.quitarVida(10);
                } else {
                    Zangif.quitarVida(2);
                }


            }
        } else {
            if (luffyGolpeando <= (Mario.x + Mario.width)) {
                Mario.gettingHit(marioGettingHit);
                if (luffyGolpe) {
                    Mario.quitarVida(2);
                } else {
                    // Mario.quitarVida(2);
                }
            }
        }




    }

    if (golpeZangif || marioGolpe) {
        if (!isCrossover) {
            if (zangifGolpeando >= (Bison.x + Bison.width)) {
                setTimeout(() => {
                    Bison.gettingHit(bisonGettingHit);
                }, 300);
                if (golpeEspecialBison) {
                    Bison.quitarVida(10);
                } else {
                    Bison.quitarVida(2);
                }
            }
        } else {
            console.log(marioGolpeando);
            console.log(Luffy.x + Luffy.width);
            if (marioGolpeando >= (Luffy.x + Luffy.width)) {
                Luffy.gettingHit(luffyGettingHit);
                if (marioGolpe) {
                    Luffy.quitarVida(10);
                } else {
                    Luffy.quitarVida(2);
                }

            }
        }
    }
} 