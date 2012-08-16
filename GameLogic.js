
function GameLogic() {
    GameLogic.prototype = this;
}

GameLogic.prototype.Score = 0;
GameLogic.prototype.GenerateRockWaitTime = 0;
GameLogic.prototype.Rocks = [];
GameLogic.prototype.Initialise = function() {
};

GameLogic.prototype.GenerateRock = function () {
    var rock = new Rock();
    rock.X = 680;
    rock.Speed = Math.floor((Math.random() * 3) + 3);
    rock.Y = Math.floor((Math.random() * 640) + 1);
    rock.SizeModifier = Math.floor((Math.random() * 5) + 1);
    
    return rock;
};

GameLogic.prototype._odd = true;
GameLogic.prototype.Tick = function () {
    if (GameLogic.prototype._odd) {
        GameLogic.prototype._odd = false;
        return;
    }
    else {
        GameLogic.prototype._odd = true;
    }

    GameLogic.prototype.GenerateRockWaitTime += 1;

    for (var i = 0; i < GameLogic.prototype.Rocks.length; i++) {
        var rock = GameLogic.prototype.Rocks[i];
        rock.X -= rock.Speed;
        var y = (Math.floor((Math.random() * 10) + 1)) - 5;

        if (rock.Y + y > 640)
            rock.Y -= y - 10;
        else if (rock.Y - y < 0)
            rock.Y += y + 10;
        else
            rock.Y += y;
    }

    for (var j = 0; j < GameLogic.prototype.Rocks.length; j++) {
        var rock = GameLogic.prototype.Rocks[j];
        if(rock.X > Game.prototype.Ship.X) {
            if (rock.X < Game.prototype.Ship.X+40) {
                if (rock.Y > Game.prototype.Ship.Y) {
                    if (rock.Y < Game.prototype.Ship.Y+40) {
                        GameLogic.prototype.Score += 10;
                    }
                }
            }   
        }
    }

    if (GameLogic.prototype.GenerateRockWaitTime == 50) {
        GameLogic.prototype.Rocks[GameLogic.prototype.Rocks.length] = GameLogic.prototype.GenerateRock();
        GameLogic.prototype.GenerateRockWaitTime = 0;
    }
};

GameLogic.prototype.Render = function (context) {
    var rocks = GameLogic.prototype.Rocks;
    for (var i = 0; i < rocks.length; i++) {
        context.fillStyle = "red";
        context.fillRect(rocks[i].X, rocks[i].Y, 4 * rocks[i].SizeModifier, 4 * rocks[i].SizeModifier);
    }
};

function Rock() {
    return {
      Speed: 0,
      X: 0,
      Y: 0,
      SizeModifier: 0,
      Colour: "#A8A8A8"
    };
}

