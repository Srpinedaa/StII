
var musica;
var efecto1, efecto2, efecto3;
document.addEventListener('DOMContentLoaded', inicio);

function inicio() {
    musica = new Howl({
        src: ['music/01.mp3'],
        loop: true,
        volume: 0.5
    });

    so_disparar = new Howl({
        src: ['sound/efecto1.wav'],
        volume: 0.5
    });

    iniciar_listeners();
}

function iniciar_listeners() {
    musica.play();

    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 32) {
            so_disparar.play();
        }
        if (e.key == "s") {
            if (musica.playing()) {
                musica.pause();
            } else {
                musica.play();
            }
        }
    });
    //musica.pause();
}