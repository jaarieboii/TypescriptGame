/// <reference path="playscreen.ts"/>

class Game {
    
    private currentscreen:any
    public score: number
    public localStorageString: any
    public localStorageNumber: number
    public highScore: number[] = []

    constructor() {
        for(let i = 0; i < 5; i++){
            if(window.localStorage){
                this.localStorageString = localStorage.getItem(""+i)
                this.localStorageNumber = JSON.parse(this.localStorageString)
            }
            this.highScore.push(this.localStorageNumber)
        }

        this.currentscreen = new StartScreen(this)
        this.gameLoop()        
    }
    
    private gameLoop():void{
        this.currentscreen.update()   
        requestAnimationFrame(() => this.gameLoop())
    }

    public showPlayScreen() {
        document.body.innerHTML = ""
        this.currentscreen = new PlayScreen(this)
    }

    public showGameoverScreen(score:number, highScore:number[]) {
        this.score = score 
        this.highScore = highScore 
        document.body.innerHTML = ""
        this.currentscreen = new GameOver(this, score, highScore)
    }
    public showEndGameScreen(score:number, highScore:number[]){
        this.score = score 
        this.highScore = highScore 
        document.body.innerHTML = ""
        this.currentscreen = new EndGame(this, score, highScore)
    }
} 


window.addEventListener("load", () => new Game())