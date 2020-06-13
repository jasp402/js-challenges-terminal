document.addEventListener("DOMContentLoaded", function() {
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
});

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

let scanlines    = $('.scanlines');
let tv           = $('.tv');
let term         = $('#term').terminal(function (command, term) {
    if (command.match(/^\s*salir\s*$/)) {
        exit();
    } else if (command.match(/^\s*ayuda\s*$/)) {
        help();
    } else if (command !== '') {
        try {
            var result = window.eval(command);
            if (result && result instanceof $.fn.init) {
                term.echo('<#jQuery>');
            } else if (result && typeof result === 'object') {
                tree(result);
            } else if (result !== undefined) {
                term.echo(new String(result));
            }
        } catch (e) {
            term.error(new String(e));
        }
    }
}, {
    name      : 'js_demo',
    onResize  : set_size,
    exit      : false,
    // detect iframe codepen preview
    enabled   : $('body').attr('onload') === undefined,
    onInit    : function () {
        set_size();
        this.echo('Escribe [[b;#fff;]salir] para apagar el sistema.');
        this.echo('Escribe [[b;#fff;]ayuda] para recibir más información');
    },
    onClear   : function () {
        console.log(this.find('video').length);
        this.find('video').map(function () {
            console.log(this.src);
            return this.src;
        });
    },
    prompt    : 'js> '
});
let constraints  = {
    audio: false,
    video: {
        width     : {ideal: 1280},
        height    : {ideal: 1024},
        facingMode: "environment"
    }
};
let acceptStream = (function () {
    return 'srcObject' in document.createElement('video');
})();

async function pictuteInPicture() {
    var [video] = $('video');
    try {
        if (video) {
            if (video !== document.pictureInPictureElement) {
                await video.requestPictureInPicture();
            } else {
                await document.exitPictureInPicture();
            }
        }
    } catch(error) {
        term.error(error);
    }
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
let play = function() {
    var video = term.find('video').slice(-1);
    if (video.length) {
        video[0].play();
    }
}
function camera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        term.pause();
        var media = navigator.mediaDevices.getUserMedia(constraints);
        // TODO: this will create memory leaks when resize Object url will not be revoked
        media.then(function(mediaStream) {
            term.resume();
            var stream;
            if (!acceptStream) {
                stream = window.URL.createObjectURL(mediaStream);
            } else {
                stream = mediaStream;
            }
            term.echo('<video data-play="true" class="self"></video>', {
                raw: true,
                finalize: function(div) {
                    var video = div.find('video');
                    if (!video.length) {
                        return;
                    }
                    if (acceptStream) {
                        video[0].srcObject = stream;
                    } else {
                        video[0].src = stream;
                    }
                    if (video.data('play')) {
                        video[0].play();
                    }
                }
            });
        });
    }
}
function pause() {
    term.find('video').each(function() {
        this.pause(); 
    });
}
function grab() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        term.pause();
        var media = navigator.mediaDevices.getUserMedia(constraints);
        media.then(function(mediaStream) {
            const mediaStreamTrack = mediaStream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(mediaStreamTrack);
            return imageCapture.takePhoto();
        }).then(function(blob) {
            term.echo('<img src="' + URL.createObjectURL(blob) + '" class="self"/>', {
                raw: true,
                finialize: function(div) {
                    div.find('img').on('load', function() {
                        URL.revokeObjectURL(this.src);
                    });
                }
            }).resume();
        }).catch(function(error) {
            term.error('Device Media Error: ' + error);
        });
    }
}
function clear() {
    term.clear();
}
function exit() {
    $('.tv').addClass('collapse');
    term.disable();
}
function help() {
    term.echo([
        'Escribe [[;#fff;]limpiar] para limpiar la consola.',
        '\nEscribe [[;#fff;]creditos] para ver los nombres de los desarrolladores.',
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
cssVars(); // ponyfill
