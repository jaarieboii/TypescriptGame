"use strict";
var Ball = (function () {
    function Ball() {
        this.div = document.createElement("ball");
        document.body.appendChild(this.div);
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight - 250;
        this.speedY = -3 - (Math.random() * 6);
        this.speedX = Math.random() * 6 - 3;
    }
    Ball.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Ball.prototype.hitPaddle = function () {
        this.speedY *= -1;
    };
    Ball.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + this.getRectangle().height > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        if (this.x + this.getRectangle().width > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Ball;
}());
var Brick = (function () {
    function Brick(i, j) {
        this.row = j + 150;
        this.colom = i + 25;
        this.div = document.createElement("brick");
        document.body.appendChild(this.div);
        this.div.style.transform = "translate(" + this.row + "px, " + this.colom + "px)";
    }
    Brick.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Brick.prototype.changeBrick = function () {
        this.div.remove();
    };
    Brick.prototype.hitBrick = function () {
        if (this.row + this.getRectangle().left == 0 || this.row + this.getRectangle().right == 150) {
            this.ball.speedY *= 1;
        }
    };
    return Brick;
}());
var EndGame = (function () {
    function EndGame(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "Congratulations! You did it! Do you want another try?";
    }
    EndGame.prototype.update = function () {
    };
    EndGame.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return EndGame;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.balls = [];
        this.bricks = [];
        this.game = g;
        this.paddle = new Paddle(600, 37, 39);
        for (var j = 0; j < 200; j += 25) {
            for (var i = 0; i < 1200; i += 75) {
                this.bricks.push(new Brick(j, i));
            }
        }
        this.balls.push(new Ball());
    }
    PlayScreen.prototype.update = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            for (var i = 0; i < this.bricks.length; i++) {
                if (this.checkCollision(b.getRectangle(), this.bricks[i].getRectangle())) {
                    this.bricks[i].hitBrick();
                    this.bricks[i].changeBrick();
                    this.bricks.splice(i, 1);
                }
                if (this.bricks.length == 0) {
                    this.game.showEndGameScreen();
                }
            }
            if (this.checkCollision(b.getRectangle(), this.paddle.getRectangle())) {
                b.hitPaddle();
            }
            if (b.getRectangle().bottom > window.innerHeight) {
                this.game.showGameoverScreen();
            }
            b.update();
        }
        this.paddle.update();
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return PlayScreen;
}());
var Game = (function () {
    function Game() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new PlayScreen(this);
    };
    Game.prototype.showGameoverScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new GameOver(this);
    };
    Game.prototype.showEndGameScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new EndGame(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "GAME OVER, MAN";
    }
    GameOver.prototype.update = function () {
    };
    GameOver.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return GameOver;
}());
var Paddle = (function () {
    function Paddle(xp, up, down) {
        var _this = this;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.div = document.createElement("paddle");
        document.body.appendChild(this.div);
        this.upkey = up;
        this.downkey = down;
        this.x = window.innerWidth / 2 - 50;
        this.y = xp;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Paddle.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 10;
                break;
            case this.downkey:
                this.downSpeed = 10;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newX = this.x - this.upSpeed + this.downSpeed;
        if (newX > 0 && newX + 100 < window.innerWidth)
            this.x = newX;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Paddle;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "START THE GAME";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map