$( document ).ready(function() {
    $('.terminal-output > div')[0].remove();
    $('.twitter.social-icon a')[0].setAttribute('href', 'https://twitter.com/jasp402')
    title = "___T E R M I N A L____D E____R E T O S___[  J A V A S C R I P T  ]___";
    position = 0;
    function scrolltitle() {
        document.title = title.substring(position, title.length) + title.substring(0, position);
        position++;
        if (position > title.length) position = 0;
        titleScroll = window.setTimeout(scrolltitle,170);
    }
    scrolltitle();
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

if (!term.enabled()) {
    term.find('.cursor').addClass('blink');
}

github('jasp402/js-challenges-terminal');
cssVars(); // ponyfill
