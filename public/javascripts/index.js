/**
 * Created by aram on 2/14/17.
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// If you want to play with the options, the best way is to enable Dat GUI by setting the following boolean to true
var showDatGUI = false;

var options = {
    drag: 0.90,
    gravity: 0,
    lifespan: 100,
    maxSpeed: 100,
    maxParticles: 500,
    particleColors: ['0, 0, 0'],
    particlesPerPress: 400,
    jitter: 0,
    randomness: 1,
    size: 15,
    sizeRange: 10,
    shrinkSpeed: 0.2
};

// ---------------
// Particle System
// ---------------

var ParticleSystem = function () {
    function ParticleSystem() {
        _classCallCheck(this, ParticleSystem);

        this.particles = [];
    }

    ParticleSystem.prototype.addParticle = function addParticle(opts) {
        for (var i = 0; i < opts.numToAdd; i++) {
            this.particles.push(new Particle(opts));
        }
        while (this.particles.length > options.maxParticles) {
            this.removeParticle();
        }
    };

    ParticleSystem.prototype.removeParticle = function removeParticle() {
        this.particles.shift();
    };

    ParticleSystem.prototype.update = function update() {
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i].lifespan > 0) {
                this.particles[i].update();
            }
        }
    };

    ParticleSystem.prototype.draw = function draw() {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].draw();
        }
    };

    return ParticleSystem;
}();

// ---------------
// Particle
// ---------------

var Particle = function () {
    function Particle(opts) {
        _classCallCheck(this, Particle);

        // How many frames particle will live
        this.lifespan = options.lifespan;

        // Color
        this.color = options.particleColors[Math.floor(Math.random() * options.particleColors.length)];

        // Size
        this.size = options.size;
        this.size += Math.random() * options.sizeRange - options.sizeRange / 2;

        // Position and velocity
        this.x = opts.x;
        this.y = opts.y;

        var velXMin = -opts.leftSpread / (this.lifespan / 10);
        var velXMax = opts.rightSpread / (this.lifespan / 10);
        var velYMin = -opts.topSpread / (this.lifespan / 10);
        var velYMax = opts.bottomSpread / (this.lifespan / 10);

        var velXRange = velXMax - velXMin;
        var velYRange = velYMax - velYMin;

        var originLeftPercent = opts.leftSpread / (opts.leftSpread + opts.rightSpread);
        var originTopPercent = opts.topSpread / (opts.topSpread + opts.bottomSpread);

        this.velX = Math.random() * velXRange - velXRange * originLeftPercent;
        this.velY = Math.random() * velYRange - velYRange * originTopPercent;

        // Values for perlin noise
        this.xOff = Math.random() * 6400;
        this.yOff = Math.random() * 6400;

        // Opacity is reduced as lifespan gets close to 0
        this.opacity = 1;

        // Added to velY every frame
        this.gravity = options.gravity;

        // Multiply with velocity every frame
        this.drag = options.drag;
    }

    Particle.prototype.update = function update() {
        // Add gravity force to the y velocity
        this.velY += this.gravity;

        // Add randomness with perlin noise
        var randomX = noise.simplex2(this.xOff, 0);
        var randomY = noise.simplex2(this.yOff, 0);
        this.velX += randomX / (10 / options.randomness);
        this.velY += randomY / (10 / options.randomness);
        this.xOff += options.jitter;
        this.yOff += options.jitter;

        // // Apply drag
        this.velX *= this.drag;
        this.velY *= this.drag;

        // And the velocity to the position
        this.x += this.velX;
        this.y += this.velY;

        // Apply fade
        this.opacity = this.lifespan / 100;

        // Apply shrink
        this.size -= options.shrinkSpeed;
        this.size = Math.max(0, this.size);

        // Update lifespan
        this.lifespan -= 1;

        if (this.size <= 0.1 || this.opacity <= 0.01) {
            this.lifespan = 0;
        }
    };

    Particle.prototype.draw = function draw() {
        // set the fill style to have the right alpha
        context.fillStyle = 'rgba(' + this.color + ', ' + this.opacity + ')';

        // draw a circle of the required size
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();

        // and fill it
        context.fill();
    };

    return Particle;
}();

// ---------------
// Loop
// ---------------

function loop() {
    // Clear the canvas
    context.clearRect(0, 0, screenWidth, screenHeight);

    // Update and draw paricles
    ps.update();
    ps.draw();

    // RAF
    requestAnimationFrame(loop);
}

function explode(el, x, y) {
    var dialog = document.querySelector('.dialog');
    var rect = dialog.getBoundingClientRect();

    dialog.classList.remove('is-in');
    ps.addParticle({
        numToAdd: options.particlesPerPress,
        x: x,
        y: y,
        leftSpread: x - rect.left,
        rightSpread: rect.right - x,
        topSpread: y - rect.top,
        bottomSpread: rect.bottom - y
    });
}

// Globals
var ps = undefined;
var context = undefined;

var mouseX = undefined;
var mouseY = undefined;
var isPointerPressed = false;

// Get screen size variables
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var halfWidth = window.innerWidth / 2;
var halfHeight = window.innerHeight / 2;

function updateCanvasAndScreenVars() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    halfWidth = window.innerWidth / 2;
    halfHeight = window.innerHeight / 2;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

// Initialize
console.clear();

// Create Canvas element
var canvas = document.createElement('canvas');
context = canvas.getContext('2d');

$('.shaker').append(canvas);

updateCanvasAndScreenVars();

$(window).on('resize', updateCanvasAndScreenVars);

$('button').on('click', function (e) {
    var shaker = document.querySelector('.shaker');
    shaker.classList.add('is-shaking');
    var dialog = document.querySelector('.dialog');

    explode(dialog, e.pageX, e.pageY);
    setTimeout(function () {
        $(dialog).css('z-index', 1);
    }, 200);

    setTimeout(function () {
        shaker.classList.remove('is-shaking');
        $(dialog).css('z-index', 10);
        $("#message").show();
        $("button").hide();

        showDialog("please wait...");
    }, 1000);
    $.get('/users',function(response){
        explode(dialog, e.pageX, e.pageY);
        setTimeout(function () {
            $(dialog).css('z-index', 1);
        }, 200);
        $("#message").hide();


        setTimeout(function () {
            shaker.classList.remove('is-shaking');
            $("button").show();
            $(dialog).css('z-index', 10);
            showDialog("done!");
            $("body").off("click", "button");
        }, 1000);
    });


});

function showDialog(message) {
    $('button').text(message);
    var dialogWidth = Math.random() * (screenWidth * 0.8);
    dialogWidth = Math.max(dialogWidth, 380);
    dialogWidth = Math.min(dialogWidth, 600);
    var dialogHeight = Math.random() * (screenHeight * 0.8);
    dialogHeight = Math.max(dialogHeight, 160);
    dialogHeight = Math.min(dialogHeight, 600);
    var top = Math.random() * (screenHeight - dialogHeight);
    var left = Math.random() * (screenWidth - dialogWidth);
    $('.dialog').css({
        width: dialogWidth,
        height: dialogHeight,
        top: top,
        left: left
    }).addClass('is-in');
}

// Perlin Noise
noise.seed(Math.floor(Math.random() * 64000));

// Create Particle System
ps = new ParticleSystem();

// Dat GUI for options
if (showDatGUI) {
    var gui = new dat.GUI();
    gui.add(options, 'lifespan', 0, 1000);
    gui.add(options, 'maxSpeed', 0, 100);
    gui.add(options, 'drag', 0.6, 1);
    gui.add(options, 'gravity', 0, 2.5);
    gui.add(options, 'particlesPerPress', 0, 100);
    gui.add(options, 'maxParticles', 0, 200);
    gui.add(options, 'jitter', 0, 1);
    gui.add(options, 'randomness', 0, 10);
    gui.add(options, 'size', 0, 100);
    gui.add(options, 'sizeRange', 0, 100);
    gui.add(options, 'shrinkSpeed', 0, 2);
}

