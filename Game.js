/// <reference path="Stars.js" />
/// <reference path="Ship.js" />
/// <reference path="TypeWriter.js" />
/// <reference path="GameLogic.js" />

function Game() {
    Game.prototype = this;
    return this;
};

var keysDown = {};


Game.prototype.Canvas = null;  
Game.prototype.Context = null;
Game.prototype.Ship = null;
Game.prototype.Stars = null;
Game.prototype.Images = null;
Game.prototype.TypeWriter = null;
Game.prototype.TickCount = 0;
Game.prototype.FPS = 0;
Game.prototype.LastTickCount = new Date().getTime();
Game.prototype.Logic = null;
Game.prototype.Debug = false;
Game.prototype.GameStartTime = null;
Game.prototype.ShowTitleScreen = true;
Game.prototype.ShowHelp = false;
Game.prototype.StartGame = false;
Game.prototype.InGame = false;
Game.prototype.FadeStepCount = 0;


Game.prototype.Settings = {
    ShowFPS: true,
    ViewPort: function () {
        //        var e = window, a = 'inner';
        //        if ( !( 'innerWidth' in window )){
        //            a = 'client';
        //            e = document.documentElement || document.body;
        //        }
        //        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
        return { width: 640, height: 480 };
    }
};


Game.prototype.Initialise = function () {
    var controller = Game.prototype;

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    Game.prototype.TypeWriter = new TypeWriter();
    controller.Canvas = document.getElementById("gameCanvas");
    controller.Canvas.width = Game.prototype.Settings.ViewPort().width;
    controller.Canvas.height = Game.prototype.Settings.ViewPort().height;

    controller.Context = controller.Canvas.getContext("2d");
    controller.Ship = new Ship();
    controller.Stars = new Stars();
    controller.Logic = new GameLogic();
    controller.Stars.Initialise();
    controller.TypeWriter.Initialise();
    controller.Logic.Initialise();    

    setInterval(controller.Tick, 5);
    setInterval(controller.Render, 60);

    var settings = new TypeWriterSettings();
    settings.Speed = 80;
    settings.Text = "Millions of lightyears away, in a far distant galaxy, AgentXIII is about to embark on one of the most important missions known to man... To clear the galaxy of space junk!!!!";
    Game.prototype.TypeWriter.TypeText(settings, controller.Context);
};

Game.prototype.Update = function () {//modifier) {
    var controller = Game.prototype;
    var ship = controller.Ship;

    if (controller.InGame) { //IN GAME!
        if (38 in keysDown) { // Player holding up
            ship.Up();
        }
        if (40 in keysDown) { // Player holding down
            ship.Down();
        }
        if (37 in keysDown) { // Player holding left
            ship.Left();
        }
        if (39 in keysDown) { // Player holding right
            ship.Right();
        }
        if (90 in keysDown) { //Z
            //ship.Shoot();
        }
        if (88 in keysDown) { //X          
        }
    }
    else {
        if (90 in keysDown) { //Z
            controller.ShowTitleScreen = false;
            controller.InGame = true;
            controller.GameStartTime = new Date().getTime();

        }
        if (88 in keysDown) { //X
            controller.ShowTitleScreen = false;
            controller.ShowHelp = true;
        }
    }
};

Game.prototype.Render = function () {
    var controller = Game.prototype;

    controller.Context.fillStyle = "#000000";
    controller.Context.fillRect(0, 0, Game.prototype.Settings.ViewPort().width, Game.prototype.Settings.ViewPort().height);
    controller.Stars.Render(controller.Context);

    if (controller.ShowTitleScreen) {
        var img = new Image();
        img.src = "agent13.png";
        controller.Context.fillStyle = "#72AFFF";
        controller.Context.fillRect(100, 50, 440, 280);
        controller.Context.drawImage(img, 120, 70, 100, 100);
        controller.TypeWriter.Render(controller.Context, 300);

        controller.Context.fillStyle = "yellow";
        controller.Context.font = "bold 70px Courier New";
        controller.Context.fillText("AgentXIII", 150, 300);

        controller.Context.fillStyle = "white";
        controller.Context.font = "bold 14px Courier New";
        controller.Context.fillText("PRESS 'Z' TO START", 250, 350);
    }

    if (controller.InGame) { //IN GAME!
        controller.Ship.Render(controller.Context);
        controller.Logic.Render(controller.Context);

        controller.Context.fillStyle = "white";
        controller.Context.font = "bold 20px Courier New";
        controller.Context.fillText("Score:" + GameLogic.prototype.Score, 500, 465);

        controller.Context.fillStyle = "white";
        controller.Context.font = "bold 20px Courier New";
        var time = new Date().getTime() - controller.GameStartTime;
        controller.Context.fillText((time / 1000) + "s", 50, 465);

        controller.Context.beginPath();
        controller.Context.arc(-100, 240, 150, 0, 2 * Math.PI, false);
        controller.Context.fillStyle = "blue";
        controller.Context.fill();
    }

    if (controller.Debug) {
        var explosionCount = 0;
        for (var i = 0; i < GameLogic.prototype.Explosions.length; i++) {
            if (GameLogic.prototype.Explosions[i] != null)
                explosionCount += 1;
        }
        var rockCount = 0;
        for (i = 0; i < GameLogic.prototype.Rocks.length; i++) {
            if (GameLogic.prototype.Rocks[i] != null)
                rockCount += 1;
        }
            
        controller.Context.fillStyle = "white";
        controller.Context.font = "bold 16px Courier New";
        controller.Context.fillText(
            " Rocks:" + rockCount +
            " Explosions:" + explosionCount + 
            " ShipX:" + controller.Ship.X +
            " ShipY:" + controller.Ship.Y, 5, 465);
    }
};

Game.prototype.Tick = function () {
    var controller = Game.prototype;
    controller.Update();
    var stars = controller.Stars;
    stars.Tick();

    if (controller.InGame) { //IN GAME!
        var ship = Game.prototype.Ship;
        ship.Tick();
        var gameLogic = Game.prototype.Logic;
        gameLogic.Tick();
    }
};

function Images() {
};
Images.prototype = {
   CogImage:null,
   CogImageReady: false
};