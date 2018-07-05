// <reference path="screen.ts"/>
/// <reference path="ball.ts"/>

class PlayScreen {

    private balls: Ball[] = []
    private bricks: Brick[] = []
    private paddle: Paddle
    private game: Game

    constructor(g:Game) {
        this.game = g
        this.paddle = new Paddle(600, 37, 39)
        
        
        for (let j = 0; j < 200; j+=25){
            for (let i = 0; i < 1200; i+=75) {
                this.bricks.push(new Brick(j, i))
            }
        }

        // for (var i = 0; i < 5; i++) {
            this.balls.push(new Ball())
        // }
    }

    public update(): void {
        for (var b of this.balls) {
            
                // ball hits brick
                
            for (let i = 0; i < this.bricks.length; i++) {
                if (this.checkCollision(b.getRectangle(), this.bricks[i].getRectangle())){
                    this.bricks[i].hitBrick()
                    this.bricks[i].changeBrick()
                    this.bricks.splice(i, 1)
                    }
                if(this.bricks.length == 0){
                    this.game.showEndGameScreen()
                }
                }   
            
            // ball hits paddle
            if (this.checkCollision(b.getRectangle(), this.paddle.getRectangle())) {
                b.hitPaddle()
            }

            // ball leaves the screen: gameover!
            if (b.getRectangle().bottom > window.innerHeight) {
                this.game.showGameoverScreen()
            }   

            
        
            b.update()
            
        }

        this.paddle.update()
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

}