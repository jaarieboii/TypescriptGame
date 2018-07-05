class GameObject {

    protected x : number
    protected y : number
    protected div:HTMLElement
    

    constructor(x: number, y:number) {
        this.x = x
        this.y = y
        
    }
    protected update() : void{

    }
    protected getRectangle(){
         return this.div.getBoundingClientRect()
    }

}