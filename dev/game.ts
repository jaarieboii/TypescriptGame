/// <reference path="playscreen.ts"/>

class Game {
    
    private currentscreen:any

    constructor() {
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

    public showGameoverScreen() {
        document.body.innerHTML = ""
        this.currentscreen = new GameOver(this)
    }
    public showEndGameScreen(){
        document.body.innerHTML = ""
        this.currentscreen = new EndGame(this)
    }
} 


window.addEventListener("load", () => new Game())