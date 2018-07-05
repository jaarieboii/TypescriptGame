"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(x, y) {
        this.x = x;
        this.y = y;
    }
    GameObject.prototype.update = function () {
    };
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.div = document.createElement("ball");
        document.body.appendChild(_this.div);
        _this.x = x;
        _this.y = y;
        _this.speedY = -3 - (Math.random() * 6);
        _this.speedX = Math.random() * 6 - 3;
        return _this;
    }
    Ball.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Ball.prototype.hitPaddle = function () {
        this.speedY *= -1;
    };
    Ball.prototype.hitBrick = function () {
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
}(GameObject));
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
    return Brick;
}());
var EndGame = (function () {
    function EndGame(g, score, highScore) {
        var _this = this;
        this.game = g;
        for (var i = 0; i < highScore.length; i++) {
            localStorage.setItem(JSON.stringify(i), JSON.stringify(highScore[i]));
        }
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "Congratulations! You did it! Your score is " + score;
        highScore.sort(function (a, b) { return b - a; });
        this.highScore = document.createElement("ul");
        document.body.appendChild(this.highScore);
        this.highScore.innerHTML = "Highscore:";
        for (var i = 0; i < 5; i++) {
            this.highScore = document.createElement("ul");
            document.body.appendChild(this.highScore);
            this.highScore.innerHTML = (i + 1) + " : " + highScore[i];
        }
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
        this.endScore = [];
        this.game = g;
        this.endScore = this.game.highScore;
        this.score = new Score(0);
        this.paddle = new Paddle(600, 37, 39, window.innerWidth / 2 - 50);
        this.div = document.createElement("Score");
        document.body.appendChild(this.div);
        for (var j = 0; j < 200; j += 25) {
            for (var i = 0; i < 1200; i += 75) {
                this.bricks.push(new Brick(j, i));
            }
        }
        this.balls.push(new Ball(window.innerWidth / 2, window.innerHeight - 250));
    }
    PlayScreen.prototype.update = function () {
        this.div.innerHTML = "Score: " + this.score.score;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            for (var i = 0; i < this.bricks.length; i++) {
                if (this.checkCollision(b.getRectangle(), this.bricks[i].getRectangle())) {
                    b.hitBrick();
                    this.bricks[i].changeBrick();
                    this.bricks.splice(i, 1);
                    this.score.score++;
                }
                if (this.bricks.length == 0) {
                    this.endScore.push(this.score.score);
                    this.game.showEndGameScreen(this.score.score, this.endScore);
                }
            }
            if (this.checkCollision(b.getRectangle(), this.paddle.getRectangle())) {
                b.hitPaddle();
            }
            if (b.getRectangle().bottom > window.innerHeight) {
                this.endScore.push(this.score.score);
                this.game.showGameoverScreen(this.score.score, this.endScore);
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
        this.highScore = [];
        for (var i = 0; i < 5; i++) {
            if (window.localStorage) {
                this.localStorageString = localStorage.getItem("" + i);
                this.localStorageNumber = JSON.parse(this.localStorageString);
            }
            this.highScore.push(this.localStorageNumber);
        }
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
    Game.prototype.showGameoverScreen = function (score, highScore) {
        this.score = score;
        this.highScore = highScore;
        document.body.innerHTML = "";
        this.currentscreen = new GameOver(this, score, highScore);
    };
    Game.prototype.showEndGameScreen = function (score, highScore) {
        this.score = score;
        this.highScore = highScore;
        document.body.innerHTML = "";
        this.currentscreen = new EndGame(this, score, highScore);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(g, score, highScore) {
        var _this = this;
        this.game = g;
        for (var i = 0; i < highScore.length; i++) {
            localStorage.setItem(JSON.stringify(i), JSON.stringify(highScore[i]));
        }
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "GAME OVER, MAN! Your score is " + score;
        highScore.sort(function (a, b) { return b - a; });
        this.highScore = document.createElement("ul");
        document.body.appendChild(this.highScore);
        this.highScore.innerHTML = "Highscore:";
        for (var i = 0; i < 5; i++) {
            this.highScore = document.createElement("ul");
            document.body.appendChild(this.highScore);
            this.highScore.innerHTML = (i + 1) + " : " + highScore[i];
        }
        console.log(localStorage);
    }
    GameOver.prototype.update = function () {
    };
    GameOver.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return GameOver;
}());
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(y, up, down, x) {
        var _this = _super.call(this, x, y) || this;
        _this.downSpeed = 0;
        _this.upSpeed = 0;
        _this.div = document.createElement("paddle");
        document.body.appendChild(_this.div);
        _this.upkey = up;
        _this.downkey = down;
        _this.x = x;
        _this.y = y;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
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
}(GameObject));
var Score = (function () {
    function Score(score) {
        this.div = document.createElement("score");
        document.body.appendChild(this.div);
        this.score = score;
    }
    Score.prototype.update = function () {
        this.score++;
        this.div.innerHTML = "Score " + this.score;
    };
    return Score;
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