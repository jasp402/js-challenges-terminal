/*The graphic part is small, I think this should go inside the html sheet, because it is shorter*/
/*document.addEventListener("DOMContentLoaded", function() {
    function link(url) {
        var link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        head.appendChild(link);
    }
    var head = document.querySelector('head');
    link('https://codepen.io/jcubic/pen/WZjbgq.css?v=3');
    var div = document.createElement('div');
    div.setAttribute('class', 'twitter social-icon');
    div.innerHTML = '<a href="https://twitter.com/jasp402" target="_blank">' +
        '<svg style="width: 24px; height:24px" aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon">Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg></a>';
    document.body.appendChild(div);
});*/

$(document).ready(function () {
    title    = "___T E R M I N A L____D E____R E T O S___[  J A V A S C R I P T  ]___";
    position = 0;

    function scrolltitle() {
        document.title = title.substring(position, title.length) + title.substring(0, position);
        position++;
        if (position > title.length) position = 0;
        titleScroll = window.setTimeout(scrolltitle, 170);
    }

    scrolltitle();

    $('.terminal-output > div')[0].remove();
    // $('.twitter.social-icon a')[0].setAttribute('href', 'https://twitter.com/jasp402')

});

let challenges       = [
    {
        ID       : 1,
        SUCCESS  : false,
        CHALLENGE: 'RETO#1 =>  ¿Qué sucede cuando intentas acceder a una variable antes de declararla en JavaScript?',
        OPTIONS  : [
            'Se lanza un error y el código deja de ejecutarse.',
            'La variable se considera "undefined" y el código continúa ejecutándose.',
            'El valor de la variable es automáticamente igual al valor de una variable global con el mismo nombre.'
        ],
        SOLUTION : 2
    },
    {
        ID       : 2,
        SUCCESS  : false,
        CHALLENGE: 'RETO#2 => ¿Cuál es la salida del siguiente código?\n' +
            'let foo = function () { return "foo"; };\n' +
            'let bar = function () { return "bar"; };\n' +
            'bar = foo;\n' +
            'console.log(bar());',
        OPTIONS  : [
            '"foo"',
            '"bar"',
            'undefined'
        ],
        SOLUTION : 1
    },
    {
        ID       : 3,
        SUCCESS  : false,
        CHALLENGE: 'RETO#3 => ¿Cuál es la salida del siguiente código?\n' +
            'console.log([1, 2, 3].map(parseInt));',
        OPTIONS  : [
            '[1, 2, 3]',
            '[NaN, NaN, NaN]',
            '[1, NaN, NaN]'
        ],
        SOLUTION : 3
    },
    {
        ID       : 4,
        SUCCESS  : false,
        CHALLENGE: 'RETO#4 => ¿Cuál es la salida del siguiente código?\n' +
            'function makeAdder(x) {\n' +
            '    return function(y) {\n' +
            '        return x + y;\n' +
            '    };\n' +
            '}\n' +
            'const add5 = makeAdder(5);\n' +
            'console.log(add5(3));',
        OPTIONS  : [
            '8',
            '53',
            'undefined'
        ],
        SOLUTION : 1
    },
    {
        ID       : 5,
        SUCCESS  : false,
        CHALLENGE: 'RETO#5 => ¿Cuál es la salida del siguiente código?\n' +
            'const person = {\n' +
            '    firstName: "John",\n' +
            '    lastName: "Doe",\n' +
            '    get fullName() {\n' +
            '        return `${this.firstName} ${this.lastName}`;\n' +
            '    },\n' +
            '    set fullName(value) {\n' +
            '        const parts = value.split(" ");\n' +
            '        this.firstName = parts[0];\n' +
            '        this.lastName = parts[1];\n' +
            '    }\n' +
            '};\n' +
            'person.fullName = "Jane Smith";\n' +
            'console.log(person.fullName);',
        OPTIONS  : [
            '"John Doe"',
            '"Jane Smith"',
            'undefined'
        ],
        SOLUTION : 2
    }
];
let activeChallenges = 0;
let inSelection      = false;
let scanlines        = $('.scanlines');
let tv               = $('.tv');
let countdown;
let countdownActive  = false;
let initText = ['[[;#fff;]Terminal de Retos [JavaScript]] v.1.0.2\n',
    '(c) 2023 Jasp402 - Developers. Todos los derechos reservados.\n',
    '_____________________________________________________________\n',
    'RETOS-JS: Desata tu talento en JavaScript con nuestro emocionante juego retro interactivo.\n',
    'Supera desafíos de programación en estilo arcade y ¡atrévete a llegar más lejos!\n',
    '\n'].join('');
