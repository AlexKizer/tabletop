window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var active = true;

var targetStart = 0;
var targetAngle = Math.PI / 8;//radians
var pinAngle = Math.PI / 12;//radians
var speed = Math.PI;//radians per second
var pinStart = {x: 400, y: 300};
var radius = 50;

var containerClass = 'container';
var canvasId = 'spinning-wheels';
var canvas = document.getElementById(canvasId);
var context =  canvas.getContext('2d');

var time = 0;
var stepAngle = 0;
var angle = 0;


init();

function init() {
    stepAngle = speed / 60;//60 FPS
    angle -= pinAngle / 2;
}

(function loop(){
    requestAnimFrame(loop);
    tick();
})();

function tick() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

function draw() {
    if(!active)
        return;
    angle += stepAngle;
    if(angle >= Math.PI * 2)
        angle = 0;
    drawCircle();

    drawPin(targetStart);
    drawPin(targetStart + targetAngle);
    drawPin(targetStart - targetAngle);

    drawPin(angle);
    drawPin(angle + pinAngle);
    drawPin(angle - pinAngle);
}

function drawCircle() {
    context.fillStyle = '#ff0000';
    context.beginPath();
    context.arc(400, 300, radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
}

function calculatePinEnd(angle) {
    return {x: Math.cos(angle) * radius + pinStart.x, y: Math.sin(angle) * radius + pinStart.y};
}

function drawPin(angle) {
    context.beginPath();
    context.moveTo(400, 300);
    context.lineTo(calculatePinEnd(angle).x, calculatePinEnd(angle).y);
    context.stroke();
}

canvas.onmousedown = function () {
    stop();
}

function stop() {
    active = false;
    console.log('Angle:' + angle);
    console.log('Target: ' + targetStart);
    var dt1 = Math.abs(angle);
    var dt2 = Math.abs(Math.PI * 2 - angle);
    console.log('Difference Angle: ' + dt1);
    console.log('Difference Angle 2: ' + dt2);
    var dt;
    if(dt1 < dt2)
        dt = dt1;
    else
        dt = dt2;
    var dA = (dt / 2) * radius * radius;
    var percent = 100 * dA / (Math.PI * radius * radius);


    console.log('Area: ' + dA);
    console.log('% Diff: ' + percent);

}
