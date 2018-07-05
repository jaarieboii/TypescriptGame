# CMTTHE04 Week5 oefening 1

## Pong met Inheritance

In week 4 hebben we een pong game gebouwd met composition: **Game** heeft drie screens: **PlayScreen**, **GameOver** en **StartScreen**. PlayScreen heeft **Balls** en **Paddles**

Je kan verder gaan met je eigen code van week 4, of je kan dit project als startpunt gebruiken voor de oefening met Inheritance.

### Inheritance voor Ball en Paddle

Gebruik inheritance om de **overeenkomstige eigenschappen** van Ball en Paddle in een GameObject class te plaatsen. Ball en Paddle erven dan van GameObject.
Let op het gebruik van **protected** en **super()**

**GameObject**
```
class GameObject {
    constructor() {
        console.log("I am a gameobject")
    }
}
```

#### Eigenschappen verplaatsen

Je kan de eigenschappen `x`, `y`, en `div` verplaatsen naar het GameObject. 

#### Update functie verplaatsen

Je kan het updaten van de positie ook verplaatsen naar GameObject. Bekijk of de `getRectangle()` functie hetzelfde is bij Ball en bij Paddle. Als dit zo is kan je die ook naar `GameObject` verplaatsen! Het GameObject kan er als volgt uit zien:

**GameObject**
```
class GameObject {

    protected x: number
    protected y: number
    protected div: HTMLElement

    constructor() {
        console.log("I am a gameobject")
    }

    public update(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }
}
```

### Overerven van GameObject

Ball en Paddle erven van GameObject en krijgen daardoor automatisch een x,y en div property. Ook krijgen ze automatisch de update functie en de getRectangle functie. De eigenschappen en functies die *niet* gedeeld worden door Ball en Paddle moeten wel in de eigen class blijven.

**Ball**
```
class Ball extends GameObject {

    private speedX: number
    private speedY: number

    constructor() {
        super()
        console.log("I am a ball")
    }

    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        
        if( this.y + this.getRectangle().height > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }
                        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }
}
```
### De Update functie

De Ball heeft zijn eigen `update` functie. Maar omdat de `style.transform` regel hetzelfde is als bij gameobject, kan je alsnog de functie van gameobject aanroepen:

**Ball**
```
class Ball extends GameObject {

    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        
        if( this.y + this.getRectangle().height > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }
                        
        super.update()
    }
}
```

## Inheritance voor Screens

Gebruik inheritance om de **overeenkomstige eigenschappen** van PlayScreen, GameOver en StartScreen in een Screen class te plaatsen. 

**Screen**
```
class Screen {
    public update(): void {
        
    }
}
```

**StartScreen**
```
class StartScreen extends Screen {
    constructor(){
        super()
    }
}
```

### Het any type

In de code van game.ts zie je dat `currentscreen` als type `any` heeft. Dit is omdat we niet weten of er een PlayScreen, GameOverScreen, of StartScreen in de `screen` variabele geplaatst wordt.

Dit probleem kunnen we oplossen als alle drie de screens overerven van de class `Screen`. Het type van de `currentscreen` variabele wordt dan `Screen`.

**Game.ts**
```
class Game {
    currentscreen:Screen
    constructor(){
        this.screen = new PlayScreen()
    }
}
```