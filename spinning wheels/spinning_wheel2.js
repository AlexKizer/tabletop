var wheels = function() {
    this.options = {};
};

wheels.options = {
    radius : 100,
    targetStartAngle : 0,
    targetSizeAngle : Math.PI / 8,
    pinSizeAngle : Math.PI / 12,
    speed : Math.PI
};

var active = true,
time = 0,
step = 0,
angle = 0;

wheels.dom = {
    canvasId : 'spinning-wheels',
    pinStart : {x: 400, y:300}
}

var canvas = document.getElementById(wheels.dom.canvasId);
var context =  canvas.getContext('2d');

var time,
    stepAngle,
    angle;

wheels.init = function() {
    stepAngle = wheels.options.speed / 60;//60 FPS
    angle -= wheels.options.pinSizeAngle / 2;
}

wheels.tick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    wheels.draw();
}

wheels.draw = function() {
    if(!active)
        return;
    angle += stepAngle;
    if(angle >= Math.PI * 2)
        angle = 0;
    drawCircle();

    drawPin(wheels.options.targetStartAngle);
    drawPin(wheels.options.targetStartAngle + wheels.options.targetSizeAngle);
    drawPin(wheels.options.targetStartAngle - wheels.options.targetSizeAngle);

    drawPin(angle);
    drawPin(angle + wheels.options.pinSizeAngle);
    drawPin(angle - wheels.options.pinSizeAngle);
}



function drawCircle() {
    context.fillStyle = '#ff0000';
    context.beginPath();
    context.arc(400, 300, wheels.options.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
}

function calculatePinEnd(angle) {
    return {x: Math.cos(angle) * wheels.options.radius + wheels.dom.pinStart.x, y: Math.sin(angle) * wheels.options.radius + wheels.dom.pinStart.y};
}

function drawPin(angle) {
    context.beginPath();
    context.moveTo(400, 300);
    context.lineTo(calculatePinEnd(angle).x, calculatePinEnd(angle).y);
    context.stroke();
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

wheels.init();

(function loop(){
    requestAnimFrame(loop);
    wheels.tick();
})();





