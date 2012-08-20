function Ship() {
    Ship.prototype = this;
    return this;
}

Ship.prototype = {
    Boost: false,
    Health: 500,
    X: 100,
    Y: 200,
    Up: function () {
        if (Ship.prototype.Y > 10) {
            Ship.prototype.Y -= 2;
            if (Ship.prototype.Boost) {
                Ship.prototype.Y -= 1;
                Ship.prototype.Boost = false;
            }
        }
    },
    Down: function () {
        if (Ship.prototype.Y < Game.prototype.Settings.ViewPort().height - 20) {
            Ship.prototype.Y += 2;
            if (Ship.prototype.Boost) {
                Ship.prototype.Y += 1;
                Ship.prototype.Boost = false;
            }
        }
    },
    Left: function () {
        if (Ship.prototype.X > 50) {
            Ship.prototype.X -= 2;
            if (Ship.prototype.Boost) {
                Ship.prototype.X -= 1;
                Ship.prototype.Boost = false;
            }
        }
    },
    Right: function () {
        if (Ship.prototype.X < Game.prototype.Settings.ViewPort().width - 20) {
            Ship.prototype.X += 2;
            if (Ship.prototype.Boost) {
                Ship.prototype.X += 1;
                Ship.prototype.Boost = false;
            }
        }      
    },
    Tick: function () {
    },
    Render: function (context) {
        //render health
        var linearGradient = context.createLinearGradient(0, 0, 320, 0);
        linearGradient.addColorStop(0, 'red');
        linearGradient.addColorStop(1, 'lime');
        context.fillStyle = linearGradient;
        //health
        var healthSize = (600 / 500) * Game.prototype.Ship.Health;
        context.fillRect(20, 20, healthSize, 10);
        context.fillStyle = "white";

        context.fillStyle = "white";
        context.font = "bold 14px Courier New";
        context.fillText("Earth Atmospheric Defence Level", 30, 40);

        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(20, 20);
        context.lineTo(620, 20);
        context.lineTo(620, 30);
        context.lineTo(20, 30);
        context.closePath();
        context.stroke();

        //render ship
        var ship = Ship.prototype;
        context.fillStyle = "orange";
        context.beginPath();
        context.moveTo(ship.X + 5, ship.Y - 15);
        context.lineTo(ship.X + 60, ship.Y);
        context.lineTo(ship.X + 5, ship.Y + 15);
        context.fill();
        context.strokeStyle = "green";
        context.lineWidth = 2;
        context.stroke();


        context.fillStyle = "cyan";
        context.beginPath();
        context.moveTo(ship.X, ship.Y);
        context.lineTo(ship.X, ship.Y - 5);
        context.lineTo(ship.X + 20, ship.Y - 10);
        context.lineTo(ship.X - 10, ship.Y - 20);
        context.lineTo(ship.X + 20, ship.Y);
        context.lineTo(ship.X - 10, ship.Y + 20);
        context.lineTo(ship.X + 20, ship.Y + 10);
        context.lineTo(ship.X, ship.Y + 5);
        context.lineTo(ship.X, ship.Y);
        context.fill();
        context.strokeStyle = "purple";
        context.lineWidth = 2;
        context.stroke();

        context.fillStyle = "red";
        var colour = Math.floor((Math.random() * 2) + 1);
        if (colour == 0) {
            context.fillStyle = "yellow";
            Ship.prototype.frame = 1;
        } else if (colour == 1) {
            context.fillStyle = "orange";
            Ship.prototype.frame = 1;
        }
        context.beginPath();
        context.moveTo(ship.X, ship.Y);
        context.lineTo(ship.X, ship.Y - 8);
        context.lineTo(ship.X - 10, ship.Y);
        context.lineTo(ship.X, ship.Y + 8);
        context.lineTo(ship.X, ship.Y);
        context.fill();

        //context.fillStyle = "blue";
        //context.fillRect(ship.X - 20, ship.Y - 20, 40, 40);

    }
};



