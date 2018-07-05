/// <reference path="ball.ts"/>

class PlayScreen {

    private balls: Ball[] = []
    private bricks: Brick[] = []
    private paddle: Paddle
    private game: Game
    public score: Score
    public endScore: number[] = []
    private div: HTMLElement

    constructor(g:Game) {
        
        
        this.game = g
        this.endScore = this.game.highScore
        this.score = new Score(0)
        this.paddle = new Paddle(600, 37, 39, window.innerWidth / 2 - 50)
        this.div = document.createElement("Score")
        document.body.appendChild(this.div)
        
        for (let j = 0; j < 200; j+=25){
            for (let i = 0; i < 1200; i+=75) {
                this.bricks.push(new Brick(j, i))
            }
        }

        // for (var i = 0; i < 5; i++) {
            this.balls.push(new Ball(window.innerWidth/2,window.innerHeight-250))
        // }
    }

    public update(): void {
        this.div.innerHTML ="Score: " + this.score.score
        for (var b of this.balls) {
            
                // ball hits brick
                
            for (let i = 0; i < this.bricks.length; i++) {
                if (this.checkCollision(b.getRectangle(), this.bricks[i].getRectangle())){
                    b.hitBrick()
                    this.bricks[i].changeBrick()
                    this.bricks.splice(i, 1)
                    this.score.score ++
                    }
                if(this.bricks.length == 0){
                    this.endScore.push(this.score.score)
                    this.game.showEndGameScreen(this.score.score,this.endScore)
                }
                }   
            
            // ball hits paddle
            if (this.checkCollision(b.getRectangle(), this.paddle.getRectangle())) {
                b.hitPaddle()
            }

            // ball leaves the screen: gameover!
            if (b.getRectangle().bottom > window.innerHeight) {
                this.endScore.push(this.score.score)
                this.game.showGameoverScreen(this.score.score,this.endScore)
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