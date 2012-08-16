function Stars() {
    Stars.prototype = this;
    return this;
}

Stars.prototype.TickType = 0;
Stars.prototype.StarMapLayerX = [];
Stars.prototype.StarMapLayerY = [];
Stars.prototype.StarMapLayerTickCount = [];

Stars.prototype.Initialise = function () {

    for (var i = 0; i < 512; i++) {
        var randomX = Math.floor((Math.random() * Game.prototype.Settings.ViewPort().width) + 1);
        var randomY = Math.floor((Math.random() * Game.prototype.Settings.ViewPort().height) + 1);
        Stars.prototype.StarMapLayerX[i] = randomX;
        Stars.prototype.StarMapLayerY[i] = randomY;
    }
};

Stars.prototype.Tick = function () {

    for (var i = 0; i < 512; i++) {
        //this should move the stars in four layers
        if ((i % (Stars.prototype.TickType + 1)) == 0) {
            Stars.prototype.StarMapLayerX[i] -= 1;
            if (Stars.prototype.StarMapLayerX[i] == 0) {
                Stars.prototype.StarMapLayerX[i] = Game.prototype.Settings.ViewPort().width;
            }
        }
    }

    Stars.prototype.TickType += 1;
    if (Stars.prototype.TickType == 8) {
        Stars.prototype.TickType = 0;
    }
};

Stars.prototype.Render = function (context) {
    for (var i = 0; i < 512; i++) {

        var rand = Math.floor((Math.random() * 5) + 1);
        switch(rand) {
            case 0: context.fillStyle = "white"; break;
            case 1: context.fillStyle = "yellow"; break;
            case 2: context.fillStyle = "red"; break;
            case 3: context.fillStyle = "cyan"; break;
            case 4: context.fillStyle = "green"; break;
        }

        context.fillRect(Stars.prototype.StarMapLayerX[i], Stars.prototype.StarMapLayerY[i], 2, 1);
    }
};