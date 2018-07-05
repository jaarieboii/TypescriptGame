# CMTTHE01-4-Game
Link voor een demo.
- https://jaarieboii.github.io/TypescriptGame/

# Checklist
- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan

### Extra opdrachten 

- [ ] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [x] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [ ] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. 

# Toelichting OOP principes
## Classes
Elk onderdeel in de game heeft zijn eigen class. Een class is een blauwdruk, Wat een object is die dus een aantal dingen te vertellen heeft over het object. Een class bestaat uit property's en methods.

Hieronder een voorbeeld van een Class met property's en methods.
```
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

}
```
## Encapsulation
Encapsulation is het geen wat je openbaar wilt maken waar elke class bij kan komen, of dat er maar een beperkt aantal classes bij kunnen komen, of dat er geen classes bij kunnen komen.
Dit benoemen we in de volgende 3 delen
- public : iedere class kan er bij
- private : Geen andere class kan er bij
- protected : iedere andere class waar de parent class met protected in inheritanced wordt kan er bij.

Hier onder 2 voorbeeldjes van Encapsulation.
```
class GameObject {

    protected x : number
    protected y : number
```
```
class Score {

    private div: HTMLElement
    public score: number
```


## Inheritance
Inheritance is het overerven van methods en properties, hierdoor voorkom je dubbele code.
Bij mij in de game heeft ball en paddle zowel x als y en div gelijk.
Deze neem ik dan ook als volgt over
gameobject.ts 
```
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
```
ball.ts
```
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
```
Paddle.ts
```
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
```
# Composition
bepaal je met welke class je een andere class nodig hebt.

bijvoorbeeld mijn game class heeft elke screen in gebruik. Start, play, endgame, gameover.
Hieronder wordt de gameclass laten zien. die zorgt er voor dat elke screen wordt laten zien op zijn moment.
```
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
```
Bij startscreen en elk ander screen heeft die dus ook de property game.
Zo refereert die daar naar toe.
```
class StartScreen {

    private div: HTMLElement
    private game : Game

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", ()=>this.splashClicked())
        this.div.innerHTML = "START THE GAME"
    }

    public update(){

    }

    private splashClicked() {
        this.game.showPlayScreen()
    }
}
```
# Klassendiagram


https://github.com/jaarieboii/TypescriptGame/tree/master/docs/images/klassendiagram.jpeg




# Peer review
### PeerReview
https://stud.hosted.hr.nl/0884930/GarbageGame/ De game van Marleen
### Checklist
- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.


### Extra opdrachten 

- [ ] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [x] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. 


## Mijn Feedback
De game zit Goed in elkaar en heeft multiplayer erin zitten. Wat ik interessant vind van de game is dat je samen voor de volle punten moet gaan. Dit is in een bepaalde moeilijkheidsgraad die om de paar vuilnisstukken  iets sneller gaat.