let areYouDead = '[[b;#f00;]                                                  \n' +
    '               &&&&& ....,,,,,,&&&&&              \n' +
    '           .&&&.     .....,,,,,,,,,,&&&           \n' +
    '        &&&&.   ..............,,,,,,,,,&&&&       \n' +
    '       &.... .................,,,,,,,,,,,,,&      \n' +
    '       &..   ..................,,,,,,,,,,,,&&&    \n' +
    '     &&.  .....................,,,,,,,,,,,,,&&    \n' +
    '     &&......&&&&&&&&&&.....&&&&&&&&&&,,,,,,&&    \n' +
    '     &&.....&&&&&&&&&&&&&.&&&&&&&&&&&&&,,,,,&&    \n' +
    '       &....&&&&&&&&&&&.....&&&&&&&&&&&,,,,&      \n' +
    '       &.....&&&&&&&&.........&&&&&&&&,,,,,&      \n' +
    '        &&&&...........&&&&&...,,,,,,,,&&&&       \n' +
    '          &&&..........&&&&&..,,,,,,,,&&&         \n' +
    '               &&&..........,,,,,&&&              \n' +
    '                @&,,.,,..,..,,,,,&(               \n' +
    '                @&,,.,,..,..,,,,,&(               \n' +
    '                                                  ]';

let textCountDown = ['[[;#fff;]Terminal de Retos [JavaScript]] v.1.0.2\n',
    '(c) 2023 Jasp402 - Developers. Todos los derechos reservados.\n',
    '_____________________________________________________________\n',
    'RETOS-JS: Desata tu talento en JavaScript con nuestro emocionante juego retro interactivo.\n',
    'Supera desafíos de programación en estilo arcade y ¡atrévete a llegar más lejos!\n'].join('');


