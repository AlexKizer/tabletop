var server = diceBag.server({});
server.on('game-success', function(event) {

});
server.game({name: 'myGame'}, function(game) {

});
server.join('game-id', 'user-id', 'secret-password');
server.module('game-id', mod, 'user-id', {params});

//---

var spectator = function() {

}

var player = function() {

}