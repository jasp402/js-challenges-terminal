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

$( document ).ready(function() {
    title = "___T E R M I N A L____D E____R E T O S___[  J A V A S C R I P T  ]___";
    position = 0;
    function scrolltitle() {
        document.title = title.substring(position, title.length) + title.substring(0, position);
        position++;
        if (position > title.length) position = 0;
        titleScroll = window.setTimeout(scrolltitle,170);
    }
    scrolltitle();

    $('.terminal-output > div')[0].remove();
    // $('.twitter.social-icon a')[0].setAttribute('href', 'https://twitter.com/jasp402')

});

let challenges = [{
    ID       : 1,
    CHALLENGE: '#1 => MERGE MULTIPLE ARRAYS',
    SUCCESS  : false
},
{
    ID       : 2,
    CHALLENGE: '#2 => SUM CONTENT OF AN ARRAY',
    SUCCESS  : false
}];
let activeChallenges = 0;
let scanlines    = $('.scanlines');
let tv           = $('.tv');

let term = $('#term').terminal(function (command, term) {
    if (command.match(/^\s*salir\s*$/)) {
        exit();
    }
    else if (command.match(/^\s*ayuda\s*$/)) {
        help();
    }
    else if (command.match(/^\s*ls\s*$/)) {
        ls();
    }
    else if (command.match(/^\s*clear|limpiar|cls\s*$/)) {
        clear();
    }
    else if (command.match(/^\s*creditos\s*$/)) {
        credits();
    }
    else if (command.match(/^\s*reto#[0-9]\s*$/)) {
        let arCommand    = command.split('#');
        let id           = arCommand[1];
        activeChallenges = id;
        let reto         = challenges.find(x => x.ID == id);
        this.set_prompt(`(Reto #${id}) js> `);
        this.echo(treeify.asTree(reto, true, true));
    }
    else {
        if (command !== '') {
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
        this.echo(['[[;#fff;]Terminal de Retos [JavaScript]] v.0.0.1\n',
            '(c) 2020 Jasp402 - Developers. Todos los derechos reservados.\n',
            '\n',
            'Plataforma educativa, Donde la comunidad de desarrolladores puede resolver desafíos de programación en JavaScript \n',
            'Escribe [[b;#fff;]ayuda] para recibir más información'].join(''));
    },
    prompt  : 'js> '
});

function init(){
    term.echo(['[[;#fff;]Terminal de Retos [JavaScript]] v.0.0.1\n',
        '(c) 2020 Jasp402 - Developers. Todos los derechos reservados.\n',
        '\n',
        'Plataforma educativa, Donde la comunidad de desarrolladores puede resolver desafíos de programación en JavaScript \n',
        'Escribe [[b;#fff;]ayuda] para recibir más información'].join(''));
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
    var width = $(window).width();
    var time = (height * 2) / 170;
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
        '[[;#fff;]limpiar]  \t Para limpiar la consola. \n',
        '[[;#fff;]ls]       \t Para listar los retos \n',
        '[[;#fff;]reto#]    \t Para ingresar a un desafio, debe colocar el numero del reto a resolver. Ejemplo: [[;#fff;]reto#1] \n',
        '[[;#fff;]creditos] \t para ver los nombres de los desarrolladores.',
    ].join(''));
}

var github = function(repo) {
    var a = document.createElement('a');
    a.target = '_top';
    a.setAttribute('class', 'github');
    a.href = 'https://github.com/' + repo;
    a.innerHTML = '<img style="position: fixed; top: 0; right: 0; border: 0; cursor: pointer;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"/>';
    document.addEventListener("DOMContentLoaded",
        function() {
            document.body.appendChild(a);
        });
};

if (!term.enabled()) {
    term.find('.cursor').addClass('blink');
}

github('jasp402/js-challenges-terminal');
cssVars();