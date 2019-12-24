/// <reference path='vector.ts'/>
/// <reference path='multisprites.ts'/>
/// <reference path='sound.ts'/>

class Transition {
    
} 

class Hero extends MultiSprites implements Speaking {
    public yeah : Sound;
    public laser_left : Boolean; 
    constructor(canvas : HTMLCanvasElement,
    context : CanvasRenderingContext2D,
    src : string)
    
    {
        super(canvas,context,src);
        this.speed = 20;
        this.width = 50;
        this.height = 55;
        this.pos = new Vector(this.getRandomInt(0, this.canvas.width - this.width), this.getRandomInt(0, this.canvas.height - this.height));
        this.dir = new Vector(1, 0);
        this.laser_left = false;
        this.yeah = new Sound('./sounds/yeah.mp3');
    }

    public drawObject()
    {
        super.drawObject(0, 0);
    }

    public moveRight()
    {
        super.setDirection(1, 0);
        super.move(false);
        this.laser_left = false;   
    }

    public moveLeft()
    {
        super.setDirection(-1, 0);
        super.move(false);
        this.laser_left = true;
    }

    public moveUp()
    {
        super.setDirection(0, -1);
        super.move(false);  
    }

    public moveDown()
    {
        super.setDirection(0,1);
        super.move(false);   
    }
    
    public getPos()
    {
        return this.pos;
    }

}