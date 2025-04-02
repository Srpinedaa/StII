var musica;
var efecte1, efecte2, efecte3;
document.addEventListener('DOMContentLoaded', inici);
function inici() {
    //musica de fondo
    musicaEscenari = new Howl({
        src: ['audio/03 Stage Sounds/SFII_23 - Elephant1_left.wav'],
        loop: true
    });

    //sonido de golpe
    so_cops = new Howl({
        src: ['audio/04 Moves & Hits/SFII_52 - Hit the ground.wav'],
        loop: false
    });

    //sonido de rounds
    so_rounds = new Howl({
        src: ['audio/02 Fight Announcer/SFII_18 - Round.wav'],
        loop: false
    });

    //sonido de pelea
    so_fights = new Howl({
        src: ['audio/02 Fight Announcer/SFII_17 - Fight!.wav'],
        loop: false
    });

    //sonido victoria
    victoria = new Howl({
        src: ['audio/02 Fight Announcer/SFII_14 - You win!.wav'],
        loop: false
    });

    //sonido derrota
    derrota = new Howl({
        src: ['audio/02 Fight Announcer/SFII_15 - You lose.wav'],
        loop: false
    });

    iniciar_listener();

}

function iniciar_listener() {
    console.log("Listener iniciat");
    musicaEscenari.play();

    /*document.addEventListener('keydown', function (event) {
        if (event.code == 'X') {
            console.log("x");
            so_cops.play();
        }else if (event.code == 'T') {
            so_cops.stop();
        }

    });


    document.addEventListener('keydown', function (event) {
        if (event.code == 'E') {
            so_rounds.play();
        }

    });
    document.addEventListener('keydown', function (event) {
        if (event.code == 'F') {
            so_fights.play();
        }

    });
    document.addEventListener('keydown', function (event) {
        if (event.code == 'V') {
        }

    });
    document.addEventListener('keydown', function (event) {
        if (event.code == 'D') {
            derrota.play();
        }

    });
    document.addEventListener('keydown', function (event) {
        if (event.code == 'KeyM') {
            if (musicaEscenari.playing()) {
                musicaEscenari.pause();
            } else {
                musicaEscenari.play();
            }
        }

    });*/
   
}

