/// <reference path="Stars.js" />
/// <reference path="Ship.js" />
/// <reference path="TypeWriter.js" />

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
    controller.Stars.Initialise();
    controller.TypeWriter.Initialise();
    
    //Starts the Game
    controller.Reset();
    setInterval(controller.Tick, 1);
    setInterval(controller.Render, 37);

    var settings = new TypeWriterSettings();
    settings.Speed = 80;
    settings.Text = "Millions of lightyears away, in a far distant galaxy, AgentXIII is about to embark on one of the most important missions known to his race...                                                            To DESTROY ALL HUMANS!!!!";
    Game.prototype.TypeWriter.TypeText(settings, controller.Context);
};

Game.prototype.Reset = function () {
    //reset the game
};

Game.prototype.Update = function () {//modifier) {
    var controller = Game.prototype;
    var ship = controller.Ship;
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
        if (controller.ShowTitleScreen) {
            controller.ShowTitleScreen = false;
            controller.FadeTitle = true;
        }
        else {
            ship.Shoot();
        }
    }
};

Game.prototype.ShowTitleScreen = true;
Game.prototype.FadeTitle = false;
Game.prototype.InGame = false;
Game.prototype.FadeStepCount = 0;

Game.prototype.Render = function () {
    var controller = Game.prototype;

    //var images = Game.prototype.Images;
    //if (images.BackgroundImageReady) {
    //    controller.Context.drawImage(images.BackgroundImage, 0, 0);
    //}

    //Clear the Canvas
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

    if (controller.FadeTitle) {
        
        controller.FadeStepCount += 1;
    }
    if (controller.InGame) { //IN GAME!
        controller.Ship.Render(controller.Context);

    }
};

Game.prototype.Tick = function () {
    var controller = Game.prototype;
    controller.Update();
    var ship = Game.prototype.Ship;
    ship.Tick();
    var stars = controller.Stars;
    stars.Tick();
};

function Images() {
};
Images.prototype = {
   CogImage:null,
   CogImageReady: false
};