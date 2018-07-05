class Brick {
    
    private row:number
    private colom:number
    private div: HTMLElement
    public ball: Ball

    constructor(i: number, j: number) {
        this.row = j + 150
        this.colom = i + 25

        this.div = document.createElement("brick")
        document.body.appendChild(this.div)

        this.div.style.transform = `translate(${this.row}px, ${this.colom}px)`
        
    
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    public changeBrick(){
        this.div.remove()
    }

    public hitBrick(){
        if(this.row + this.getRectangle().left == 0 || this.row + this.getRectangle().right == 150){
            this.ball.speedY *= 1
        }
    }

}