class Score {

    private div: HTMLElement
    public score: number

    constructor(score:number) {
        this.div = document.createElement("score")
        document.body.appendChild(this.div)
        this.score = score
    }
    public update(){
        this.score++
        this.div.innerHTML = "Score " + this.score
    }
}