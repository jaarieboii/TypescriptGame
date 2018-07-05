// <reference path="screen.ts"/>

class GameOver {

    private div: HTMLElement
    private game: Game

    constructor(g: Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", () => this.splashClicked())
        this.div.innerHTML = "GAME OVER, MAN"
    }

    public update() {

    }

    private splashClicked() {
        this.game.showPlayScreen()
    }
}