let term = $('#term').terminal(function (command, term) {
    if (inSelection) {
        inSelection          = false;
        let currentChallenge = challenges.find(x => x.ID == activeChallenges);
        let userSelection    = parseInt(command);
        if (userSelection === currentChallenge.SOLUTION) {
            clear();
            term.echo(`[[b;#0f0;]¡Felicidades! Has completado con éxito el RETO #${activeChallenges}.]`);
            term.echo(`Puedes elegir el siguiente [[b;#0f0;]RETO#${eval(Number(activeChallenges) + 1)}]`);
            this.set_prompt(`js> `);
            currentChallenge.SUCCESS = true;
        }
        else {
            clear();
            term.echo(`[[b;#f00;]Respuesta incorrecta. ¡Sigue intentando!]`);
            mostrarReto(activeChallenges);
        }
    }
    else if (command.match(/^\s*salir\s*$/)) {
        exit();
    }
    else if (command.match(/^\s*ayuda\s*$/)) {
        help();
    }
    // else if (command.match(/^\s*ls\s*$/)) {
    //     ls();
    // }
    else if (command.match(/^\s*clear|limpiar|cls\s*$/)) {
        clear();
    }
    else if (command.match(/^\s*creditos\s*$/)) {
        credits();
    }
    else if (command.match(/^\s*reto#[0-9]\s*$/)) {
        clear();
        let arCommand = command.split('#');
        let id        = arCommand[1];
        if (id == 1 && !countdownActive) {
            startCountdown();
            clear();
        }
        activeChallenges = id;
        console.log(activeChallenges !== 1)
        if (Number(activeChallenges) !== 1) {
            let lastChallenges = challenges.find(x => x.ID == activeChallenges - 1);
            if (lastChallenges.SUCCESS == false) {
                term.echo(`[[b;#f00;]Debes completar el reto anterior para poder acceder a este.]`);
                return;
            }
        }
        this.set_prompt(`(Reto #${id}) js> `);
        mostrarReto(id);
    }
    else {
        if (activeChallenges != 0) {
            let currentChallenge = challenges.find(x => x.ID == activeChallenges);
            if (command === currentChallenge.SOLUTION) {
                term.echo(`[[b;#0f0;]¡Felicidades! Has completado con éxito el Reto #${activeChallenges}.]`);
                currentChallenge.SUCCESS = true;
            }
            else if (command.match(/^\s*clear|limpiar|cls\s*$/)) {
                clear();
            }
            else {
                term.echo(`[[b;#f00;]Respuesta incorrecta. ¡Sigue intentando!]`);
            }
        }
        else {
            term.error([
                `"${command}" no se reconoce como un comando interno o externo,\n`,
                'programa o archivo por lotes ejecutable.'
            ].join(''));
        }
    }
}, {
    name    : 'js_demo',
    onResize: set_size,
    exit    : false,
    enabled : $('body').attr('onload') === undefined,
    onInit  : function () {
        set_size();
        this.echo(['[[;#fff;]Terminal de Retos [JavaScript]] v.1.0.2\n',
            '(c) 2023 Jasp402 - Developers. Todos los derechos reservados.\n',
            '_____________________________________________________________\n',
            '[[b;#fff;]RETOS-JS] es un juego interactivo en la web, con un estilo retro, que desafía a los\n' +
            'desarrolladores a mejorar sus habilidades en [[b;#fff;]JavaScript] mediante una serie de retos de\n' +
            'programación. La plataforma utiliza una interfaz de consola para ofrecer una experiencia de\n' +
            'usuario única y nostálgica, permitiendo a los jugadores resolver desafíos en un entormo que\n' +
            'recuerda a las consolas de programación clásicas.\n' +
            '\n' +
            'El juego pone a prueba la agilidad mental y la capacidad de resolución de problemas de los\n' +
            'usuarios al presentarles una variedad de desafíos que deben completar en un tiempo\n' +
            'limitado. A pesar de no ser colaborativo, RETOS-JS fomenta la autosuperación y el\n' +
            'aprendizaje independiente, ya que cada desarrollador se enfrenta a los retos de manera\n' +
            'individual y se esfuerza por mejorar sus habilidades.\n' +
            '\n' +
            'RETOS-JS es una herramienta de aprendizaje lúdica y efectiva para desarrolladores de todos\n' +
            'los niveles. Al combinar un estilo retro con una mecánica de juego basada en desafíos de\n' +
            'programación, la plataforma se convierte en una experiencia única y emocionante para los\n' +
            'entusiastas de JavaScript que buscan perfeccionar sus habilidades en un entorno no\n' +
            'colaborativo y autónomo.\n\n' +
            '> Escribe \([[b;#fff;]ayuda]\) para recibir más información\n'].join(''));
    },
    prompt  : 'js> ',
    clear   : false
});

function init() {
    term.echo(initText);
}

function credits() {
    term.echo([
        'Developers:',
        '[[;#fff;]Jasp402] (Jesus perez)\n',
        'Colaboladores: \n',
    ].join(''));
}

function set_size() {
    // for window height of 170 it should be 2s
    var height = $(window).height();
    var width  = $(window).width();
    var time   = (height * 2) / 170;
    scanlines[0].style.setProperty("--time", time);
    tv[0].style.setProperty("--width", width);
    tv[0].style.setProperty("--height", height);
}

function tree(obj) {
    term.echo(treeify.asTree(obj, true, true));
}

function ls() {
    term.set_prompt(`js> `);
    term.echo(treeify.asTree(challenges, true, true));
}

function clear() {
    term.clear();
    init();
}

function exit() {
    $('.tv').addClass('collapse');
    term.disable();
}

function help() {
    clear();
    term.echo([
        '[[;#fff;]ayuda]    \t Para listar todas las opciones disponibles. \n',
        '[[;#fff;]limpiar]  \t Para limpiar la consola. \n',
        '[[;#fff;]ls]       \t Para listar los retos. \n',
        '[[;#fff;]reto#]    \t Para ingresar a un desafio, debe colocar el numero del reto a resolver. Ejemplo: [[;#fff;]reto#1] \n',
        '[[;#fff;]creditos] \t para ver los nombres de los desarrolladores.',
    ].join(''));
}

function mostrarReto(id) {
    let reto = challenges.find(x => x.ID == id);
    let maxLetters = reto.CHALLENGE.length <= 150 ? (reto.CHALLENGE.length + 4) : 150;
    console.log(maxLetters);
    let frames = '-'.repeat(maxLetters);
    term.echo(frames);
    term.echo(reto.CHALLENGE);
    term.echo(frames);
    term.echo("Seleccione una opción:");
    reto.OPTIONS.forEach((option, index) => {
        term.echo(`${index + 1}. ${option}`);
    });
    term.echo("\nEscriba el número de la opción y presione ENTER.");
    inSelection = true;
}

function startCountdown() {
    let minutes     = 1;
    let seconds     = 0;
    countdownActive = true;
    let arEndMessage = ["¡FIN DEL TIEMPO!","¡TIEMPO ESTA AGOTADO!","¡SE ACABÓ EL TIEMPO!","¡EL RELOJ MARCA CERO!","¡LA CUENTA ATRÁS TERMINÓ!","¡TIEMPO CUMPLIDO!","¡EL TIEMPO HA EXPIRADO!"]
    let endMessage  = Math.floor(Math.random() * 7) + 1 <= 7 ? arEndMessage[Math.floor(Math.random() * 7)] : arEndMessage[0];

    countdown = setInterval(function () {
        let countdownString = `${textCountDown}\n[[;#fff;]¡TU DESAFIO HA COMENZADO!]: Tienes [[;#fff;]${minutes}:${seconds < 10 ? '0' + seconds : seconds}] para resolver el mayor numero de retos posibles.\n`;
        term.update(0, countdownString);
        seconds--;
        if (seconds < 0) {
            minutes--;
            seconds = 59;
        }
        if (minutes < 0) {
            clearInterval(countdown);
            countdownActive = false;
            clear();
            term.update(0, `${areYouDead}\n              [[;#fff;]${endMessage}]`);
            term.set_prompt("js> ");
        }
    }, 1000);
}

var github = function (repo) {
    var a    = document.createElement('a');
    a.target = '_top';
    a.setAttribute('class', 'github');
    a.href      = 'https://github.com/' + repo;
    a.innerHTML = '<img style="position: fixed; top: 0; right: 0; border: 0; cursor: pointer;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"/>';
    document.addEventListener("DOMContentLoaded",
        function () {
            document.body.appendChild(a);
        });
};

if (!term.enabled()) {
    term.find('.cursor').addClass('blink');
}

github('jasp402/js-challenges-terminal');
cssVars();