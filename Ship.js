function Ship() {
    Ship.prototype = this;
    return this;
}

Ship.prototype = {
    X: 10,
    Y: 200,
    Up: function () {
        if (Ship.prototype.Y > 10) {
            Ship.prototype.Y -= 2;
        }
    },
    Down: function () {
        if (Ship.prototype.Y < Game.prototype.Settings.ViewPort().height - 20) {
            Ship.prototype.Y += 2;
        }
    },
    Left: function () {
        if (Ship.prototype.X > 10) {
            Ship.prototype.X -= 2;
        }
    },
    Right: function () {
        if (Ship.prototype.X < Game.prototype.Settings.ViewPort().width - 20) {
            Ship.prototype.X += 2;
        }
    },
    Tick: function () {
    },
    Render: function (context) {
        var ship = Ship.prototype;

        context.fillStyle = "cyan";
        context.beginPath();
        context.moveTo(ship.X, ship.Y);
        context.lineTo(ship.X + 30, ship.Y + 10);
        context.lineTo(ship.X, ship.Y + 20);
        context.lineTo(ship.X, ship.Y);
        context.fill();

    }
};



