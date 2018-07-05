/// <reference path="gameobject.ts"/>

class Ball extends GameObject {
    
    
    
    public speedX: number
    public speedY: number
    
    
    
    constructor(x:number,y:number) {
        super(x,y)
        this.div = document.createElement("ball")
        document.body.appendChild(this.div)
        
        this.x = x 
        this.y = y

        this.speedY = -3 - (Math.random() * 6)
        this.speedX = Math.random() * 6 - 3
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }
    
    public hitPaddle(){
        this.speedY *= -1
    }
    public hitBrick(){
        this.speedY *= -1
    }
    

    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        
        
        if( this.y + this.getRectangle().height > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }
        
        if (this.x + this.getRectangle().width > window.innerWidth || this.x < 0 ) {
            this.speedX *= -1
        } 
                        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }
}