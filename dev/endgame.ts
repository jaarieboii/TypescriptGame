class EndGame {

    private div: HTMLElement
    private game: Game
    
    private highScore: HTMLElement

    constructor(g: Game, score:number , highScore:number[]) {
        this.game = g
        for(let i = 0; i < highScore.length; i++){
            localStorage.setItem( JSON.stringify(i),JSON.stringify(highScore[i]))
        }
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", () => this.splashClicked())
        this.div.innerHTML = "Congratulations! You did it! Your score is "+ score
        highScore.sort(function(a, b){ return b - a})
        this.highScore = document.createElement("ul")
        document.body.appendChild(this.highScore)
        this.highScore.innerHTML = "Highscore:"
        for(let i = 0; i < 5; i++){
            this.highScore = document.createElement("ul")
            document.body.appendChild(this.highScore)
            this.highScore.innerHTML = (i + 1)+ " : " + highScore[i]
        }
    }

    public update() {

    }

    private splashClicked() {
        this.game.showPlayScreen()
    }
}