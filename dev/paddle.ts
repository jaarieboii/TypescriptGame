/// <reference path="gameobject.ts"/>

class Paddle extends GameObject {
    
    
    
    private downkey : number
    private upkey   : number
    
    private downSpeed   : number = 0
    private upSpeed     : number = 0
    
    
    constructor(y:number, up:number, down:number, x:number) {
        super(x,y)
        this.div = document.createElement("paddle")
        document.body.appendChild(this.div)
        
        this.upkey   = up
        this.downkey = down
        
        this.x      = x
        this.y      = y
        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 10
                break
            case this.downkey:
                this.downSpeed = 10
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0
                break
            case this.downkey:
                this.downSpeed = 0
                break
        }
    }

    public update() {
        let newX = this.x - this.upSpeed + this.downSpeed

        // als de paddle binnen beeld blijft, dan ook echt updaten
        if (newX > 0 && newX + 100 < window.innerWidth) this.x = newX

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
    
}